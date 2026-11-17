"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allCategories = [
    { label: "LIGHTING", href: "/category/lighting" },
    { label: "WIRE", href: "/category/wire" },
    { label: "FAN", href: "/category/fan" },
    { label: "MCB", href: "/category/mcb" },
    { label: "SWITCH", href: "/category/switch" },
    { label: "ACCESSORIES", href: "/category/accessories" },
    { label: "WALL LAMP", href: "/category/wall-lamp" },
    { label: "HANGING LAMP", href: "/category/hanging-lamp" },
    { label: "CEILING LIGHT", href: "/category/ceiling-light" },
    { label: "OTHERS", href: "/category/others" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDEB] border-b border-[#E2DED5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Official BURAQ Logo from Landing */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/images/buraq-logo.png"
            alt="BURAQ ENTERPRISE"
            width={240}
            height={70}
            className="h-12 sm:h-14 md:h-15 w-auto object-contain"
            priority
          />
          <span className="text-[#07543F] text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#E7F1EB] border border-[#07543F]/20">
            Store
          </span>
        </Link>

        {/* Right Action Icons: Cart, Auth & Shop */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-white border border-[#E2DED5] text-[#10201F] cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#D96B1F] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Sign In / Profile */}
          {user ? (
            <Link
              href="/account"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-[#10201F] text-xs font-bold"
            >
              <div className="w-5 h-5 rounded-full bg-[#07543F] text-[#FFFDEB] flex items-center justify-center text-[10px] font-bold">
                {user.name.slice(0, 1).toUpperCase()}
              </div>
              <span className="hidden sm:inline-block max-w-[90px] truncate">{user.name}</span>
            </Link>
          ) : (
            <Link
              href="/signin"
              className="hidden sm:flex items-center px-3.5 py-2 rounded-xl bg-white border border-[#E2DED5] text-[#10201F] text-xs font-bold cursor-pointer"
            >
              <span>Sign In</span>
            </Link>
          )}

          {/* Primary Shop / Catalog Button */}
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-black uppercase tracking-wider shadow-xs"
          >
            All Products
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-xl bg-white border border-[#E2DED5] text-[#10201F] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-[#E2DED5] px-4 py-4 space-y-3">
          <div className="text-[11px] font-black uppercase text-[#07543F] tracking-wider">
            Shop by Category
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {allCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2.5 py-2 rounded-lg text-xs font-bold text-[#10201F] bg-[#FAF8E4] border border-[#E2DED5]"
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
                className="text-xs text-rose-600 font-bold"
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
