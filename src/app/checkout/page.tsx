"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck, ReceiptText } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api, inr } from "@/lib/api";
import { ProductImage } from "@/components/ProductImage";
import { clean, check, validate, fieldErrorCls, GSTIN_RE } from "@/lib/validation";

const inputCls =
  "w-full h-9 px-3 rounded-lg border border-[#E2DED5] bg-transparent text-xs text-[#10201F] placeholder:text-[#9AA19C] focus:outline-none focus:border-[#07543F] focus:ring-1 focus:ring-[#07543F]/20";
const labelCls = "block text-[11px] font-bold text-[#445048] mb-1";

const STATES = [
  "West Bengal", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, totalAmount, clearCart } = useCart();
  const { user, isLoading } = useAuth();
  const idempotencyKey = useRef(
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now())
  );

  const [form, setForm] = useState({ fullName: "", phone: "", address: "", city: "", state: "West Bengal", pincode: "", gstin: "" });
  type FormKey = keyof typeof form;
  const CLEANERS: Partial<Record<FormKey, (v: string) => string>> = {
    fullName: clean.name,
    phone: clean.phone,
    address: clean.address,
    city: clean.city,
    pincode: clean.pincode,
    gstin: clean.gstin,
  };
  const set = (k: FormKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = CLEANERS[k] ? CLEANERS[k]!(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (fieldErrors[k]) setFieldErrors((fe) => ({ ...fe, [k]: undefined }));
  };
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormKey, string>>>({});
  const err = (k: FormKey) => (fieldErrors[k] ? <p className={fieldErrorCls}>{fieldErrors[k]}</p> : null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<{ id: string; orderNumber: string; total: number; address: string } | null>(null);

  // Login required — come back here after signing in
  useEffect(() => {
    if (!isLoading && !user && items.length > 0 && !placed) router.replace("/signin?next=/checkout");
  }, [isLoading, user, items.length, placed, router]);

  // Prefill from the customer's saved profile
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      fullName: f.fullName || clean.name(user.name),
      phone: f.phone || clean.phone(user.phone || ""),
      address: f.address || user.address || "",
      city: f.city || user.city || "",
      state: user.state || f.state,
      pincode: f.pincode || user.pincode || "",
      gstin: f.gstin || user.gstin || "",
    }));
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || isSubmitting) return;
    const errs = validate({
      fullName: check.name(form.fullName),
      phone: check.phone(form.phone),
      address: check.address(form.address),
      city: check.city(form.city),
      pincode: check.pincode(form.pincode),
      gstin: check.gstin(form.gstin),
      state: form.state ? null : "Choose your state.",
    });
    setFieldErrors(errs ?? {});
    if (errs) return setError("Please fix the highlighted fields.");
    setIsSubmitting(true);
    setError(null);
    try {
      const order = await api.placeOrder({
        items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })),
        address: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          addressLine: form.address.trim(),
          city: form.city.trim(),
          state: form.state,
          pincode: form.pincode,
        },
        gstin: form.gstin || undefined,
        idempotencyKey: idempotencyKey.current,
      });
      setPlaced({
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.grandTotal,
        address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
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
          Thanks, {form.fullName.split(" ")[0]}. Your order{" "}
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
          Your {form.gstin ? "GST" : "non-GST"} invoice will be available in My Orders once the order is dispatched.
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
          <div className="pb-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#07543F] mb-2">1. Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input value={form.fullName} onChange={set("fullName")} placeholder="Rajesh Kumar" autoComplete="name" maxLength={60} className={inputCls} />
                {err("fullName")}
              </div>
              <div>
                <label className={labelCls}>Mobile Number *</label>
                <input type="tel" inputMode="numeric" value={form.phone} onChange={set("phone")} placeholder="9830000000" autoComplete="tel-national" maxLength={10} className={inputCls} />
                {err("phone")}
              </div>
              <div>
                <label className={labelCls}>Email Address</label>
                <input value={user.email} disabled className={`${inputCls} text-[#667085]`} />
              </div>
            </div>
          </div>

          <div className="pb-3 -mt-1">
            <label className={labelCls}>
              Business GSTIN <span className="font-normal text-[#9AA19C]">(optional — for GST input credit)</span>
            </label>
            <input
              value={form.gstin}
              onChange={set("gstin")}
              placeholder="19ABCDE1234F1Z5"
              maxLength={15}
              className={`${inputCls} sm:max-w-[calc(66.666%-0.3rem)] font-mono tracking-wide`}
            />
            {fieldErrors.gstin
              ? err("gstin")
              : form.gstin && form.gstin.length === 15 && !GSTIN_RE.test(form.gstin) && (
                  <p className={fieldErrorCls}>This doesn&apos;t look like a valid GSTIN.</p>
                )}
          </div>

          <div className="py-3 border-t border-[#EFECE3]">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#07543F] mb-2">2. Delivery Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div className="sm:col-span-4">
                <label className={labelCls}>Street Address / House No. *</label>
                <input value={form.address} onChange={set("address")} placeholder="House no, street, landmark" autoComplete="street-address" maxLength={200} className={inputCls} />
                {err("address")}
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>City / Town *</label>
                <input value={form.city} onChange={set("city")} placeholder="Kolkata" autoComplete="address-level2" maxLength={50} className={inputCls} />
                {err("city")}
              </div>
              <div>
                <label className={labelCls}>State *</label>
                <select required value={form.state} onChange={set("state")} className={`${inputCls} cursor-pointer`}>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>PIN Code *</label>
                <input
                  inputMode="numeric"
                  maxLength={6}
                  value={form.pincode}
                  onChange={set("pincode")}
                  placeholder="700001"
                  autoComplete="postal-code"
                  className={inputCls}
                />
                {err("pincode")}
              </div>
            </div>
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
            {form.gstin ? (
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
              <dd className="text-[#07543F] font-bold">FREE</dd>
            </div>
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
            <span>{form.gstin ? "GST tax invoice for your business" : "Add your GSTIN above for a GST invoice"}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
