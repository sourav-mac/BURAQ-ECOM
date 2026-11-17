"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, NAV_DEPARTMENTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useFilter } from "@/context/FilterContext";

export default function HomePage() {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const { searchTerm, sortOption, setSearchTerm } = useFilter();

  const activeDepartment = useMemo(() => {
    return NAV_DEPARTMENTS.find((d) => d.id === selectedDept) || NAV_DEPARTMENTS[0];
  }, [selectedDept]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      const matchDept =
        selectedDept === "all"
          ? true
          : activeDepartment.subCategories.includes(product.category);

      const matchSearch =
        searchTerm.trim() === ""
          ? true
          : product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());

      return matchDept && matchSearch;
    });

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedDept, activeDepartment, sortOption, searchTerm]);

  return (
    <div className="flex flex-col w-full py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-3">
      {/* Clean Primary Departments: ALL | LIGHTS | WIRES | FANS | ELECTRIC */}
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
                  onClick={() => setSelectedDept(dept.id)}
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

      {/* Product Cards Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E2DED5] rounded-2xl space-y-3 shadow-xs">
          <p className="text-base font-bold text-[#10201F]">
            No products match your current filters.
          </p>
          <p className="text-xs text-[#667085]">
            Try choosing another category or clearing the search keyword.
          </p>
          <button
            onClick={() => {
              setSelectedDept("all");
              setSearchTerm("");
            }}
            className="px-5 py-2 rounded-full bg-[#07543F] text-white text-xs font-bold cursor-pointer shadow-xs"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-1">
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
