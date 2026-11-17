"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="rounded-2xl buraq-card flex flex-col overflow-hidden shadow-xs">
      {/* Full Edge-to-Edge Image (No inner padding, no borders) */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square w-full overflow-hidden bg-[#FAF8E4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {product.discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#D96B1F] text-white">
            {product.discountPercent}% OFF
          </span>
        )}
      </Link>

      {/* Info Block */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-[#07543F] font-bold uppercase tracking-wider">
            <span>{product.brand}</span>
            <div className="text-[#D96B1F] font-bold">
              ★ {product.rating}{" "}
              <span className="text-[#667085] font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-bold text-sm text-[#10201F] line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#667085] line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-2.5 border-t border-[#E2DED5] flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-[#07543F]">
              ₹{product.price.toLocaleString("en-IN")}
            </div>
            {product.mrp > product.price && (
              <div className="text-[11px] text-[#667085] line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{added ? "Added ✓" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
