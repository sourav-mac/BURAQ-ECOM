"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-[#667085] hover:text-[#10201F]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
        {/* Image */}
        <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#EFECE3]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm text-[#667085]">{product.brand}</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#10201F] leading-tight">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#10201F]">{inr(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-base text-[#667085] line-through">{inr(product.mrp)}</span>
                <span className="text-sm font-semibold text-[#D96B1F]">
                  {product.discountPercent}% off
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-[#667085]">Inclusive of all taxes</p>

          <p className="mt-6 text-sm text-[#10201F]/80 leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center h-12 rounded-xl border border-[#E2DED5] bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-11 h-full flex items-center justify-center text-[#10201F] cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium text-[#10201F]">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-11 h-full flex items-center justify-center text-[#10201F] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex-1 h-12 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!product.inStock ? "Out of stock" : added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </div>

          {product.specifications.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold text-[#10201F] mb-3">Specifications</h2>
              <dl className="divide-y divide-[#EFECE3] border-y border-[#EFECE3] text-sm">
                {product.specifications.map((s) => (
                  <div key={s.key} className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#667085]">{s.key}</dt>
                    <dd className="text-[#10201F] text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
