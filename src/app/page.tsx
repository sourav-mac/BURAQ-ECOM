"use client";

import React, { useState } from "react";
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
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#10201F] tracking-tight">
            Products Catalog
          </h1>
        </div>

        {/* Filter Tabs - strictly no hover effects */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#E2DED5] overflow-x-auto">
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#07543F] text-[#FFFDEB] font-bold shadow-xs"
                  : "text-[#10201F] bg-white"
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
