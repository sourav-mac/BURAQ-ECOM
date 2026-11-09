"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS_CATALOGUE } from "@/lib/products-data";
import { ProductCard } from "@/components/products/ProductCard";

export const FeaturedProductsSection: React.FC = () => {
  // Verified featured products across the 3 categories
  const featured = PRODUCTS_CATALOGUE.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-white via-[#FAF8F2] to-[#FFFDEB] z-10">
      {/* Soft Ambient Aurora Glow & Seamless Bottom Transition into AboutTeaser */}
      <div className="absolute -bottom-24 right-1/4 w-[540px] h-[300px] bg-gradient-to-l from-buraq-primary/8 via-[#25A170]/10 to-transparent rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#FFFDEB]/60 to-[#FFFDEB] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Header */}
        <div>
          <div className="space-y-3">
            <div className="w-12 h-1 bg-buraq-primary rounded-full" />
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-buraq-dark tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-buraq-muted max-w-xl">
              Factual, specification-backed products across lighting luminaires, solar energy hardware, and heavy power cables.
            </p>
          </div>
        </div>

        {/* 6 Products Grid - Side-by-side 2 columns on phone without horizontal scroll */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Note — Sleek Centered Pill Badge Equal to Line Length */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <div className="w-fit max-w-full py-2.5 sm:py-3 px-6 sm:px-8 rounded-full bg-black text-center text-xs sm:text-[13.5px] font-semibold text-white tracking-wide shadow-lg border border-white/10 inline-flex items-center justify-center leading-relaxed">
            <span>
              All products supplied <span className="text-orange-400 font-bold">offline</span> on an <span className="text-orange-400 font-bold">enquiry &amp; project specification</span> basis. <span className="text-orange-400 font-bold">No online checkout or payments</span> required.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
