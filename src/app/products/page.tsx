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
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="border-b border-[#E2DED5] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#10201F] tracking-tight">
          Complete Inventory Catalog
        </h1>
        <p className="text-xs text-[#667085] mt-1">
          Browse by category, search brands, and sort by price.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-5 rounded-2xl bg-white border border-[#E2DED5] shadow-xs space-y-4">
        {/* Top Controls: Search + Sort Dropdown */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search lights, wire, fans, MCBs, switches, wall lamps..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/60 focus:outline-none focus:border-[#07543F]"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-[#10201F]">Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-3.5 py-2 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs font-bold text-[#10201F] focus:outline-none focus:border-[#07543F] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Categories Strip */}
        <div className="pt-2 border-t border-[#E2DED5]/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#07543F]">
              Categories:
            </span>
            {(selectedCategory !== "all" || searchTerm || sortOption !== "featured") && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                  setSortOption("featured");
                }}
                className="text-[11px] font-bold text-[#D96B1F] cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-none ${
                  selectedCategory === c.id
                    ? "bg-[#07543F] text-[#FFFDEB] shadow-xs"
                    : "bg-[#FAF8E4] border border-[#E2DED5] text-[#10201F]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredAndSorted.length === 0 ? (
        <div className="py-24 text-center bg-white border border-[#E2DED5] rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-[#10201F]">No products found matching your search.</h3>
          <p className="text-xs text-[#667085]">Try searching for other keywords or select All Categories.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSortOption("featured");
            }}
            className="px-4 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold cursor-pointer"
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
