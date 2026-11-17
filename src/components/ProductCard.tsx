import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl buraq-card flex flex-col overflow-hidden shadow-xs">
      {/* Full Edge-to-Edge Image (No inner padding, no borders) */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8E4]">
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
      </div>

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

          <Link
            href={`/product/${product.slug}`}
            className="px-4 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold shadow-xs text-center"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
