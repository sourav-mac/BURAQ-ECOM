"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api, Product } from "@/lib/api";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductSkeleton";
import { useFilter } from "@/context/FilterContext";

/** Live product grid backed by the BURAQ backend. Uses navbar search + sort. */
export function ProductGrid({ categoryId, title }: { categoryId?: string; title?: string }) {
  const { searchTerm, sortOption, setSearchTerm } = useFilter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    // Debounce typing in the search box
    const t = setTimeout(() => {
      api
        .products({ search: searchTerm.trim(), categoryId, sort: sortOption, limit: 100 })
        .then(({ products }) => !cancelled && setProducts(products))
        .catch((e) => !cancelled && setError(e.message));
    }, searchTerm ? 300 : 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [searchTerm, sortOption, categoryId, reload]);

  return (
    <div className="flex flex-col w-full py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {title && <h1 className="text-lg font-bold text-[#10201F] mb-4">{title}</h1>}

      {error ? (
        <div className="py-20 text-center space-y-3">
          <p className="text-base font-bold text-[#10201F]">Couldn&apos;t load products</p>
          <p className="text-xs text-[#667085]">{error}</p>
          <button
            onClick={() => setReload((n) => n + 1)}
            className="px-5 py-2 rounded-full bg-[#07543F] text-white text-xs font-bold cursor-pointer"
          >
            Try again
          </button>
        </div>
      ) : products === null ? (
        <ProductGridSkeleton count={8} />
      ) : products.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="text-base font-bold text-[#10201F]">
            {searchTerm ? `No products match “${searchTerm}”` : "No products available yet"}
          </p>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm("")}
              className="px-5 py-2 rounded-full bg-[#07543F] text-white text-xs font-bold cursor-pointer"
            >
              Clear search
            </button>
          ) : (
            categoryId && (
              <Link href="/products" className="inline-flex px-5 py-2 rounded-full bg-[#07543F] text-white text-xs font-bold">
                Browse all products
              </Link>
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
