"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Search,
  LayoutGrid,
  Lightbulb,
  Cable,
  Fan,
  Zap,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useFilter } from "@/context/FilterContext";
import { useCategories } from "@/lib/useCategories";
import { UserAvatar } from "./UserAvatar";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout, isLoading: authLoading } = useAuth();
  const { searchTerm, setSearchTerm, sortOption, setSortOption } = useFilter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreCatOpen, setMoreCatOpen] = useState(false);

  // Categories come live from the BURAQ backend (admin-managed)
  const categories = useCategories();
  const iconFor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("light") || n.includes("lamp")) return Lightbulb;
    if (n.includes("wire") || n.includes("cable")) return Cable;
    if (n.includes("fan")) return Fan;
    if (n.includes("solar") || n.includes("electric") || n.includes("switch") || n.includes("mcb")) return Zap;
    return Package;
  };

  // Real categories only (cached in the browser, so they show instantly after the first visit).
  // No hard-coded fallback list — that caused items to swap/jump on refresh.
  const activeCategories = categories;
  const primaryCategories = activeCategories.slice(0, 5);
  const overflowCategories = activeCategories.slice(5);

  const allCategories = activeCategories.map((c) => ({
    label: c.name.toUpperCase(),
    href: `/category/${c.id}`,
    name: c.name,
  }));

  const navLinks = [
    { label: "ALL", href: "/products", icon: LayoutGrid },
    ...primaryCategories.map((c) => ({
      label: c.name.toUpperCase(),
      href: `/category/${c.id}`,
      icon: iconFor(c.name),
    })),
  ];

  const isOverflowActive = overflowCategories.some(
    (c) => pathname === `/category/${c.id}` || pathname.startsWith(`/category/${c.id}`)
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-white/70 to-[#FFFDEB]/40 backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_32px_-12px_rgba(16,32,31,0.18)]">
      {/* Announcement bar */}
      <div className="bg-[#07543F] text-[#FFFDEB] text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-center sm:justify-between tracking-wide">
          <span className="font-semibold">Free delivery on all orders</span>
          <span className="hidden sm:inline text-[#FFFDEB]/80 font-medium">Genuine Brands | GST Invoice | Fast Dispatch</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/buraq-logo.png"
            alt="BURAQ ENTERPRISE"
            width={240}
            height={70}
            className="h-10 sm:h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Search & Sort in Navbar */}
        <div className="flex-1 max-w-sm xl:max-w-md hidden md:flex items-center h-10 rounded-2xl bg-white border border-[#E2DED5] shadow-xs transition-none">
          {/* Search Input */}
          <div className="relative flex-1 h-full flex items-center">
            <Search className="w-4 h-4 text-[#07543F] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search lights, wires, fans..."
              className="w-full h-full pl-9 pr-8 bg-transparent text-xs text-[#10201F] placeholder:text-[#667085] focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-2 w-5 h-5 rounded-full text-[#667085] hover:bg-[#10201F]/5 hover:text-[#10201F] flex items-center justify-center cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <span className="w-px h-5 bg-[#E2DED5]" />

          {/* Sort Dropdown */}
          <div className="relative shrink-0 h-full flex items-center">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              aria-label="Sort products"
              className="appearance-none h-full pl-3 pr-7 bg-transparent text-xs font-medium text-[#10201F] focus:outline-none cursor-pointer rounded-r-2xl"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 w-3.5 h-3.5 text-[#667085]" />
          </div>
        </div>

        {/* Desktop nav links - compact category pills */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* First-ever visit only: quiet placeholders while categories load */}
          {!categories.loaded &&
            [56, 64, 52, 60].map((w, i) => (
              <span key={i} className="h-7 rounded-full bg-[#10201F]/5 animate-pulse" style={{ width: w }} />
            ))}
          {categories.loaded && navLinks.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href === "/products" && pathname === "/") ||
              (l.href.startsWith("/category/") && pathname.startsWith(l.href));
            const IconComponent = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full transition-all flex items-center gap-1 shrink-0 ${
                  isActive
                    ? "bg-[#07543F] text-[#FFFDEB] shadow-sm ring-1 ring-[#07543F]"
                    : "text-[#10201F]/75 hover:text-[#07543F] hover:bg-black/5"
                }`}
              >
                {isActive && <IconComponent className="w-3 h-3 stroke-[2.5]" />}
                <span>{l.label}</span>
              </Link>
            );
          })}

          {/* Overflow "MORE" category dropdown */}
          {overflowCategories.length > 0 && (
            <div
              className="relative group"
              onMouseEnter={() => setMoreCatOpen(true)}
              onMouseLeave={() => setMoreCatOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreCatOpen((o) => !o)}
                className={`text-[11px] font-bold tracking-wider uppercase px-2 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                  isOverflowActive
                    ? "bg-[#07543F] text-[#FFFDEB] shadow-sm ring-1 ring-[#07543F]"
                    : "text-[#10201F]/75 hover:text-[#07543F] hover:bg-black/5"
                }`}
              >
                <span>MORE</span>
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div
                className={`absolute right-0 top-full pt-1.5 w-44 z-50 transition-all duration-150 ${
                  moreCatOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
                }`}
              >
                <div className="rounded-xl bg-white border border-[#E2DED5] shadow-lg overflow-hidden py-1">
                  {overflowCategories.map((c) => {
                    const isCatActive = pathname === `/category/${c.id}`;
                    return (
                      <Link
                        key={c.id}
                        href={`/category/${c.id}`}
                        onClick={() => setMoreCatOpen(false)}
                        className={`flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                          isCatActive
                            ? "bg-[#FAF8E4] text-[#07543F] font-bold"
                            : "text-[#10201F] hover:bg-[#FAF8E4] hover:text-[#07543F]"
                        }`}
                      >
                        <span>{c.name}</span>
                        {isCatActive && <span className="w-1.5 h-1.5 rounded-full bg-[#07543F]" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {authLoading && !user ? (
            // Still checking the saved login — don't flash "Sign in"
            <span className="hidden sm:block w-24 h-9 rounded-full bg-[#10201F]/5 animate-pulse" />
          ) : user ? (
            <div
              className="relative hidden sm:block group"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-1.5 h-9 pl-1 pr-2.5 rounded-full hover:bg-[#F2F7F4] cursor-pointer"
              >
                <UserAvatar name={user.name} src={user.avatarUrl} className="w-7 h-7 text-xs" />
                <span className="text-xs font-medium text-[#10201F] max-w-[90px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#667085] transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu - Opens on Hover & Click */}
              <div
                className={`absolute right-0 pt-1 w-56 z-50 transition-all duration-150 ${
                  userMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
                }`}
              >
                <div className="rounded-2xl bg-white border border-[#E2DED5] shadow-xl overflow-hidden py-1.5">
                  <div className="px-4 py-2 bg-[#FAF8E4]/60 border-b border-[#E2DED5]">
                    <p className="text-[10px] font-black uppercase text-[#07543F] tracking-wider">Welcome</p>
                    <p className="text-xs font-bold text-[#10201F] truncate mt-0.5">{user.name}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-[#10201F] hover:bg-[#FAF8E4] hover:text-[#07543F] transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-[#07543F]" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-[#10201F] hover:bg-[#FAF8E4] hover:text-[#07543F] transition-colors"
                    >
                      <Package className="w-3.5 h-3.5 text-[#07543F]" />
                      <span>My Orders</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-[#E2DED5]">
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#D96B1F] hover:bg-[#FDEEE5] transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/signin"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-[#E2DED5] bg-white text-xs font-medium text-[#10201F] hover:border-[#07543F]"
            >
              <User className="w-3.5 h-3.5" /> Sign in
            </Link>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative h-9 px-3 rounded-full bg-[#07543F] hover:bg-[#053E2E] text-white flex items-center gap-1.5 cursor-pointer transition-colors text-xs font-medium"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="min-w-[18px] h-4 px-1 bg-[#D96B1F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#10201F] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2DED5] px-4 py-4 space-y-3">
          <div className="text-[11px] font-black uppercase text-[#07543F] tracking-wider">
            Shop by Category
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {allCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#10201F] bg-[#FAF8E4] border border-[#E2DED5]"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E2DED5] flex items-center justify-between gap-3">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#D96B1F] font-bold"
              >
                Sign Out ({user.name})
              </button>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#10201F] font-bold"
              >
                Sign In / Register
              </Link>
            )}
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-[#07543F] text-[#FFFDEB] text-xs font-bold"
            >
              Full Catalog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
