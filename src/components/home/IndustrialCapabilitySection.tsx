"use client";

import React from "react";
import Image from "next/image";

const capabilities = [
  {
    title: "Decorative & Designer Lighting",
    desc: "Luxury crystal chandeliers, multi-tier designer pendants, antique Moroccan lanterns, and ambient decorative illumination.",
    image: "/images/products/luxury-pendant-chandelier.jpg",
  },
  {
    title: "Solar Energy & BOS Hardware",
    desc: "High-efficiency solar PV modules, on-grid string inverters, UV-resistant 1.5kV DC cables, MC4 connectors, and engineered mounting rails.",
    image: "/images/products/solar-pv-modules.jpg",
  },
  {
    title: "Electrical Infrastructure & Switchgear",
    desc: "Industrial power cables, MCBs, MCCBs, contactors, and distribution boards sourced for commercial buildings and factory electrification.",
    image: "/images/products/industrial-switchgear.jpg",
  },
];

export const IndustrialCapabilitySection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white via-[#E3EFE8] to-[#F7F4EE]">
      {/* Section Background: Atmospheric Blurred Industrial Facility Photo */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/images/built-for-industry.jpg"
          alt="BURAQ Industrial Facility Operations"
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-center opacity-25 blur-[4px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#E3EFE8]/85 to-[#F7F4EE]/90" />
      </div>

      {/* Soft Greenish Ambient Aurora Glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[340px] bg-gradient-to-tr from-buraq-primary/14 via-[#25A170]/12 to-emerald-200/15 rounded-full blur-[105px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12 max-w-2xl">
          <div className="w-12 h-1 bg-buraq-primary rounded-full mb-4" />
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-buraq-dark tracking-tight leading-tight">
            Built for Business &amp; Projects
          </h2>
          <p className="text-base sm:text-lg text-buraq-muted mt-2 leading-relaxed">
            Essential lighting systems, solar components, and quality electrical products supplied for commercial facilities, industrial units, and contractor schedules.
          </p>
        </div>

        {/* 3 Capability Cards Grid - Compact to text size with relatable shadow image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {capabilities.map((cap) => {
            return (
              <div
                key={cap.title}
                className="relative overflow-hidden rounded-2xl p-6 sm:p-7 border border-slate-800/15 shadow-md min-h-[220px] flex flex-col justify-end cursor-default select-none"
              >
                {/* Relatable Product Photo Background - Compact & Naturally Clipped */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-slate-900">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center opacity-75"
                  />
                  {/* Rich Shadow Overlay for contrast and text clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/55" />
                </div>

                <div className="relative z-10 space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-sm">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/95 leading-relaxed font-normal drop-shadow-sm">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
