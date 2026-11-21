"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck, ReceiptText } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api, inr, formatAddressLine, ShopAddress } from "@/lib/api";
import { AddressForm, AddressFormValue, AddressErrors, emptyAddress, validateAddress } from "@/components/AddressForm";
import { ProductImage } from "@/components/ProductImage";
import { clean, check, validate, fieldErrorCls, GSTIN_RE } from "@/lib/validation";

const inputCls =
  "w-full h-9 px-3 rounded-lg border border-[#E2DED5] bg-transparent text-xs text-[#10201F] placeholder:text-[#9AA19C] focus:outline-none focus:border-[#07543F] focus:ring-1 focus:ring-[#07543F]/20";
const labelCls = "block text-[11px] font-bold text-[#445048] mb-1";
export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, totalAmount, clearCart } = useCart();
  const { user, isLoading } = useAuth();
  const idempotencyKey = useRef(
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now())
  );

  // Delivery address: a saved one (id) or "new" (typed below, then saved to the address book)
  const [addresses, setAddresses] = useState<ShopAddress[] | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("new");
  const [newAddress, setNewAddress] = useState<AddressFormValue>(emptyAddress());
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const [gstin, setGstin] = useState("");
  const [gstinError, setGstinError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<{ id: string; orderNumber: string; total: number; address: string } | null>(null);

  // Login required — come back here after signing in
  useEffect(() => {
    if (!isLoading && !user && items.length > 0 && !placed) router.replace("/signin?next=/checkout");
  }, [isLoading, user, items.length, placed, router]);

  // Load saved addresses; pre-select the default one. Prefill a new address from the profile.
  useEffect(() => {
    if (!user) return;
    setGstin((g) => g || user.gstin || "");
    setNewAddress((a) => ({
      ...a,
      fullName: a.fullName || clean.name(user.name),
      phone: a.phone || clean.phone(user.phone || ""),
    }));
    api
      .addresses()
      .then((list) => {
        setAddresses(list);
        const def = list.find((x) => x.isDefault) ?? list[0];
        setSelectedAddressId(def ? def.id : "new");
      })
      .catch(() => setAddresses([]));
  }, [user]);

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId) ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || isSubmitting) return;
    const usingNew = selectedAddressId === "new" || !selectedAddress;
    const addrErrs = usingNew ? validateAddress(newAddress) : null;
    const gErr = check.gstin(gstin);
    setAddressErrors(addrErrs ?? {});
    setGstinError(gErr);
    if (addrErrs || gErr) return setError("Please fix the highlighted fields.");
    setIsSubmitting(true);
    setError(null);
    try {
      const order = await api.placeOrder({
        items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })),
        ...(usingNew
          ? {
              address: {
                label: newAddress.label,
                fullName: newAddress.fullName.trim(),
                phone: newAddress.phone.trim(),
                addressLine: newAddress.addressLine.trim(),
                city: newAddress.city.trim(),
                state: newAddress.state,
                pincode: newAddress.pincode,
              },
            }
          : { addressId: selectedAddress!.id }),
        gstin: gstin || undefined,
        idempotencyKey: idempotencyKey.current,
      });
      setPlaced({
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.grandTotal,
        address: formatAddressLine(usingNew ? newAddress : selectedAddress!),
      });
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- Success ---------- */
  if (placed) {
    return (
      <div className="flex-1 flex flex-col justify-center py-10 px-4 max-w-md mx-auto text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#07543F] flex items-center justify-center">
          <Check className="w-6 h-6 text-white" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-[#10201F]">Order placed successfully</h1>
        <p className="mt-1.5 text-xs text-[#667085]">
          Thanks, {(selectedAddress?.fullName || newAddress.fullName || user?.name || "").split(" ")[0]}. Your order{" "}
          <span className="font-bold text-[#10201F]">{placed.orderNumber}</span> has been received.
        </p>

        <dl className="mt-5 text-xs text-left divide-y divide-[#E2DED5] border-y border-[#E2DED5]">
          <div className="py-2 flex justify-between gap-4">
            <dt className="text-[#667085]">Deliver to</dt>
            <dd className="text-[#10201F] text-right font-medium">{placed.address}</dd>
          </div>
          <div className="py-2 flex justify-between">
            <dt className="text-[#667085]">Payment</dt>
            <dd className="text-[#10201F] font-medium">Cash on delivery</dd>
          </div>
          <div className="py-2 flex justify-between font-bold">
            <dt className="text-[#10201F]">Total</dt>
            <dd className="text-[#07543F]">{inr(placed.total)}</dd>
          </div>
        </dl>

        <p className="mt-4 text-[11px] text-[#667085]">
          Your {gstin ? "GST" : "non-GST"} invoice will be available in My Orders once the order is dispatched.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/orders"
            className="inline-flex h-10 px-6 items-center justify-center rounded-xl bg-[#07543F] text-white text-xs font-bold"
          >
            My orders
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center py-12 px-4 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-[#10201F]">Your cart is empty</h2>
        <p className="mt-1 text-xs text-[#667085]">Add a few products before checking out.</p>
        <Link
          href="/products"
          className="mt-5 inline-flex h-10 px-6 items-center justify-center rounded-xl bg-[#07543F] text-white text-xs font-bold mx-auto"
        >
          Browse products
        </Link>
      </div>
    );
  }

  if (isLoading || !user) return null;

  /* ---------- Checkout ---------- */
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col justify-center">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              router.back();
            } else {
              router.push("/products");
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#07543F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-10 items-start">
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-0">
          {/* 1. Delivery address — saved addresses or a new one */}
          <div className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#07543F]">1. Delivery Address</h2>
              {addresses && addresses.length > 0 && (
                <Link href="/addresses" className="text-[11px] font-semibold text-[#07543F] hover:underline">
                  Manage addresses
                </Link>
              )}
            </div>

            {addresses === null ? (
              <div className="h-16 rounded-xl bg-[#E2DED5]/30 animate-pulse" />
            ) : (
              <div className="space-y-2">
                {addresses.map((a) => {
                  const active = selectedAddressId === a.id;
                  return (
                    <label
                      key={a.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        active ? "border-[#07543F] bg-[#F2F7F4]/60" : "border-[#E2DED5] hover:border-[#C9C2B3]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery-address"
                        checked={active}
                        onChange={() => setSelectedAddressId(a.id)}
                        className="mt-0.5 w-4 h-4 accent-[#07543F]"
                      />
                      <div className="min-w-0 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#10201F]">{a.fullName}</span>
                          <span className="text-xs font-medium text-[#667085]">({a.label})</span>
                          {a.isDefault && <span className="text-[10px] font-semibold text-[#07543F]">Default</span>}
                        </div>
                        <p className="text-[#445048] mt-0.5">{formatAddressLine(a)}</p>
                        <p className="text-[#667085] mt-0.5">Mobile: {a.phone}</p>
                      </div>
                    </label>
                  );
                })}

                {/* New address */}
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    selectedAddressId === "new" ? "border-[#07543F]" : "border-dashed border-[#C9C2B3] hover:border-[#07543F]"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery-address"
                    checked={selectedAddressId === "new"}
                    onChange={() => setSelectedAddressId("new")}
                    className="w-4 h-4 accent-[#07543F]"
                  />
                  <span className="text-xs font-bold text-[#07543F]">
                    {addresses.length ? "+ Add a new address" : "Enter delivery address"}
                  </span>
                </label>

                {selectedAddressId === "new" && (
                  <div className="pt-1">
                    <AddressForm
                      value={newAddress}
                      onChange={(v) => {
                        setNewAddress(v);
                        if (Object.keys(addressErrors).length) setAddressErrors({});
                      }}
                      errors={addressErrors}
                      inputCls={inputCls}
                      labelCls={labelCls}
                    />
                    <p className="mt-2 text-[11px] text-[#667085]">This address will be saved for your next order.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Business GSTIN (optional) */}
          <div className="py-3 border-t border-[#EFECE3]">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#07543F] mb-2">2. Business GSTIN (optional)</h2>
            <input
              value={gstin}
              onChange={(e) => {
                setGstin(clean.gstin(e.target.value));
                setGstinError(null);
              }}
              placeholder="19ABCDE1234F1Z5"
              maxLength={15}
              className={`${inputCls} sm:max-w-[calc(66.666%-0.3rem)] font-mono tracking-wide`}
            />
            {gstinError ? (
              <p className={fieldErrorCls}>{gstinError}</p>
            ) : (
              gstin && gstin.length === 15 && !GSTIN_RE.test(gstin) && <p className={fieldErrorCls}>This doesn&apos;t look like a valid GSTIN.</p>
            )}
            <p className="mt-1 text-[11px] text-[#9AA19C]">For a GST tax invoice (input tax credit). Order updates go to {user.email}.</p>
          </div>

          <div className="py-3 border-t border-[#EFECE3]">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#07543F] mb-2">3. Payment Mode</h2>
            <div className="p-3.5 rounded-xl border border-[#07543F] flex items-center gap-3">
              <input type="radio" name="payment" checked readOnly className="w-4 h-4 accent-[#07543F]" />
              <div>
                <div className="text-xs font-bold text-[#10201F]">Cash on Delivery (COD)</div>
                <div className="text-[11px] text-[#667085]">Pay in cash or via UPI when your order is delivered</div>
              </div>
            </div>
          </div>
        </form>

        <aside className="lg:pl-8 lg:border-l border-[#EFECE3] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2DED5]">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#07543F]">Order Summary</h2>
            <span className="text-[11px] font-medium text-[#667085]">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <ul className="divide-y divide-[#E2DED5]/60 max-h-56 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="py-2.5 flex items-center gap-3">
                <ProductImage src={product.photoUrl} alt={product.name} className="w-10 h-10 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#10201F] truncate">{product.name}</p>
                  <p className="text-[11px] text-[#667085]">Qty: {quantity} × {inr(product.price)}</p>
                </div>
                <span className="text-xs font-black text-[#07543F] shrink-0">{inr(product.price * quantity)}</span>
              </li>
            ))}
          </ul>

          <dl className="pt-2 border-t border-[#E2DED5] space-y-1.5 text-xs">
            <div className="flex justify-between text-[#667085]">
              <dt>Subtotal</dt>
              <dd className="text-[#10201F] font-semibold">{inr(subtotal)}</dd>
            </div>
            {gstin ? (
              <div className="flex justify-between text-[#667085]">
                <dt>GST (included)</dt>
                <dd className="text-[#10201F] font-semibold">{inr(tax)}</dd>
              </div>
            ) : (
              <div className="flex justify-between text-[#667085]">
                <dt>Bill type</dt>
                <dd className="text-[#10201F] font-semibold">Non-GST invoice</dd>
              </div>
            )}
            <div className="flex justify-between text-[#667085]">
              <dt>Delivery Charges</dt>
              <dd className={shipping === 0 ? "text-[#07543F] font-bold" : "text-[#10201F] font-bold"}>
                {shipping === 0 ? "FREE" : inr(shipping)}
              </dd>
            </div>
            {shipping > 0 && (
              <p className="text-[11px] text-[#07543F] font-medium bg-[#07543F]/5 p-2 rounded-lg">
                Add {inr(500 - subtotal)} more for <strong>FREE Delivery</strong>!
              </p>
            )}
            <div className="flex justify-between pt-2.5 border-t border-[#E2DED5] text-sm font-black text-[#10201F]">
              <dt>Total Amount</dt>
              <dd className="text-[#07543F] text-base">{inr(totalAmount)}</dd>
            </div>
          </dl>

          {error && <p className="text-xs font-medium text-[#C2410C]">{error}</p>}

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full h-11 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-transform disabled:opacity-60"
          >
            {isSubmitting && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            <span>{isSubmitting ? "Placing order..." : `Place Order ${inr(totalAmount)}`}</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#667085] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#07543F]" />
            <span>{gstin ? "GST tax invoice for your business" : "Add your GSTIN above for a GST invoice"}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
