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
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
