"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, CheckCircle2, Send, Star } from "lucide-react";
import { ProductItem } from "@/lib/products-data";
import { useAuth } from "@/lib/auth-context";

interface ProductEnquiryModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductEnquiryModal: React.FC<ProductEnquiryModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Autofill user details if authenticated
  useEffect(() => {
    if (user && isOpen) {
      if (user.name) setFullName((prev) => prev || user.name);
      if (user.email) setEmail((prev) => prev || user.email);
      if (user.phone) setPhone((prev) => prev || user.phone || "");
      if (user.company) setCompanyName((prev) => prev || user.company || "");
    }
  }, [user, isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      setErrorMsg(null);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg("Please provide your name, phone number, and email.");
      return;
    }

    const serviceTypeMap: Record<string, string> = {
      lighting: "lighting-products",
      solar: "solar-components",
      electrical: "electrical-products",
    };

    const serviceType = product
      ? serviceTypeMap[product.category] || "general-inquiry"
      : "general-inquiry";

    const composedMessage = [
      product ? `Product of Interest: ${product.name} (${product.categoryName})` : "General Product Enquiry",
      quantity.trim() ? `Required Quantity / Units: ${quantity.trim()}` : "",
      companyName.trim() ? `Company: ${companyName.trim()}` : "",
      notes.trim() ? `Requirements / Notes:\n${notes.trim()}` : "Customer requested product availability and pricing details.",
    ]
      .filter(Boolean)
      .join("\n\n");

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          companyName: companyName.trim() || undefined,
          serviceType,
          message: composedMessage,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMsg(error?.message || "Failed to send enquiry. Please contact us via phone or WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg bg-[#FFFDEB] text-buraq-dark rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border border-black/[0.08] shadow-[0_25px_60px_-15px_rgba(16,32,31,0.4)] flex flex-col gap-4 animate-in zoom-in-95 duration-200 cursor-default max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-buraq-dark/60 hover:text-buraq-dark hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-buraq-sage/60 rounded-full flex items-center justify-center mx-auto text-buraq-primary">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-buraq-dark tracking-tight">
              Enquiry Received
            </h3>
            <p className="text-sm text-buraq-muted max-w-sm mx-auto leading-relaxed">
              Thank you for your enquiry regarding{" "}
              <strong className="text-buraq-dark">
                {product?.name || "our products"}
              </strong>
              . Our sales team will get back to you shortly with availability, technical details, and offline supply coordination.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-buraq-primary text-white text-sm font-bold hover:bg-buraq-dark transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="pr-8">
              <h3 className="text-xl sm:text-2xl font-black text-buraq-dark tracking-tight leading-snug">
                {product ? product.name : "Product Availability Enquiry"}
              </h3>
            </div>

            {/* Product Summary Preview Card */}
            {product && (
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase text-buraq-accent tracking-wider">
                    {product.categoryName} &bull; {product.brand || "BURAQ"}
                  </div>
                  <div className="text-xs sm:text-[13px] font-bold text-buraq-dark truncate mt-0.5">
                    {product.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-sm font-extrabold text-buraq-dark">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-neutral-400 line-through font-medium">
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">
                      {product.discountPercent}% off
                    </span>
                    <div className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[10px] font-bold">
                      <span>{product.rating.toFixed(1)}</span>
                      <Star className="w-2.5 h-2.5 fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <p className="text-xs font-semibold text-rose-600">
                {errorMsg}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-buraq-dark mb-1">
                  Full Name <span className="text-buraq-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-buraq-dark mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="Optional"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-buraq-dark mb-1">
                  Phone Number <span className="text-buraq-accent">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-buraq-dark mb-1">
                  Email Address <span className="text-buraq-accent">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-buraq-dark mb-1">
                Estimated Quantity / Project Scale
              </label>
              <input
                type="text"
                placeholder="e.g. 50 units, 500 meters, 10kW system (Optional)"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-buraq-dark mb-1">
                Specific Specifications or Project Details
              </label>
              <textarea
                rows={2}
                placeholder="Specify dimensions, ratings, delivery destination, or project requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
              />
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-buraq-primary text-white font-bold text-sm shadow-md hover:bg-buraq-dark disabled:opacity-60 transition-colors"
              >
                <Send className="w-4 h-4 text-buraq-sage" />
                <span>{isSubmitting ? "Submitting Enquiry..." : "Send Product Enquiry"}</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-buraq-muted">
              Products are supplied offline on an enquiry and quotation basis. No online payments required.
            </p>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};
