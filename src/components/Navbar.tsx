"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Zap, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Lighting", href: "/category/lighting" },
    { label: "Electrical", href: "/category/electrical" },
    { label: "Solar Energy", href: "/category/solar" },
    { label: "All Products", href: "/products" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDEB]/95 backdrop-blur-md border-b border-[#E2DED5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-[#07543F] flex items-center justify-center text-[#FFFDEB] shadow-md group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 fill-[#FFFDEB]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider text-[#10201F] flex items-center gap-1.5">
              BURAQ <span className="text-[#07543F] text-xs font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-[#07543F]/10 border border-[#07543F]/30">Store</span>
            </span>
            <p className="text-[10px] text-[#10201F]/60 tracking-wider font-medium uppercase">
              Lights • Electricals • Solar
            </p>
          </div>
        </Link>

        {/* Center Pill Nav Menu */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#FFFFFF] border border-[#E2DED5]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-[#07543F] text-[#FFFDEB] font-bold shadow-sm"
                    : "text-[#10201F] hover:text-[#10201F] hover:bg-[#F2F7F4]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Cart, Auth & Shop */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F2F7F4] border border-[#E2DED5] text-[#10201F] hover:text-[#07543F] transition-all cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#07543F] text-[#FFFDEB] text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Sign In / Profile */}
          {user ? (
            <Link
              href="/account"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F2F7F4] border border-[#E2DED5] text-[#10201F] text-xs font-bold transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-[#07543F] text-[#FFFDEB] flex items-center justify-center text-[10px] font-bold">
                {user.name.slice(0, 1).toUpperCase()}
              </div>
              <span className="hidden sm:inline-block max-w-[90px] truncate">{user.name}</span>
            </Link>
          ) : (
            <Link
              href="/signin"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F2F7F4] border border-[#E2DED5] text-[#10201F] hover:text-[#10201F] text-xs font-bold transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Primary Shop Button */}
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-[#FFFDEB] text-xs font-black uppercase tracking-wider transition-all shadow-md"
          >
            Shop Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#FFFFFF] border border-[#E2DED5] text-[#10201F] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E2DED5] px-4 py-4 space-y-2 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#10201F] hover:text-[#07543F] hover:bg-[#F2F7F4]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E2DED5] flex items-center justify-between gap-3">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 font-bold"
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
              Catalog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
