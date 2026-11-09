"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Lightbulb, Sun, Zap, CheckCircle2 } from "lucide-react";
import { PRODUCTS_CATALOGUE, ProductItem } from "@/lib/products-data";
import { ProductCard } from "./ProductCard";

interface ProductsFilterShowcaseProps {
  initialCategory?: "all" | "lighting" | "solar" | "electrical";
  headline?: string;
  subheadline?: string;
  showAllTab?: boolean;
  showFilterBar?: boolean;
}

export const ProductsFilterShowcase: React.FC<ProductsFilterShowcaseProps> = ({
  initialCategory = "lighting",
  headline,
  subheadline,
  showAllTab = false,
  showFilterBar = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "lighting" | "solar" | "electrical">(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    ...(showAllTab ? [{ id: "all" as const, label: "All Categories", icon: SlidersHorizontal }] : []),
    { id: "lighting" as const, label: "Lighting Products", icon: Lightbulb },
    { id: "solar" as const, label: "Solar Components", icon: Sun },
    { id: "electrical" as const, label: "Electrical Products", icon: Zap },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOGUE.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.shortDesc.toLowerCase().includes(query) ||
        item.categoryName.toLowerCase().includes(query) ||
        (item.specifications &&
          item.specifications.some((spec) => spec.toLowerCase().includes(query)));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      {/* Search & Category Filter Controls (Optional) */}
      {showFilterBar && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 border border-buraq-border shadow-xs">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-buraq-primary text-white shadow-sm"
                        : "bg-[#FFFDEB] text-buraq-dark/80 hover:text-buraq-primary hover:bg-buraq-sage/30 border border-buraq-border/60"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-buraq-sage" : "text-buraq-muted"}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-buraq-muted" />
              <input
                type="text"
                placeholder="Search products, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-buraq-border/80 bg-white focus:outline-none focus:border-buraq-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-buraq-muted hover:text-buraq-dark"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Showing results count */}
          <div className="flex items-center justify-between text-xs text-buraq-muted px-1">
            <span>
              Showing <strong className="text-buraq-dark">{filteredProducts.length}</strong> products
              {selectedCategory !== "all" ? ` in ${categories.find((c) => c.id === selectedCategory)?.label}` : ""}
            </span>
            <span className="hidden sm:inline">Offline B2B Supply &bull; Quotes on Enquiry</span>
          </div>
        </>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-white/60 border border-buraq-border space-y-3">
          <p className="text-base font-bold text-buraq-dark">No products matched your search.</p>
          <p className="text-xs text-buraq-muted max-w-md mx-auto">
            Try adjusting your search keywords or switch category filter to view our full catalogue of lighting, solar, and electrical components.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-2 px-5 py-2 rounded-full bg-buraq-primary text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
