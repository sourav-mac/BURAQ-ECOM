"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, NAV_DEPARTMENTS, ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function ProductsCatalogPage() {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedSubCat, setSelectedSubCat] = useState<"all" | ProductCategory>("all");
  const [sortOption, setSortOption] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [searchTerm, setSearchTerm] = useState("");

  const activeDepartment = useMemo(() => {
    return NAV_DEPARTMENTS.find((d) => d.id === selectedDept) || NAV_DEPARTMENTS[0];
  }, [selectedDept]);

  const filteredAndSorted = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchDept =
        selectedDept === "all"
          ? true
          : activeDepartment.subCategories.includes(p.category);

      const matchSub =
        selectedSubCat === "all" ? true : p.category === selectedSubCat;

      const matchSearch =
        searchTerm.trim() === ""
          ? true
          : p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());

      return matchDept && matchSub && matchSearch;
    });

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedDept, activeDepartment, selectedSubCat, sortOption, searchTerm]);

  const subCategoryChips = useMemo(() => {
    if (selectedDept === "lights") {
      return [
        { id: "all", label: "ALL LIGHTS" },
        { id: "lighting", label: "COMMERCIAL LED" },
        { id: "wall-lamp", label: "WALL LAMP" },
        { id: "hanging-lamp", label: "HANGING LAMP" },
        { id: "ceiling-light", label: "CEILING LIGHT" },
      ];
    }
    if (selectedDept === "electric") {
      return [
        { id: "all", label: "ALL ELECTRIC" },
        { id: "switch", label: "SWITCH" },
        { id: "mcb", label: "MCB" },
        { id: "accessories", label: "ACCESSORIES" },
        { id: "others", label: "OTHERS" },
      ];
    }
    return [];
  }, [selectedDept]);

  return (
    <div className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-3">
      {/* Search & Sort Controls Row (No title / subtitle) */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-3.5 pr-7 py-1.5 rounded-full bg-white border border-[#E2DED5] text-xs font-medium text-[#10201F] placeholder:text-[#667085]/60 focus:outline-none focus:border-[#07543F] focus:ring-1 focus:ring-[#07543F]/20 shadow-2xs"
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

        <div className="relative shrink-0">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="appearance-none pl-3.5 pr-7 py-1.5 rounded-full bg-white border border-[#E2DED5] text-xs font-bold text-[#10201F] focus:outline-none focus:border-[#07543F] focus:ring-1 focus:ring-[#07543F]/20 shadow-2xs cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-[#667085]">
            ▼
          </div>
        </div>
      </div>

      {/* Primary Category Links: ALL | LIGHTS | WIRES | FANS | ELECTRIC */}
      <div className="w-full overflow-x-auto no-scrollbar pb-1 border-b border-[#E2DED5]">
        <div className="flex items-center whitespace-nowrap min-w-max text-xs">
          {NAV_DEPARTMENTS.map((dept, index) => {
            const isSelected = selectedDept === dept.id;

            return (
              <React.Fragment key={dept.id}>
                {index > 0 && (
                  <span className="text-[#C5BEB3] px-3 select-none">|</span>
                )}
                <button
                  onClick={() => {
                    setSelectedDept(dept.id);
                    setSelectedSubCat("all");
                  }}
                  className={`py-0.5 uppercase tracking-wider font-bold transition-none cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "text-[#07543F] underline decoration-2 underline-offset-4 font-black"
                      : "text-[#10201F]/70"
                  }`}
                >
                  {dept.label}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Secondary Sub-filters for Lights / Electric */}
      {subCategoryChips.length > 0 && (
        <div className="w-full overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1.5 whitespace-nowrap min-w-max text-[11px]">
            {subCategoryChips.map((sub) => {
              const isSelected = selectedSubCat === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubCat(sub.id as any)}
                  className={`px-3 py-1 rounded-full font-bold uppercase transition-none cursor-pointer border ${
                    isSelected
                      ? "bg-[#07543F] text-white border-[#07543F]"
                      : "bg-white text-[#10201F]/80 border-[#E2DED5]"
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Catalog Grid */}
      {filteredAndSorted.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E2DED5] rounded-2xl space-y-3 shadow-xs">
          <p className="text-base font-bold text-[#10201F]">No products found matching your search.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDept("all");
              setSelectedSubCat("all");
              setSortOption("featured");
            }}
            className="px-5 py-2 rounded-full bg-[#07543F] text-white text-xs font-bold cursor-pointer shadow-xs"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-1">
          {filteredAndSorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
