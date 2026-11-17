import React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl buraq-card flex flex-col overflow-hidden shadow-xs">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-[#FAF8E4] overflow-hidden p-3 flex items-center justify-center border-b border-[#E2DED5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
          {product.tag && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#07543F] text-[#FFFDEB] shadow-xs">
              {product.tag}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FDEEE5] text-[#D96B1F] border border-[#D96B1F]/30">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Category Pill */}
        <span className="absolute bottom-4 right-4 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-white text-[#667085] border border-[#E2DED5] uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Info Block */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#07543F] font-bold uppercase tracking-wider">
            <span>{product.brand}</span>
            <div className="flex items-center gap-1 text-[#D96B1F]">
              <Star className="w-3.5 h-3.5 fill-[#D96B1F]" />
              <span className="text-[#10201F]">{product.rating}</span>
              <span className="text-[#667085]">({product.reviewsCount})</span>
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
        <div className="pt-3 border-t border-[#E2DED5] flex items-center justify-between gap-2">
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
            className="px-3.5 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
