"use client";

import React, { createContext, useContext, useState } from "react";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

interface FilterContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    // Outside FilterProvider (e.g. Next.js /_global-error prerender): return a safe no-op fallback
    return {
      searchTerm: "",
      setSearchTerm: () => {},
      sortOption: "featured" as SortOption,
      setSortOption: () => {},
    } satisfies FilterContextType;
  }
  return context;
}
