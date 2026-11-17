"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, ProductCategory, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = ((params?.category as string) || "lighting").toLowerCase() as ProductCategory;
  const [sortOption, setSortOption] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const categoryTitles: Record<ProductCategory, { title: string; subtitle: string }> = {
    lighting: {
      title: "Commercial & Industrial Lighting",
      subtitle: "Energy-efficient LED floodlights, architectural luminaires, and commercial panels.",
    },
    wire: {
      title: "Cables & Building Wires",
      subtitle: "100% pure electrolytic copper flame retardant (FR/HRFR) cables for safe power distribution.",
    },
    fan: {
      title: "Ceiling & Exhaust Fans",
      subtitle: "High-airflow decorative sweep ceiling fans and energy saving 5-star BLDC motors.",
    },
    mcb: {
      title: "Circuit Breakers & Isolators",
      subtitle: "10kA breaking capacity SP, DP, and 4-Pole miniature circuit breakers and safety disconnectors.",
    },
    switch: {
      title: "Modular Switches & Plates",
      subtitle: "Architectural glass-finish modular switch plates, heavy appliance switches, and regulators.",
    },
    accessories: {
      title: "Wiring Accessories & Enclosures",
      subtitle: "Distribution boards, metal concealed boxes, junction enclosures, and installation hardware.",
    },
    "wall-lamp": {
      title: "Wall Lamps & Sconces",
      subtitle: "Bidirectional waterproof exterior LED wall sconces and antique brass filigree fixtures.",
    },
    "hanging-lamp": {
      title: "Hanging Lamps & Chandeliers",
      subtitle: "Statement dining pendants, nautical rope lights, and tiered K9 optical crystal chandeliers.",
    },
    "ceiling-light": {
      title: "Ceiling Downlights & Surface Fixtures",
      subtitle: "Deep recessed anti-glare COB downlights and ultra-slim flush surface ambient lights.",
    },
    others: {
      title: "Industrial & Electrical Hardware",
      subtitle: "Surge-protected extension hubs, digital voltage & ampere panel meters, and accessories.",
    },
  };

  const currentInfo = categoryTitles[categorySlug] || {
    title: `${categorySlug.toUpperCase()} Products`,
    subtitle: "High performance electrical and infrastructure hardware.",
  };

  const sortedProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.category === categorySlug);
    if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [categorySlug, sortOption]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Back button */}
      <div>
        <Link href="/" className="text-xs text-[#667085] font-bold">
          ← Back to All Categories
        </Link>
      </div>

      {/* Category Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2DED5] shadow-xs space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#10201F] tracking-tight">
          {currentInfo.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] max-w-2xl leading-relaxed">
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Filter / Sort bar */}
      <div className="p-4 rounded-xl bg-white border border-[#E2DED5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs text-[#667085]">
          Showing <strong className="text-[#10201F]">{sortedProducts.length}</strong> {sortedProducts.length === 1 ? "item" : "items"} in {categorySlug.toUpperCase()}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#10201F]">Sort By:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-[#FAF8E4] border border-[#E2DED5] text-xs font-bold text-[#10201F] focus:outline-none focus:border-[#07543F] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E2DED5] rounded-2xl space-y-3">
          <p className="text-sm font-bold text-[#10201F]">
            No products found in this category.
          </p>
          <Link
            href="/"
            className="inline-flex px-4 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold cursor-pointer"
          >
            Browse All Categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
