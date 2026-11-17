"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

  const navLinks = [
    { label: "Shop All", href: "/products" },
    { label: "Lighting", href: "/category/lighting" },
    { label: "Wires", href: "/category/wire" },
    { label: "Fans", href: "/category/fan" },
    { label: "Switches", href: "/category/switch" },
    { label: "MCB", href: "/category/mcb" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-white/70 to-[#FFFDEB]/40 backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_32px_-12px_rgba(16,32,31,0.18)]">
      {/* Announcement bar */}
      <div className="bg-[#07543F] text-[#FFFDEB] text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-center sm:justify-between tracking-wide">
          <span className="font-semibold">BURAQ ENTERPRISE — Premium Electricals & Lighting Supplies</span>
          <span className="hidden sm:inline text-[#FFFDEB]/80 font-medium">Wholesale Pricing · 100% Verified Quality · Fast Dispatch</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
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

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#10201F]/80 hover:text-[#07543F] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 h-10 pl-1 pr-3 rounded-full hover:bg-[#F2F7F4] cursor-pointer"
              >
                <span className="w-8 h-8 rounded-full bg-[#07543F] text-white flex items-center justify-center text-sm font-semibold">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-[#10201F] max-w-[110px] truncate">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-[#667085]" />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 z-50 rounded-xl bg-white border border-[#E2DED5] shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-[#EFECE3]">
                      <p className="text-sm font-semibold text-[#10201F] truncate">{user.name}</p>
                      <p className="text-xs text-[#667085] truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#10201F] hover:bg-[#F7F4EE] cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[#E2DED5] bg-white text-sm font-medium text-[#10201F] hover:border-[#07543F]"
            >
              <User className="w-4 h-4" /> Sign in
            </Link>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative h-10 px-3 sm:px-4 rounded-full bg-[#07543F] hover:bg-[#053E2E] text-white flex items-center gap-2 cursor-pointer transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
            {totalItems > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 bg-[#D96B1F] text-white text-[11px] font-bold rounded-full flex items-center justify-center">
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
