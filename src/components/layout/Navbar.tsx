"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";
import { Menu, X, ChevronDown, ArrowRight, Mail, Bot } from "lucide-react";
import { openBuraqChatbot } from "@/lib/chatbot-utils";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

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
                            href={sub.href}
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
                  href={link.href}
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

          {/* Right Action Button (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openBuraqChatbot()}
              className="relative flex items-center justify-center p-0 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer -my-2"
              title="Ask BURAQ"
              aria-label="Ask BURAQ"
            >
              <Image
                src="/images/ai-bot.webp"
                alt="Ask BURAQ AI Assistant"
                width={70}
                height={70}
                unoptimized
                className="w-16 h-16 sm:w-[70px] sm:h-[70px] object-contain drop-shadow-sm"
              />
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-buraq-primary hover:bg-buraq-dark shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4 text-buraq-sage" />
              <span>Contact Us</span>
            </Link>
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
                width={56}
                height={56}
                unoptimized
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-sm"
              />
            </button>

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
                            href={sub.href}
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
                    href={link.href}
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
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-buraq-primary hover:bg-buraq-dark shadow-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-buraq-sage" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
