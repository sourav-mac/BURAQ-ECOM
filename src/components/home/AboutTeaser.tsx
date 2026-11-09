"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Quote } from "lucide-react";
import { OperationsModal } from "./OperationsModal";

const operationalCards = [
  {
    title: "Lighting Products",
    desc: "Modern crystal chandeliers, multi-tier designer pendants, antique Moroccan lanterns, and decorative celebration lighting.",
    bg: "bg-buraq-dark text-white border-buraq-dark/90",
    image: "/images/products/luxury-pendant-chandelier.jpg",
    overlay: "bg-gradient-to-t from-buraq-dark/95 via-buraq-dark/88 to-buraq-dark/75",
    titleColor: "text-white",
    descColor: "text-gray-200",
  },
  {
    title: "Solar Components",
    desc: "Mono PERC & bifacial PV modules, on-grid string inverters, 1.5kV DC cables, and engineered mounting hardware.",
    bg: "bg-buraq-primary text-white border-buraq-primary-hover",
    image: "/images/products/solar-pv-modules.jpg",
    overlay: "bg-gradient-to-t from-buraq-primary/95 via-buraq-primary/88 to-buraq-primary/75",
    titleColor: "text-white",
    descColor: "text-emerald-50/95",
  },
  {
    title: "Electrical Products",
    desc: "Heavy industrial power cables, circuit breakers (MCBs/MCCBs), switchgear, contactors, and distribution boards.",
    bg: "bg-buraq-accent text-white border-buraq-accent-hover",
    image: "/images/products/industrial-switchgear.jpg",
    overlay: "bg-gradient-to-t from-buraq-accent/95 via-buraq-accent/88 to-buraq-accent/75",
    titleColor: "text-white",
    descColor: "text-orange-50/95",
  },
];

export const AboutTeaser: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 bg-gradient-to-b from-[#FFFDEB] via-[#E4EFE8] to-white">
        {/* Background Layer: Blended Industrial Operations Image */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-full lg:w-[60%] pointer-events-none z-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.2) 22%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,1) 80%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,1) 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.2) 22%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,1) 80%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,1) 75%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
            alt="BURAQ Product Sourcing and Industrial Supply Operations in Kolkata"
            width={1400}
            height={900}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="w-full h-full object-cover object-[70%_33%] opacity-90"
          />
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#FFFDEB] via-[#FFFDEB]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Soft Greenish Ambient Aurora Glow */}
        <div className="absolute top-1/3 left-8 w-[480px] h-[340px] bg-gradient-to-tr from-buraq-primary/15 via-[#25A170]/12 to-emerald-200/18 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: 2/3 Width (8 cols) — Text & Manifesto Quote */}
            <div className="lg:col-span-8 space-y-6">
              {/* Top Accent Line */}
              <div className="w-12 h-1 bg-buraq-primary rounded-full" />

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-buraq-dark tracking-tight leading-tight">
                  About BURAQ
                </h2>
              </div>

              <p className="text-base sm:text-lg text-buraq-muted leading-relaxed max-w-2xl">
                BURAQ ENTERPRISE showcases lighting solutions, solar components, and electrical products for business and project requirements, alongside secondary technical manpower support. We work closely with our clients to deliver practical, dependable product supply and build lasting business relationships based on trust.
              </p>

              {/* Highlight quote */}
              <div className="flex items-center gap-3 pt-1">
                <Quote className="w-5 h-5 text-buraq-accent flex-shrink-0" />
                <p className="text-sm sm:text-base font-semibold text-buraq-dark italic">
                  &ldquo;People You Trust. Service You Rely On. Solutions That Deliver.&rdquo;
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-buraq-primary text-white font-bold text-sm sm:text-base shadow-md hover:bg-buraq-dark transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Learn More About BURAQ</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-buraq-dark/90 text-white font-bold text-sm shadow-sm hover:bg-buraq-dark transition-all duration-300 cursor-pointer"
                >
                  <span>Supply Workflow</span>
                </button>
              </div>
            </div>

            {/* Right Column: 1/3 Width (4 cols) — 3 Operational Pillar Cards Stacked */}
            <div className="lg:col-span-4 space-y-3.5">
              {operationalCards.map((card) => (
                <div
                  key={card.title}
                  className={`${card.bg} relative overflow-hidden block p-6 sm:p-7 rounded-2xl border shadow-card min-h-[140px] select-none`}
                >
                  {/* Subtle Background Image with Color Overlay */}
                  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover object-center opacity-30 mix-blend-luminosity"
                    />
                    <div className={`absolute inset-0 ${card.overlay}`} />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-2">
                      <h3 className={`text-xl font-bold ${card.titleColor}`}>
                        {card.title}
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${card.descColor}`}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operations Lightweight Popup Modal */}
      <OperationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
