"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/products-data";

export const ServicesOverview: React.FC = () => {
  return (
    <section id="products" className="pt-6 sm:pt-10 lg:pt-14 pb-12 sm:pb-16 lg:pb-24 bg-gradient-to-b from-[#F2F7F4] via-[#E4EFE8] to-white relative z-10 overflow-hidden">
      {/* Soft Greenish Ambient Aurora Glow */}
      <div className="absolute -top-16 right-1/4 w-[520px] h-[340px] bg-gradient-to-bl from-buraq-primary/10 via-[#25A170]/08 to-emerald-200/15 rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="space-y-3">
            <div className="w-12 h-1 bg-buraq-primary rounded-full" />
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-buraq-dark tracking-tight">
              Product Categories for Commercial &amp; Industrial Projects
            </h2>
            <p className="text-sm sm:text-base text-buraq-muted max-w-xl">
              Specialized B2B supply of commercial LED lighting, solar PV hardware, and industrial electrical cables &amp; switchgear for contractors and facilities across Kolkata and West Bengal.
            </p>
          </div>
        </div>

        {/* 3 Pillars Grid — Clean box-free divided layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-buraq-primary/30">
          {PRODUCT_CATEGORIES.map((cat, idx) => {
            return (
              <div
                key={cat.id}
                className={`flex flex-col ${
                  idx === 0
                    ? "pb-10 md:pb-0 md:pr-8 lg:pr-10"
                    : idx === 1
                    ? "py-10 md:py-0 md:px-8 lg:px-10"
                    : "pt-10 md:pt-0 md:pl-8 lg:pl-10"
                }`}
              >
                {/* Image Cover */}
                <Link
                  href={`/products/${cat.slug}`}
                  className="relative h-48 sm:h-52 2xl:h-64 w-full overflow-hidden rounded-2xl bg-buraq-dark shadow-sm group block"
                >
                  <Image
                    src={cat.image}
                    alt={`${cat.name} supplied by BURAQ Enterprise in Kolkata`}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </Link>

                {/* Content */}
                <div className="pt-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Link href={`/products/${cat.slug}`} className="hover:text-buraq-primary transition-colors">
                        <h3 className="text-xl font-bold text-buraq-dark hover:text-buraq-primary transition-colors">
                          {cat.name}
                        </h3>
                      </Link>
                      <div className="text-[11px] font-semibold text-buraq-accent uppercase tracking-wider mt-0.5">
                        {cat.itemCountLabel}
                      </div>
                    </div>

                    <p className="text-sm text-buraq-muted leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Example Items */}
                    <ul className="space-y-2 pt-3 border-t border-buraq-primary/20 text-xs sm:text-sm font-medium text-buraq-dark">
                      {cat.examples.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-buraq-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Descriptive Link */}
                  <div className="pt-2">
                    <Link
                      href={`/products/${cat.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-buraq-primary hover:text-buraq-dark transition-all group/btn"
                    >
                      <span>Explore {cat.name}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
