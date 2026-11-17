"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = (params?.category as string) || "lighting";

  const categoryTitles: Record<string, { title: string; subtitle: string }> = {
    lighting: {
      title: "Commercial & Decorative Lighting Fixtures",
      subtitle: "Energy-efficient LED chandeliers, rustic pendants, architectural downlights, and facade lighting.",
    },
    electrical: {
      title: "Power Cables & Industrial Switchgear",
      subtitle: "Heavy-duty 1100V XLPE armoured cables, high-breaking MCCBs, distribution boards, and modular plates.",
    },
    solar: {
      title: "Solar Photovoltaic Modules & Inverters",
      subtitle: "550W Tier-1 bifacial monocrystalline panels, dual MPPT grid-tied inverters, and hot-dip structures.",
    },
  };

  const currentInfo = categoryTitles[categorySlug] || {
    title: `${categorySlug.toUpperCase()} Products`,
    subtitle: "High performance electrical and infrastructure hardware.",
  };

  const products = PRODUCTS.filter((p) => p.category === categorySlug);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Category Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel relative overflow-hidden space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D96B1F]">
          BURAQ CATEGORY SHOWCASE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#10201F] tracking-tight">
          {currentInfo.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#10201F]/60 max-w-2xl leading-relaxed">
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
