"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "lighting" | "electrical" | "solar">("all");

  const filteredProducts =
    activeTab === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <div className="flex flex-col w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Product Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DED5] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#07543F] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available In Stock</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#10201F] tracking-tight">
            Products Catalog
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FFFFFF] border border-[#E2DED5] overflow-x-auto">
          {(
            [
              { id: "all", label: "All Items" },
              { id: "lighting", label: "Lighting" },
              { id: "electrical", label: "Electrical" },
              { id: "solar", label: "Solar Energy" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#07543F] text-[#FFFDEB] font-bold shadow-sm"
                  : "text-[#10201F] hover:text-[#10201F] hover:bg-[#F2F7F4]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direct Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
