"use client";

import React from "react";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalItems,
    subtotal,
    tax,
    shipping,
    totalAmount,
  } = useCart();

  if (!isCartOpen) return null;
  const close = () => setIsCartOpen(false);

  return (
    <div className="fixed inset-0 z-50">
      <div onClick={close} className="absolute inset-0 bg-[#10201F]/30 backdrop-blur-[2px]" />

      <aside className="absolute inset-y-0 right-0 w-full max-w-md bg-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#EFECE3]">
          <h2 className="text-base font-semibold text-[#10201F]">
            Your cart <span className="text-[#667085] font-normal">({totalItems})</span>
          </h2>
          <button
            onClick={close}
            aria-label="Close cart"
            className="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-[#667085] hover:bg-[#F7F4EE] hover:text-[#10201F] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#F2F7F4] flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-[#07543F]" />
            </div>
            <p className="font-semibold text-[#10201F]">Your cart is empty</p>
            <p className="text-sm text-[#667085] mt-1">Add some products to get started.</p>
            <button
              onClick={close}
              className="mt-6 h-11 px-6 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-white text-sm font-semibold cursor-pointer"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <ul className="flex-1 overflow-y-auto px-6 divide-y divide-[#EFECE3]">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="py-5 flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#F7F4EE] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <h4 className="text-sm font-medium text-[#10201F] line-clamp-2 leading-snug">
                        {product.name}
                      </h4>
                      <span className="text-sm font-semibold text-[#10201F] whitespace-nowrap">
                        {inr(product.price * quantity)}
                      </span>
                    </div>
                    <p className="text-xs text-[#667085] mt-0.5">{product.brand}</p>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="flex items-center h-8 rounded-lg border border-[#E2DED5]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-full flex items-center justify-center text-[#10201F] hover:bg-[#F7F4EE] rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#10201F]">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-full flex items-center justify-center text-[#10201F] hover:bg-[#F7F4EE] rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs text-[#667085] hover:text-[#D96B1F] cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="px-6 py-5 border-t border-[#EFECE3] space-y-4">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-[#667085]">
                  <dt>Subtotal</dt>
                  <dd className="text-[#10201F]">{inr(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-[#667085]">
                  <dt>GST (18%)</dt>
                  <dd className="text-[#10201F]">{inr(tax)}</dd>
                </div>
                <div className="flex justify-between text-[#667085]">
                  <dt>Delivery</dt>
                  <dd className={shipping === 0 ? "text-[#07543F] font-medium" : "text-[#10201F]"}>
                    {shipping === 0 ? "Free" : inr(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#EFECE3] text-base font-semibold text-[#10201F]">
                  <dt>Total</dt>
                  <dd>{inr(totalAmount)}</dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                onClick={close}
                className="w-full h-12 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-white text-sm font-semibold flex items-center justify-center transition-colors"
              >
                Checkout
              </Link>
              <button
                onClick={close}
                className="w-full text-sm text-[#667085] hover:text-[#10201F] cursor-pointer"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
