"use client";

import React, { useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useFilter } from "@/context/FilterContext";

export default function ProductsCatalogPage() {
  const { searchTerm, sortOption, setSearchTerm } = useFilter();

  const filteredAndSorted = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchSearch =
        searchTerm.trim() === ""
          ? true
          : p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchSearch;
    });

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [sortOption, searchTerm]);

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Catalog Grid */}
      {filteredAndSorted.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E2DED5] rounded-2xl space-y-3 shadow-xs">
          <p className="text-base font-bold text-[#10201F]">No products found matching your search.</p>
          <button
            onClick={() => setSearchTerm("")}
            className="px-5 py-2 rounded-full bg-[#07543F] text-white text-xs font-bold cursor-pointer shadow-xs"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
