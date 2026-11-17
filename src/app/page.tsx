"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProductCategory>("all");
  const [sortOption, setSortOption] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === "all" ? true : product.category === selectedCategory;
      const matchSearch =
        searchTerm.trim() === ""
          ? true
          : product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
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
    <div className="flex flex-col w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#E2DED5] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#10201F] tracking-tight">
          Products Catalog
        </h1>
        <p className="text-xs text-[#667085] mt-1">
          Explore genuine electricals, commercial lighting fixtures, wiring, and switchgear.
        </p>
      </div>

      {/* FILTER & SORT SECTION */}
      <section className="bg-white border border-[#E2DED5] rounded-2xl p-5 shadow-xs space-y-5">
        {/* Top Row: Search + Sort Dropdown */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, brand (Havells, Polycab, Philips...)"
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/60 focus:outline-none focus:border-[#07543F]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#667085] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-[#10201F]">Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-3.5 py-2 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs font-bold text-[#10201F] focus:outline-none focus:border-[#07543F] cursor-pointer"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="space-y-2 pt-2 border-t border-[#E2DED5]/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#07543F]">
              Filter by Category:
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
                Reset Filters
              </button>
            )}
          </div>

          {/* 10 Required Categories + All - Wrapped without scroll, numbers removed */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-none ${
                    isSelected
                      ? "bg-[#07543F] text-[#FFFDEB] shadow-xs"
                      : "bg-[#FAF8E4] border border-[#E2DED5] text-[#10201F]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-[#667085] pt-2 border-t border-[#E2DED5]/60">
          <div>
            Showing <strong className="text-[#10201F]">{filteredAndSortedProducts.length}</strong> {filteredAndSortedProducts.length === 1 ? "product" : "products"}
            {selectedCategory !== "all" && (
              <span> in <span className="uppercase text-[#07543F] font-bold">{selectedCategory}</span></span>
            )}
          </div>
          <div className="text-[11px]">
            Sorted by:{" "}
            <span className="font-bold text-[#10201F]">
              {sortOption === "price-asc"
                ? "Price (Low to High)"
                : sortOption === "price-desc"
                ? "Price (High to Low)"
                : sortOption === "rating"
                ? "Customer Rating"
                : "Featured"}
            </span>
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E2DED5] rounded-2xl space-y-3">
          <p className="text-sm font-bold text-[#10201F]">
            No products match your current filters.
          </p>
          <p className="text-xs text-[#667085]">
            Try choosing another category or resetting the search term.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchTerm("");
              setSortOption("featured");
            }}
            className="px-4 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
