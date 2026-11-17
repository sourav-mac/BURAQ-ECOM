"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
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
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/buraq-logo.png"
            alt="BURAQ ENTERPRISE"
            width={240}
            height={70}
            className="h-12 sm:h-14 md:h-15 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right Action Area: Sign In & Proper Cart Icon (No boxy bg) */}
        <div className="flex items-center gap-5">
          {/* User Sign In / Profile */}
          {user ? (
            <Link
              href="/account"
              className="flex items-center gap-2 text-xs font-bold text-[#10201F]"
            >
              <div className="w-7 h-7 rounded-full bg-[#07543F] text-[#FFFDEB] flex items-center justify-center text-xs font-bold">
                {user.name.slice(0, 1).toUpperCase()}
              </div>
              <span className="hidden sm:inline-block max-w-[100px] truncate">{user.name}</span>
            </Link>
          ) : (
            <Link
              href="/signin"
              className="hidden sm:inline-flex text-xs font-bold tracking-wider uppercase text-[#10201F] px-1 py-1 cursor-pointer"
            >
              Sign In
            </Link>
          )}

          {/* Proper Shopping Cart Icon without bulky bg box */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 text-[#10201F] cursor-pointer flex items-center justify-center"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-6 h-6 stroke-[1.8]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#D96B1F] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1.5 text-[#10201F] cursor-pointer"
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
