"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function ProductsCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "lighting", label: "Lighting Fixtures" },
    { id: "electrical", label: "Electrical & Switchgear" },
    { id: "solar", label: "Solar Energy Systems" },
  ];

  let filtered = PRODUCTS.filter((p) => {
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search lights, power cables, switchgear, solar panels..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFDEB] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-[#07543F] text-[#FFFDEB]"
                  : "bg-[#FFFDEB] text-[#10201F] hover:text-[#10201F] hover:bg-[#F2F7F4]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="shrink-0 flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FFFDEB] border border-[#E2DED5] text-xs text-[#10201F] focus:outline-none focus:border-[#07543F] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center bg-[#FFFFFF] border border-[#E2DED5] rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-[#10201F]">No products found matching your search.</h3>
          <p className="text-xs text-[#667085]">Try searching for other keywords or select All Categories.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
