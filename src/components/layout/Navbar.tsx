"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";
import { Menu, X, ChevronDown, ArrowRight, Mail, Bot, User, LogOut, Package, Heart } from "lucide-react";
import { openBuraqChatbot } from "@/lib/chatbot-utils";
import { useAuth } from "@/lib/auth-context";

export const Navbar: React.FC = () => {
  const { user, isLoggedIn, openAuthModal, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = React.useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  const getNavHref = (href: string) => {
    if (href.startsWith("/products") && !isLoggedIn) {
      return `/login?redirect=${encodeURIComponent(href)}&from=${encodeURIComponent(href)}`;
    }
    return href;
  };

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setIsAtTop(true);
        setVisible(true);
      } else {
        setIsAtTop(false);
        // If scrolling down, hide; if scrolling up, show
        if (currentScrollY > lastScrollY && currentScrollY > 80 && !isOpen) {
          setVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
  }, [pathname]);

  // Hide navbar on auth pages so the auth box appears alone on a single screen
  if (pathname === "/login" || pathname === "/auth") {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        visible || isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        isOpen
          ? "bg-[#FFFDEB] shadow-md border-b border-buraq-border"
          : isAtTop
          ? "bg-transparent border-0 shadow-none"
          : "bg-[#FFFDEB]/95 backdrop-blur-md shadow-sm border-b border-buraq-border/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex items-center justify-between min-h-[52px]">
          {/* Logo (Left) */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/buraq-logo.png"
                alt="BURAQ ENTERPRISE Logo"
                width={280}
                height={90}
                className="h-14 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain transition-transform hover:scale-102"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation (Center/Spacious) */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 flex-nowrap">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.children) {
                return (
                  <div
                    key={link.label}
                    className="relative group/dropdown py-1.5"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesDropdown((prev) => !prev)}
                      aria-expanded={servicesDropdown}
                      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-[15px] tracking-tight whitespace-nowrap transition-colors duration-200 group/nav cursor-pointer ${isActive
                          ? "text-buraq-primary font-extrabold"
                          : "text-buraq-dark/80 hover:text-buraq-primary font-bold"
                        }`}
                    >
                      <span className="relative">
                        {link.label}
                        <span
                          className={`absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-buraq-primary rounded-full transition-all duration-300 origin-left ${isActive
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-100"
                            }`}
                        />
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-all duration-200 group-hover/dropdown:rotate-180 ${isActive
                            ? "text-buraq-primary"
                            : "text-buraq-muted group-hover/nav:text-buraq-primary"
                          } ${servicesDropdown ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Services Dropdown - Sleek & Compact with zero deadzone */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-2 z-50 transition-all duration-150 opacity-0 invisible pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:pointer-events-auto">
                      <div className="depth-card rounded-2xl p-2 space-y-0.5 border border-white/90 shadow-[0_20px_40px_-10px_rgba(16,32,31,0.15)] bg-white/95 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']">
                        {link.children.map((sub) => (
                          <Link
                            key={sub.label}
                            href={getNavHref(sub.href)}
                            onClick={() => {
                              setIsOpen(false);
                              setServicesDropdown(false);
                            }}
                            className="flex items-center px-3.5 py-2 rounded-xl text-sm font-bold text-buraq-dark hover:text-buraq-primary hover:bg-buraq-sage/40 transition-all duration-150 whitespace-nowrap"
                          >
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={getNavHref(link.href)}
                  onClick={() => {
                    setIsOpen(false);
                    setServicesDropdown(false);
                  }}
                  className={`relative inline-flex items-center px-3 py-1.5 text-[15px] tracking-tight whitespace-nowrap transition-colors duration-200 group/nav ${isActive
                      ? "text-buraq-primary font-extrabold"
                      : "text-buraq-dark/80 hover:text-buraq-primary font-bold"
                    }`}
                >
                  <span className="relative">
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-buraq-primary rounded-full transition-all duration-300 origin-left ${isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-100"
                        }`}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster (Desktop) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3.5">
            {/* Buraq bot & Contact Us (shifted slightly to the left) */}
            <div className="flex items-center gap-2 lg:gap-2.5">
              <button
                onClick={() => openBuraqChatbot()}
                className="relative flex items-center justify-center p-0 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer -my-2"
                title="Ask BURAQ"
                aria-label="Ask BURAQ"
              >
                <Image
                  src="/images/ai-bot.webp"
                  alt="Ask BURAQ AI Assistant"
                  width={64}
                  height={64}
                  unoptimized
                  className="w-14 h-14 lg:w-16 lg:h-16 object-contain drop-shadow-sm"
                />
              </button>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 lg:gap-2 px-3.5 lg:px-4 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-bold text-white bg-buraq-primary hover:bg-buraq-dark shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-buraq-sage" />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Single Logo for Sign In / Sign Up (To the Right of Contact Us) */}
            {isLoggedIn && user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="relative group flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white hover:bg-neutral-50 border-2 border-buraq-primary/40 hover:border-buraq-primary shadow-2xs hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  title={`Account: ${user.name}`}
                  aria-label="User Account"
                >
                  <div className="w-8 h-8 rounded-full bg-buraq-primary text-white text-xs font-black flex items-center justify-center shadow-2xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white border border-neutral-200/90 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* Heading: "Your Account" as requested */}
                    <div className="px-3 py-2.5 border-b border-neutral-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-buraq-primary block mb-0.5">
                        Your Account
                      </span>
                      <p className="text-xs font-black text-buraq-dark truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {user.email}
                      </p>
                      {user.company && (
                        <p className="text-[10px] font-semibold text-buraq-accent truncate mt-0.5">
                          {user.company}
                        </p>
                      )}
                    </div>

                    {/* Under that: My Profile, Orders, Wishlist */}
                    <div className="py-1.5 space-y-0.5">
                      <Link
                        href="/account?tab=profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-buraq-dark hover:bg-buraq-sage/30 hover:text-buraq-primary transition-colors"
                      >
                        <User className="w-4 h-4 text-buraq-primary" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/account?tab=orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-buraq-dark hover:bg-buraq-sage/30 hover:text-buraq-primary transition-colors"
                      >
                        <Package className="w-4 h-4 text-buraq-primary" />
                        <span>Orders</span>
                      </Link>

                      <Link
                        href="/account?tab=wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-buraq-dark hover:bg-buraq-sage/30 hover:text-buraq-primary transition-colors"
                      >
                        <Heart className="w-4 h-4 text-buraq-primary" />
                        <span>Wishlist</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-neutral-100">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                          router.push("/login?from=/products&redirect=/products");
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative group">
                <Link
                  href="/login"
                  className="relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white hover:bg-buraq-primary text-buraq-primary hover:text-white border-2 border-buraq-primary/30 hover:border-buraq-primary shadow-2xs hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  title="Sign In / Sign Up"
                  aria-label="Sign In / Sign Up"
                >
                  <User className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                </Link>

                {/* Hover Tooltip */}
                <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-buraq-dark text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 shadow-lg z-50">
                  <span>Sign In / Sign Up</span>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-buraq-dark rotate-45" />
                </div>
              </div>
            )}
          </div>

          {/* Right Mobile Actions (Phone Navbar) */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 z-10">
            <button
              onClick={() => openBuraqChatbot()}
              className="relative flex items-center justify-center p-0 hover:scale-110 active:scale-90 transition-transform duration-200 cursor-pointer -my-1"
              title="Ask BURAQ"
              aria-label="Ask BURAQ"
            >
              <Image
                src="/images/ai-bot.webp"
                alt="Ask BURAQ AI Assistant"
                width={50}
                height={50}
                unoptimized
                className="w-11 h-11 sm:w-13 sm:h-13 object-contain drop-shadow-sm"
              />
            </button>

            <Link
              href="/login"
              className="w-9 h-9 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center text-buraq-dark hover:text-buraq-primary shadow-2xs cursor-pointer"
              title={isLoggedIn ? `Signed in as ${user?.name}` : "Sign In / Sign Up"}
              aria-label="Account"
            >
              <User className="w-4 h-4 text-buraq-primary" />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`buraq-nav-toggle ${isOpen ? "is-open" : ""}`}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              <div className="bars bar1" />
              <div className="bars bar2" />
              <div className="bars bar3" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Floating 100% Solid Opaque Overlay) */}
      <div
        className={`absolute top-full left-0 right-0 w-full bg-[#FFFDEB] border-b-2 border-buraq-primary/20 shadow-[0_25px_50px_-12px_rgba(16,32,31,0.25)] grid md:hidden transition-all duration-300 ease-in-out z-50 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 visible"
            : "grid-rows-[0fr] opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="overflow-hidden bg-[#FFFDEB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <React.Fragment key={link.label}>
                      <div className="px-3.5 pt-3 pb-1 text-xs font-black uppercase tracking-wider text-buraq-dark/50">
                        {link.label}
                      </div>
                      {link.children.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.label}
                            href={getNavHref(sub.href)}
                            onClick={() => setIsOpen(false)}
                            className={`block pl-4 pr-3.5 py-2.5 rounded-xl text-[14px] font-bold transition-colors ${
                              isSubActive
                                ? "text-buraq-primary bg-buraq-sage/40 font-extrabold"
                                : "text-buraq-dark hover:bg-buraq-sage/20"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </React.Fragment>
                  );
                }
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={getNavHref(link.href)}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3.5 py-2.5 rounded-xl text-[15px] font-bold transition-colors ${
                      isActive
                        ? "text-buraq-primary bg-buraq-sage/50 font-extrabold"
                        : "text-buraq-dark hover:bg-buraq-sage/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 space-y-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-buraq-primary hover:bg-buraq-dark shadow-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-buraq-sage" />
                  <span>Contact Us</span>
                </Link>

                {isLoggedIn && user ? (
                  <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 space-y-3">
                    <div className="border-b border-neutral-100 pb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-buraq-primary block mb-1">
                        Your Account
                      </span>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-buraq-primary text-white text-xs font-black flex items-center justify-center shadow-2xs">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-buraq-dark truncate">{user.name}</p>
                          <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                      <Link
                        href="/account?tab=profile"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FBFBFA] hover:bg-buraq-sage/30 text-buraq-dark text-[11px] font-bold gap-1 transition-colors"
                      >
                        <User className="w-4 h-4 text-buraq-primary" />
                        <span>Profile</span>
                      </Link>

                      <Link
                        href="/account?tab=orders"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FBFBFA] hover:bg-buraq-sage/30 text-buraq-dark text-[11px] font-bold gap-1 transition-colors"
                      >
                        <Package className="w-4 h-4 text-buraq-primary" />
                        <span>Orders</span>
                      </Link>

                      <Link
                        href="/account?tab=wishlist"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FBFBFA] hover:bg-buraq-sage/30 text-buraq-dark text-[11px] font-bold gap-1 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-buraq-primary" />
                        <span>Wishlist</span>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                        router.push("/login?from=/products&redirect=/products");
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs font-bold text-buraq-dark bg-white border border-neutral-300 shadow-2xs hover:border-buraq-primary cursor-pointer transition-colors"
                  >
                    <User className="w-4 h-4 text-buraq-primary" />
                    <span>Sign In / Sign Up</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
