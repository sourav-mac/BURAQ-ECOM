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
    <div className="flex flex-col w-full py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-5">
      {/* Clean Compact Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E2DED5] pb-3">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl sm:text-2xl font-black uppercase text-[#10201F] tracking-tight">
            Products Catalog
          </h1>
          <span className="text-xs text-[#667085]">
            ({filteredAndSortedProducts.length} items)
          </span>
        </div>

        {/* Compact Search & Sort Bar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-48 sm:w-60 px-3 py-1.5 rounded-lg bg-white border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/60 focus:outline-none focus:border-[#07543F]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#667085] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E2DED5] text-xs font-bold text-[#10201F] focus:outline-none focus:border-[#07543F] cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {(selectedCategory !== "all" || searchTerm || sortOption !== "featured") && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
                setSortOption("featured");
              }}
              className="text-[11px] font-bold text-[#D96B1F] cursor-pointer whitespace-nowrap px-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Strip - Compact & Wrapped without scroll */}
      <div className="flex flex-wrap items-center gap-1.5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-none ${
                isSelected
                  ? "bg-[#07543F] text-[#FFFDEB] shadow-xs"
                  : "bg-white border border-[#E2DED5] text-[#10201F]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Cards Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="py-16 text-center bg-white border border-[#E2DED5] rounded-xl space-y-2">
          <p className="text-sm font-bold text-[#10201F]">
            No products match your current filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchTerm("");
              setSortOption("featured");
            }}
            className="px-4 py-1.5 rounded-lg bg-[#07543F] text-[#FFFDEB] text-xs font-bold cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
