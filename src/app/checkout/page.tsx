"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, totalAmount, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "West Bengal",
    pincode: "",
    paymentMethod: "ONLINE",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = "BQ-ORD-" + Math.floor(100000 + Math.random() * 900000);
      setOrderSuccess(orderId);
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="py-20 px-4 max-w-xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#07543F] uppercase tracking-widest">Order Confirmed</span>
          <h1 className="text-3xl font-black text-[#10201F]">Thank You For Your Order!</h1>
          <p className="text-xs text-[#10201F]/70">
            Your order number is <strong className="text-[#10201F] font-mono">{orderSuccess}</strong>. We have dispatched a confirmation email and SMS with delivery tracking details.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] text-left space-y-3 text-xs">
          <div className="flex justify-between border-b border-[#E2DED5] pb-2">
            <span className="text-[#667085]">Delivery Address:</span>
            <span className="text-[#10201F] font-medium text-right">{formData.address}, {formData.city} - {formData.pincode}</span>
          </div>
          <div className="flex justify-between border-b border-[#E2DED5] pb-2">
            <span className="text-[#667085]">Payment Mode:</span>
            <span className="text-[#10201F] font-medium">{formData.paymentMethod === "ONLINE" ? "Online Payment (UPI/Cards)" : "Cash On Delivery"}</span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-1">
            <span className="text-[#10201F]">Amount Paid:</span>
            <span className="text-[#07543F]">₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-xl bg-[#07543F] text-[#FFFDEB] font-bold text-xs uppercase tracking-wider"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-black text-[#10201F]">Your Cart is Empty</h2>
        <p className="text-xs text-[#667085]">Please add items from the catalog before checking out.</p>
        <Link
          href="/products"
          className="inline-flex px-5 py-2.5 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold uppercase tracking-wider"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      <Link href="/products" className="text-xs text-[#667085] font-bold">
        ← Continue Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Shipping Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] space-y-6">
            <h2 className="text-xl font-black uppercase text-[#10201F] tracking-tight">
              1. Delivery & Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#10201F]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] focus:outline-none focus:border-[#07543F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#10201F]">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98300 00000"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] focus:outline-none focus:border-[#07543F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#10201F]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rajesh@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] focus:outline-none focus:border-[#07543F]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#10201F]">Delivery Address *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Flat / House No, Street name, Landmark..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] focus:outline-none focus:border-[#07543F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#10201F]">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Kolkata"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] focus:outline-none focus:border-[#07543F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#10201F]">PIN Code *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="700001"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] focus:outline-none focus:border-[#07543F]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] space-y-4">
            <h2 className="text-xl font-black uppercase text-[#10201F] tracking-tight">
              2. Select Payment Method
            </h2>

            <div className="space-y-3">
              <label
                onClick={() => setFormData({ ...formData, paymentMethod: "ONLINE" })}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer ${
                  formData.paymentMethod === "ONLINE"
                    ? "bg-[#FFFDEB] border-[#07543F]"
                    : "bg-[#FFFDEB]/40 border-[#E2DED5]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    formData.paymentMethod === "ONLINE" ? "border-[#07543F] bg-[#07543F]" : "border-[#667085]"
                  }`}>
                    {formData.paymentMethod === "ONLINE" && <div className="w-1.5 h-1.5 rounded-full bg-[#FFFDEB]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10201F]">Online Payment (UPI, Credit/Debit Card, Netbanking)</div>
                    <div className="text-[11px] text-[#667085]">Instant order confirmation with 256-bit SSL encryption</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#07543F]">Instant</span>
              </label>

              <label
                onClick={() => setFormData({ ...formData, paymentMethod: "COD" })}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer ${
                  formData.paymentMethod === "COD"
                    ? "bg-[#FFFDEB] border-[#07543F]"
                    : "bg-[#FFFDEB]/40 border-[#E2DED5]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    formData.paymentMethod === "COD" ? "border-[#07543F] bg-[#07543F]" : "border-[#667085]"
                  }`}>
                    {formData.paymentMethod === "COD" && <div className="w-1.5 h-1.5 rounded-full bg-[#FFFDEB]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10201F]">Cash On Delivery (COD)</div>
                    <div className="text-[11px] text-[#667085]">Pay when courier arrives at your location</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#667085]">COD</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-[#07543F] text-[#FFFDEB] font-black uppercase tracking-wider text-sm flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Processing Order...</span>
            ) : (
              <span>Confirm Order • ₹{totalAmount.toLocaleString("en-IN")}</span>
            )}
          </button>
        </form>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] space-y-6">
          <h3 className="text-lg font-black uppercase text-[#10201F] tracking-tight border-b border-[#E2DED5] pb-4">
            Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 text-xs">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg bg-[#FAF8E4] border border-[#E2DED5] shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#10201F] truncate">{product.name}</h4>
                  <div className="text-[#667085]">Qty: {quantity} × ₹{product.price.toLocaleString("en-IN")}</div>
                </div>
                <div className="font-bold text-[#07543F]">₹{(product.price * quantity).toLocaleString("en-IN")}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E2DED5] space-y-2 text-xs text-[#10201F]">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="text-[#10201F]">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>GST Tax (18%)</span>
              <span className="text-[#10201F]">₹{tax.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-[#07543F] font-bold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="pt-3 border-t border-[#E2DED5] flex justify-between text-base font-black text-[#10201F]">
              <span>Grand Total</span>
              <span className="text-[#07543F]">₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFFDEB] border border-[#E2DED5] text-[11px] text-[#667085]">
            Official BURAQ Enterprise warranty card and GST tax invoice dispatched with shipment.
          </div>
        </div>
      </div>
    </div>
  );
}
