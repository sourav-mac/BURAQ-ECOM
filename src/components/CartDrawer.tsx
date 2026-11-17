"use client";

import React from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    shipping,
    totalAmount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#10201F]/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDEB] border-l border-[#E2DED5] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#E2DED5] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#07543F]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-[#10201F]">Your Cart</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#FFFDEB] text-[10px] font-bold text-[#10201F]">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#667085] hover:text-[#10201F] hover:bg-[#F2F7F4] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] flex items-center justify-center text-[#667085]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#10201F]">Your cart is empty</h3>
                <p className="text-xs text-[#667085] max-w-xs mx-auto">
                  Browse our high-grade lighting, electrical switchgear, and solar packages.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold hover:bg-[#053E2E] transition-colors cursor-pointer"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2DED5] flex gap-3 group hover:border-[#07543F]/40 transition-colors"
                >
                  <div className="w-18 h-18 rounded-lg bg-[#FFFDEB] border border-[#E2DED5] overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#10201F] truncate">{product.name}</h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#667085] hover:text-rose-400 p-0.5 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#07543F] font-semibold">
                        {product.brand}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 bg-[#FFFDEB] border border-[#E2DED5] rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-[#10201F] hover:text-[#10201F] hover:bg-[#F2F7F4] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#10201F]">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-[#10201F] hover:text-[#10201F] hover:bg-[#F2F7F4] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-[#07543F]">
                          ₹{(product.price * quantity).toLocaleString("en-IN")}
                        </div>
                        {product.mrp > product.price && (
                          <div className="text-[10px] text-[#667085] line-through">
                            ₹{(product.mrp * quantity).toLocaleString("en-IN")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E2DED5] bg-[#FFFFFF] space-y-3">
              <div className="space-y-1.5 text-xs text-[#10201F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#10201F] font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18% inclusive estimate)</span>
                  <span className="text-[#10201F] font-medium">₹{tax.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-medium text-[#07543F]">
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E2DED5] flex justify-between text-sm font-black text-[#10201F]">
                  <span>Total Amount</span>
                  <span className="text-[#07543F]">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-[#FFFDEB] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#667085] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#07543F]" />
                <span>100% Secure Checkout • Direct Buraq Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
