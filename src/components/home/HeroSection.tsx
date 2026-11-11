"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lightbulb, Sun, Zap, Users, ArrowRight, Layers } from "lucide-react";
import { SmoothLoopVideo } from "./SmoothLoopVideo";

const HERO_HEADLINES = [
  {
    line1: "Lighting Solutions.",
    line2: "Solar Components.",
    line3: "Electrical Products.",
  },
  {
    line1: "LED Luminaires.",
    line2: "Photovoltaic Panels.",
    line3: "Power Switchgear.",
  },
  {
    line1: "Quality Products.",
    line2: "Project Supply.",
    line3: "Reliable Execution.",
  },
];

const LADY_BOTTOM_FADE: React.CSSProperties = {
  maskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
};

// Full-width horizontal alpha mask: clear text headroom on left (0%-16%), richer clarity in the center (35%-60%)
const HERO_MASK_X: React.CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent 0%, transparent 16%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0.42) 42%, rgba(0,0,0,0.78) 62%, black 82%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, transparent 16%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0.42) 42%, rgba(0,0,0,0.78) 62%, black 82%)",
};

// Vertical alpha mask: smooth top/bottom edge fade with boosted center prominence
const HERO_MASK_Y: React.CSSProperties = {
  maskImage:
    "linear-gradient(to bottom, transparent 0%, transparent 6%, rgba(0,0,0,0.12) 16%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.85) 45%, black 60%, rgba(0,0,0,0.8) 78%, rgba(0,0,0,0.2) 92%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, transparent 6%, rgba(0,0,0,0.12) 16%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.85) 45%, black 60%, rgba(0,0,0,0.8) 78%, rgba(0,0,0,0.2) 92%, transparent 100%)",
};

// Rotating Headline with pure CSS transition and CSS Grid stacking
const RotatingHeroHeadline: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_HEADLINES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Semantic Primary H1 for Search Engines & Crawlers */}
      <h1 className="sr-only">
        BURAQ Enterprise | Commercial Lighting Solutions, Solar Components &amp; Industrial Electrical Suppliers in Kolkata
      </h1>

      {/* Visual Animated Rotating Headline */}
      <div
        className="text-[28px] sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-black tracking-tight leading-[1.14]"
        aria-hidden="true"
      >
        <span className="grid grid-cols-1 grid-rows-1 relative">
          {HERO_HEADLINES.map((headline, idx) => {
            const isCurrent = currentIndex === idx;
            return (
              <span
                key={idx}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${
                  isCurrent
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-3 pointer-events-none"
                }`}
              >
                <span className="font-black text-buraq-dark block">
                  {headline.line1}
                </span>
                <span className="font-black text-buraq-primary block">
                  {headline.line2}
                </span>
                <span className="font-black text-buraq-accent block">
                  {headline.line3}
                </span>
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12 lg:pb-14 bg-gradient-to-b from-[#FFFDEB] via-[#FCFCEF] to-[#F2F7F4]">
      {/* Background Layer: Full-Width Zero-Seam Cross-fading Video Loop */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={HERO_MASK_X}
      >
        <div className="w-full h-full" style={HERO_MASK_Y}>
          <SmoothLoopVideo src="/videos/hero-bg.mp4" fadeDuration={1.0} maxOpacity="opacity-80" />
        </div>
      </div>

      {/* Ambient Greenish Aurora Glows (Top & Bottom Bridge) */}
      <div className="absolute top-12 left-12 w-[480px] h-[320px] bg-gradient-to-tr from-buraq-primary/10 via-[#25A170]/08 to-transparent rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[720px] h-[220px] bg-gradient-to-r from-buraq-primary/8 via-emerald-300/15 to-buraq-accent/8 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Seamless bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#F2F7F4] pointer-events-none z-[1]" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[380px]">
          {/* Left Column: 2/3 Width (8 cols) — Typography, CTAs & 3-Pillar Bar */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-4 lg:space-y-4 z-20 pt-2 sm:pt-4 lg:pt-2 mt-0">
            {/* Top Accent Line — Same position & size as /about */}
            <div className="w-12 h-1 bg-buraq-primary rounded-full mb-1" />

            {/* Rotating Hero Headline (Semantic H1) */}
            <RotatingHeroHeadline />

            {/* Factual Supporting Subtitle with Local & B2B Keywords */}
            <p className="text-[15px] sm:text-[17px] text-buraq-dark/90 font-medium leading-relaxed max-w-2xl">
              BURAQ Enterprise is a B2B supplier of commercial LED lighting fixtures, solar PV modules &amp; string inverters, and industrial electrical cables &amp; switchgear in Kolkata and across West Bengal. Sourcing for contractors, facilities, and project BOQs on an offline quotation basis.
            </p>

            {/* Action Buttons: Explore Products */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-buraq-primary text-white font-bold text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(8,84,62,0.4)] hover:bg-buraq-dark hover:shadow-[0_15px_30px_-5px_rgba(16,32,31,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-buraq-sage" />
                <span>Explore Products</span>
              </Link>
            </div>

            {/* Desktop 3 Product Pillars Bar (Triad according to Rule of Thirds) */}
            <div className="hidden lg:grid pt-6 grid-cols-3 gap-3.5 items-stretch max-w-2xl">
              {/* Pillar 1: Lighting Products */}
              <Link
                href="/products?sector=lighting"
                className="liquid-glass-btn flex items-center gap-3 p-3.5 group"
              >
                <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[12.5px] font-bold text-buraq-dark group-hover:text-buraq-primary leading-tight transition-colors">
                  Lighting <br />
                  Products
                </span>
              </Link>

              {/* Pillar 2: Solar Components */}
              <Link
                href="/products?sector=solar"
                className="liquid-glass-btn flex items-center gap-3 p-3.5 group"
              >
                <Sun className="w-6 h-6 text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[12.5px] font-bold text-buraq-dark group-hover:text-buraq-primary leading-tight transition-colors">
                  Solar <br />
                  Components
                </span>
              </Link>

              {/* Pillar 3: Electrical Products */}
              <Link
                href="/products?sector=electrical"
                className="liquid-glass-btn flex items-center gap-3 p-3.5 group"
              >
                <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[12.5px] font-bold text-buraq-dark group-hover:text-buraq-primary leading-tight transition-colors">
                  Electrical <br />
                  Products
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: 1/3 Width (4 cols) — Foreground Executive Visual */}
          <div className="hidden lg:flex lg:col-span-4 relative justify-center items-end h-[380px] xl:h-[420px] 2xl:h-[480px] mt-2 z-10 overflow-visible">
            <div
              className="relative w-full max-w-[360px] xl:max-w-[400px] 2xl:max-w-[440px] h-full flex items-end justify-center translate-y-0 scale-100 z-10"
              style={LADY_BOTTOM_FADE}
            >
              <Image
                src="/images/hero-lady.png"
                alt="BURAQ Product & Technical Operations Specialist"
                width={520}
                height={600}
                priority
                sizes="(max-width: 1024px) 0vw, 440px"
                className="w-full h-full object-contain object-bottom lg:object-left-bottom drop-shadow-[0_20px_40px_rgba(16,32,31,0.18)]"
              />
            </div>
          </div>
        </div>

        {/* Mobile & Tablet 3 Product Pillars Triad */}
        <div className="lg:hidden mt-6 pt-4 border-t border-buraq-border/60 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          <Link
            href="/products?sector=lighting"
            className="liquid-glass-btn flex items-center justify-between p-3.5 group"
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span className="text-[12.5px] font-bold text-buraq-dark group-hover:text-buraq-primary transition-colors">
                Lighting Products
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-buraq-muted group-hover:text-buraq-primary group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/products?sector=solar"
            className="liquid-glass-btn flex items-center justify-between p-3.5 group"
          >
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-[12.5px] font-bold text-buraq-dark group-hover:text-buraq-primary transition-colors">
                Solar Components
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-buraq-muted group-hover:text-buraq-primary group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/products?sector=electrical"
            className="liquid-glass-btn flex items-center justify-between p-3.5 group"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-[12.5px] font-bold text-buraq-dark group-hover:text-buraq-primary transition-colors">
                Electrical Products
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-buraq-muted group-hover:text-buraq-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
};
