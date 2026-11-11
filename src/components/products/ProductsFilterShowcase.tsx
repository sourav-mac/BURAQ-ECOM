"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Lightbulb,
  Sun,
  Zap,
  ArrowUpDown,
  Star,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  Filter,
} from "lucide-react";
import { PRODUCTS_CATALOGUE, ProductItem } from "@/lib/products-data";
import { ProductCard } from "./ProductCard";

type CategoryId = "all" | "lighting" | "solar" | "electrical";
type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "discount";
type PriceRangeOption = "all" | "under-1500" | "1500-5000" | "above-5000";

interface ProductsFilterShowcaseProps {
  initialCategory?: CategoryId;
}

export const ProductsFilterShowcase: React.FC<ProductsFilterShowcaseProps> = ({
  initialCategory = "all",
}) => {
  const searchParams = useSearchParams();
  const paramSector = searchParams?.get("sector") || searchParams?.get("category");

  // Sector / Category State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(
    (paramSector as CategoryId) || initialCategory
  );

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<PriceRangeOption>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Restore saved scroll position instantaneously with zero jump / glitch
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedScroll = sessionStorage.getItem("buraq_product_scroll_y");
    if (savedScroll) {
      const scrollY = parseInt(savedScroll, 10);
      if (!isNaN(scrollY) && scrollY > 0) {
        window.scrollTo({ top: scrollY, behavior: "instant" });
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollY, behavior: "instant" });
        });
      }
    }
  }, []);

  // Continuously record scroll position on the products page
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (typeof window !== "undefined" && window.scrollY > 0) {
          sessionStorage.setItem("buraq_product_scroll_y", String(window.scrollY));
        }
      }, 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Sync if query param changes
  useEffect(() => {
    if (paramSector && ["all", "lighting", "solar", "electrical"].includes(paramSector)) {
      setSelectedCategory(paramSector as CategoryId);
    } else {
      setSelectedCategory("all");
    }
  }, [paramSector]);

  // Sector Counts
  const counts = useMemo(() => {
    return {
      all: PRODUCTS_CATALOGUE.length,
      lighting: PRODUCTS_CATALOGUE.filter((p) => p.category === "lighting").length,
      solar: PRODUCTS_CATALOGUE.filter((p) => p.category === "solar").length,
      electrical: PRODUCTS_CATALOGUE.filter((p) => p.category === "electrical").length,
    };
  }, []);

  const sectorOptions = [
    {
      id: "all" as const,
      label: "All Products",
      desc: "Complete catalog across lighting, solar & electrical",
      icon: Layers,
      count: counts.all,
    },
    {
      id: "lighting" as const,
      label: "Lighting Products",
      desc: "LED panels, chandeliers, high bays & downlights",
      icon: Lightbulb,
      count: counts.lighting,
      color: "text-amber-500",
      bgLight: "bg-amber-500/10",
    },
    {
      id: "solar" as const,
      label: "Solar Components",
      desc: "PV modules, inverters, 1.5kV DC cables & mounting",
      icon: Sun,
      count: counts.solar,
      color: "text-orange-500",
      bgLight: "bg-orange-500/10",
    },
    {
      id: "electrical" as const,
      label: "Electrical Products",
      desc: "Power cables, industrial switchgear, MCBs & boards",
      icon: Zap,
      count: counts.electrical,
      color: "text-emerald-600",
      bgLight: "bg-emerald-500/10",
    },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS_CATALOGUE.filter((item) => {
      // 1. Sector match
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.shortDesc.toLowerCase().includes(q);
        const matchesCategory = item.categoryName.toLowerCase().includes(q);
        const matchesSpecs = item.specifications?.some((s) =>
          s.toLowerCase().includes(q)
        );
        const matchesBrand = item.brand?.toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesDesc &&
          !matchesCategory &&
          !matchesSpecs &&
          !matchesBrand
        ) {
          return false;
        }
      }

      // 3. Price range match
      if (priceRange === "under-1500" && item.price >= 1500) return false;
      if (
        priceRange === "1500-5000" &&
        (item.price < 1500 || item.price > 5000)
      )
        return false;
      if (priceRange === "above-5000" && item.price <= 5000) return false;

      // 4. Rating match
      if (minRating > 0 && item.rating < minRating) return false;

      // 5. In-stock match
      if (inStockOnly && !item.inStock) return false;

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return b.discountPercent - a.discountPercent;
      // "featured" default: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });

    return result;
  }, [
    selectedCategory,
    searchQuery,
    sortBy,
    priceRange,
    minRating,
    inStockOnly,
  ]);

  const handleSectorChange = (sectorId: CategoryId) => {
    setSelectedCategory(sectorId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (sectorId === "all") {
        url.searchParams.delete("sector");
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("sector", sectorId);
        url.searchParams.delete("category");
      }
      window.history.replaceState(
        {},
        "",
        url.pathname + (url.search ? url.search : "")
      );
    }
  };

  const resetAllFilters = () => {
    handleSectorChange("all");
    setSearchQuery("");
    setSortBy("featured");
    setPriceRange("all");
    setMinRating(0);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchQuery !== "" ||
    priceRange !== "all" ||
    minRating > 0 ||
    inStockOnly;

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Mobile & Tablet Sector Quick Bar (< 1024px) */}
      <div className="lg:hidden flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
        <div className="flex items-center gap-1.5 flex-nowrap min-w-max">
          {sectorOptions.map((sector) => {
            const Icon = sector.icon;
            const isActive = selectedCategory === sector.id;
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => handleSectorChange(sector.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-buraq-primary text-white shadow-xs"
                    : "bg-white text-buraq-dark/80 hover:bg-buraq-sage/30 border border-neutral-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sector.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {sector.count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className={`flex-shrink-0 p-2 rounded-xl border font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer ${
            mobileFilterOpen
              ? "bg-buraq-primary text-white border-buraq-primary"
              : "bg-white border-neutral-200 text-buraq-dark hover:border-buraq-primary"
          }`}
          aria-label="Toggle filters"
        >
          <Filter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Mobile Collapsible Filters Panel (when toggled on mobile) */}
      {mobileFilterOpen && (
        <div className="lg:hidden p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs font-bold uppercase tracking-wider text-buraq-dark">
              Filters &amp; Refine
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="text-xs text-neutral-500 font-bold hover:text-buraq-dark"
            >
              ✕ Close
            </button>
          </div>
          {/* Price Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-buraq-dark">Price Range</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: "all" as const, label: "All Prices" },
                { id: "under-1500" as const, label: "Under ₹1,500" },
                { id: "1500-5000" as const, label: "₹1,500 - ₹5,000" },
                { id: "above-5000" as const, label: "Above ₹5,000" },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setPriceRange(tier.id)}
                  className={`p-2 rounded-lg text-xs font-semibold text-center border transition-colors ${
                    priceRange === tier.id
                      ? "bg-buraq-primary text-white border-buraq-primary font-bold"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>
          {/* Rating */}
          <div className="space-y-1.5 pt-2 border-t border-neutral-100">
            <label className="text-xs font-bold text-buraq-dark">Customer Rating</label>
            <div className="flex items-center gap-1.5">
              {[0, 4.0, 4.5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setMinRating(rate)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors ${
                    minRating === rate
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200"
                  }`}
                >
                  {rate === 0 ? "All" : `${rate}★ & up`}
                </button>
              ))}
            </div>
          </div>
          {/* In stock toggle */}
          <div className="pt-2 border-t border-neutral-100">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-buraq-dark">In-Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-buraq-primary accent-buraq-primary"
              />
            </label>
          </div>
        </div>
      )}

      {/* Main E-Commerce 2-Column Grid: Left (Products & Sorting), Right (Sector Selector & Filters) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
        {/* LEFT COLUMN: Search Bar, Sorting, and Products Grid (70% - 75% width on desktop) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-3.5">
          {/* Micro Breadcrumb + Sleek Inline Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400">
                <Link href="/" className="hover:text-buraq-primary transition-colors">Home</Link>
                <span>/</span>
                <span className="text-buraq-primary font-bold">Products</span>
                {selectedCategory !== "all" && (
                  <>
                    <span>/</span>
                    <span className="text-buraq-dark font-bold">
                      {sectorOptions.find((s) => s.id === selectedCategory)?.label}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <h1 className="text-lg sm:text-2xl font-black text-buraq-dark tracking-tight">
                  {selectedCategory === "all" ? "All Products" : sectorOptions.find((s) => s.id === selectedCategory)?.label}
                </h1>
                <span className="text-[11px] font-bold text-neutral-600 bg-white px-2 py-0.5 rounded-full border border-neutral-200 shadow-2xs">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
                </span>
                <span className="text-[11px] text-neutral-500 font-medium hidden md:inline">
                  &bull; Lighting, Solar &amp; Electrical Supplies
                </span>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:underline cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Compact Integrated Toolbar (Search + Sort) */}
          <div className="bg-white rounded-xl px-3 py-2 border border-neutral-200/90 shadow-2xs flex items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-neutral-200 bg-neutral-50/60 focus:bg-white focus:outline-none focus:border-buraq-primary transition-all placeholder:text-neutral-400 font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-neutral-400 hover:text-buraq-dark"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-buraq-dark flex-shrink-0">
              <ArrowUpDown className="w-3 h-3 text-buraq-primary" />
              <span className="hidden sm:inline text-neutral-500 font-medium text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-bold text-buraq-dark focus:outline-none focus:border-buraq-primary cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>

          {/* E-Commerce Product Cards Grid ("Small Boxes") */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 rounded-3xl bg-white border border-neutral-200 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-buraq-dark">
                  No products found in this section
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                  We couldn&apos;t find any items matching your current filters in{" "}
                  <strong>
                    {sectorOptions.find((s) => s.id === selectedCategory)?.label}
                  </strong>
                  . Try clearing your search keyword or switching sectors.
                </p>
              </div>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-buraq-primary text-white text-xs font-bold hover:bg-buraq-dark transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show All Products</span>
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sector Selection Panel & E-Commerce Filters (Sticky & Independently Scrollable) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-20 max-h-[calc(100vh-95px)] overflow-y-auto overscroll-contain pr-1.5 pb-6 buraq-sidebar-scroll">
          {/* Main Sector Selector Widget */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-buraq-primary/10 flex items-center justify-center text-buraq-primary">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-buraq-dark tracking-tight">
                    Select Sector
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Filter by product division
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                3 Sectors
              </span>
            </div>

            {/* Sector Selector List */}
            <div className="space-y-2">
              {sectorOptions.map((sector) => {
                const Icon = sector.icon;
                const isActive = selectedCategory === sector.id;

                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => {
                      handleSectorChange(sector.id);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? "bg-buraq-primary/8 border-buraq-primary shadow-xs ring-1 ring-buraq-primary/20"
                        : "bg-[#FAFAF7] hover:bg-white border-neutral-200/80 hover:border-buraq-primary/40"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          isActive
                            ? "bg-buraq-primary text-white shadow-xs"
                            : "bg-white text-buraq-dark/70 border border-neutral-200 group-hover:text-buraq-primary"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold truncate ${
                              isActive ? "text-buraq-primary font-black" : "text-buraq-dark"
                            }`}
                          >
                            {sector.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-1 leading-snug mt-0.5">
                          {sector.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-buraq-primary text-white"
                            : "bg-neutral-200/80 text-neutral-700"
                        }`}
                      >
                        {sector.count}
                      </span>
                      {isActive ? (
                        <Check className="w-4 h-4 text-buraq-primary" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auxiliary E-Commerce Filters (Price, Ratings, Stock) */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-buraq-dark">
                Refine Selection
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-[11px] font-bold text-buraq-primary hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-buraq-dark">
                Price Range
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: "all" as const, label: "All Prices" },
                  { id: "under-1500" as const, label: "Under ₹1,500" },
                  { id: "1500-5000" as const, label: "₹1,500 to ₹5,000" },
                  { id: "above-5000" as const, label: "Above ₹5,000" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setPriceRange(tier.id)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                      priceRange === tier.id
                        ? "bg-buraq-primary/10 text-buraq-primary font-bold"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <span>{tier.label}</span>
                    {priceRange === tier.id && <Check className="w-3.5 h-3.5 text-buraq-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <label className="block text-xs font-bold text-buraq-dark">
                Customer Rating
              </label>
              <div className="flex items-center gap-2">
                {[0, 4.0, 4.5].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setMinRating(rate)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                      minRating === rate
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    {rate === 0 ? (
                      "All"
                    ) : (
                      <>
                        <span>{rate}★</span>
                        <span className="text-[10px] font-normal">&amp; up</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Only Toggle */}
            <div className="pt-2 border-t border-neutral-100">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-buraq-dark">
                  In-Stock Items Only
                </span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-buraq-primary focus:ring-buraq-primary cursor-pointer accent-buraq-primary"
                />
              </label>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
