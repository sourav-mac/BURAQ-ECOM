"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function ProductsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProductCategory>("all");
  const [sortOption, setSortOption] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSorted = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortOption, searchTerm]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2DED5]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#10201F] tracking-tight">
              Complete Catalog
            </h1>
            <span className="text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#E7F1EB] text-[#07543F] border border-[#07543F]/20">
              {filteredAndSorted.length} items
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1 font-medium">
            Browse all certified lighting, cables, fans, MCBs, and modular switches.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search catalog..."
              className="w-full sm:w-64 pl-4 pr-7 py-2 rounded-full bg-white border border-[#E2DED5] text-xs font-medium text-[#10201F] placeholder:text-[#667085]/60 focus:outline-none focus:border-[#07543F] focus:ring-2 focus:ring-[#07543F]/10 shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E2DED5] text-[#10201F] text-[10px] font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="appearance-none pl-4 pr-8 py-2 rounded-full bg-white border border-[#E2DED5] text-xs font-bold text-[#10201F] focus:outline-none focus:border-[#07543F] focus:ring-2 focus:ring-[#07543F]/10 shadow-2xs cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#667085]">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Clean Line-Divided Category Links (No Box Design) */}
      <div className="flex flex-wrap items-center gap-y-2 text-xs">
        {CATEGORIES.map((c, index) => {
          const isSelected = selectedCategory === c.id;

          return (
            <React.Fragment key={c.id}>
              {index > 0 && (
                <span className="text-[#C5BEB3] px-2.5 select-none">|</span>
              )}
              <button
                onClick={() => setSelectedCategory(c.id)}
                className={`py-1 uppercase tracking-wider font-bold transition-none cursor-pointer ${
                  isSelected
                    ? "text-[#07543F] underline decoration-2 underline-offset-4 font-black"
                    : "text-[#10201F]/80"
                }`}
              >
                {c.label}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Catalog Grid */}
      {filteredAndSorted.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E2DED5] rounded-2xl space-y-3 shadow-xs">
          <p className="text-base font-bold text-[#10201F]">No products found matching your search.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSortOption("featured");
            }}
            className="px-5 py-2 rounded-full bg-[#07543F] text-white text-xs font-bold cursor-pointer shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
