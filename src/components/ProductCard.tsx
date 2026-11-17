"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product, inr } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const href = `/product/${product.id}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="rounded-2xl flex flex-col overflow-hidden shadow-xs bg-white border border-[#E2DED5]">
      <Link href={href} className="block relative">
        <ProductImage src={product.photoUrl} alt={product.name} className="aspect-square w-full" />
        {!product.inStock ? (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#10201F]/80 text-white">
            Out of stock
          </span>
        ) : product.stockStatus === "LOW_STOCK" ? (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#D96B1F] text-white">
            Few left
          </span>
        ) : product.discountPercent > 0 ? (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#07543F] text-white">
            {product.discountPercent}% OFF
          </span>
        ) : null}
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider">
            <span className="text-[#07543F] truncate">{product.brand || "BURAQ"}</span>
            <span className="text-[#667085] font-medium normal-case tracking-normal truncate">{product.category.name}</span>
          </div>
          <Link href={href} className="block">
            <h3 className="font-bold text-sm text-[#10201F] line-clamp-2 leading-snug">{product.name}</h3>
          </Link>
          {product.description && (
            <p className="text-xs text-[#667085] line-clamp-2 leading-relaxed">{product.description}</p>
          )}
        </div>

        <div className="pt-2.5 border-t border-[#E2DED5] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-[#07543F]">{inr(product.price)}</span>
              {product.printedMrp && (
                <span className="text-[11px] text-[#9AA19C] line-through" title="MRP printed on the package">
                  {inr(product.printedMrp)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#667085]">
              {product.printedMrp ? "MRP " : ""}per {product.unit.toLowerCase()} · incl. GST
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{added ? "Added ✓" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
