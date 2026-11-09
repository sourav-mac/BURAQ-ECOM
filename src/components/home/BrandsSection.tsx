"use client";

import React from "react";
import Image from "next/image";

interface MarqueeBrand {
  name: string;
  category: "Lighting" | "Solar" | "Electrical";
  logo: string;
  scale?: string;
  scaleStyle?: React.CSSProperties;
}

// Row 1 Brands (16 household, verified brand wordmarks moving smoothly to the left)
const ROW_ONE_BRANDS: MarqueeBrand[] = [
  { name: "Philips", category: "Lighting", logo: "/images/brands/philips.svg" },
  { name: "Larsen & Toubro", category: "Electrical", logo: "/images/brands/lt.svg", scaleStyle: { transform: "scale(1.18)", transformOrigin: "center" } },
  { name: "Schneider Electric", category: "Electrical", logo: "/images/brands/schneider.svg" },
  { name: "Tata Power Solar", category: "Solar", logo: "/images/brands/tata-power.svg" },
  { name: "Havells", category: "Electrical", logo: "/images/brands/havells.svg", scaleStyle: { transform: "scale(1.22)", transformOrigin: "center" } },
  { name: "Siemens", category: "Electrical", logo: "/images/brands/siemens.svg", scaleStyle: { transform: "scale(1.18)", transformOrigin: "center" } },
  { name: "Polycab", category: "Electrical", logo: "/images/brands/polycab.png", scaleStyle: { transform: "scale(1.22)", transformOrigin: "center" } },
  { name: "Panasonic", category: "Lighting", logo: "/images/brands/panasonic.svg" },
  { name: "ABB", category: "Electrical", logo: "/images/brands/abb.svg" },
  { name: "Vikram Solar", category: "Solar", logo: "/images/brands/vikram-solar.svg" },
  { name: "Crompton", category: "Lighting", logo: "/images/brands/crompton.svg" },
  { name: "Legrand", category: "Electrical", logo: "/images/brands/legrand.svg" },
  { name: "Wipro Lighting", category: "Lighting", logo: "/images/brands/wipro.svg", scaleStyle: { transform: "scale(1.14)", transformOrigin: "center" } },
  { name: "Eaton", category: "Electrical", logo: "/images/brands/eaton.svg" },
  { name: "Adani Solar", category: "Solar", logo: "/images/brands/adani.svg" },
  { name: "KEI Industries", category: "Electrical", logo: "/images/brands/kei.png", scaleStyle: { transform: "scale(1.24)", transformOrigin: "center" } },
];

// Row 2 Brands (16 household, verified brand wordmarks moving smoothly to the right)
const ROW_TWO_BRANDS: MarqueeBrand[] = [
  { name: "Finolex Cables", category: "Electrical", logo: "/images/brands/finolex.svg" },
  { name: "Ayka", category: "Electrical", logo: "/images/brands/ayka-brand.png", scaleStyle: { transform: "scale(1.18)", transformOrigin: "center" } },
  { name: "RR Kabel", category: "Electrical", logo: "/images/brands/rr-kabel.svg" },
  { name: "Anchor by Panasonic", category: "Electrical", logo: "/images/brands/anchor.svg" },
  { name: "Bajaj Electricals", category: "Lighting", logo: "/images/brands/bajaj.svg", scaleStyle: { transform: "scale(1.15)", transformOrigin: "center" } },
  { name: "Orient Electric", category: "Lighting", logo: "/images/brands/orient-electric.svg" },
  { name: "Goldmedal", category: "Lighting", logo: "/images/brands/goldmedal.svg", scaleStyle: { transform: "scale(1.10)", transformOrigin: "center" } },
  { name: "Syska", category: "Lighting", logo: "/images/brands/syska.png", scaleStyle: { transform: "scale(1.14)", transformOrigin: "center" } },
  { name: "Surya Roshni", category: "Lighting", logo: "/images/brands/surya-roshni.svg" },
  { name: "Halonix", category: "Lighting", logo: "/images/brands/halonix.png", scaleStyle: { transform: "scale(1.32)", transformOrigin: "center" } },
  { name: "Eveready", category: "Lighting", logo: "/images/brands/eveready.png" },
  { name: "GM Modular", category: "Electrical", logo: "/images/brands/gm-modular.png" },
  { name: "HPL Electric", category: "Electrical", logo: "/images/brands/hpl.png", scaleStyle: { transform: "scale(1.14)", transformOrigin: "center" } },
  { name: "Jaquar Lighting", category: "Lighting", logo: "/images/brands/jaquar.png" },
  { name: "LEDVANCE", category: "Lighting", logo: "/images/brands/ledvance.svg" },
  { name: "V-Guard", category: "Lighting", logo: "/images/brands/vguard.svg" },
];

interface LogoCardProps {
  brand: MarqueeBrand;
}

const LogoCard: React.FC<LogoCardProps> = ({ brand }) => {
  return (
    <div
      className="buraq-marquee-card flex-shrink-0 mx-2 sm:mx-2.5 px-5 sm:px-6 py-2 rounded-2xl bg-white border border-[#E2ECE6] shadow-[0_2px_8px_rgba(7,84,63,0.03)] flex items-center justify-center min-w-[160px] sm:min-w-[185px] h-[66px] sm:h-[74px] select-none pointer-events-none overflow-hidden"
    >
      <div className="relative w-[125px] sm:w-[140px] h-9 sm:h-10 flex items-center justify-center pointer-events-none">
        <Image
          src={brand.logo}
          alt={`${brand.name} official logo`}
          fill
          sizes="(max-width: 640px) 125px, 140px"
          unoptimized={brand.logo.endsWith(".svg")}
          style={brand.scaleStyle}
          className="object-contain pointer-events-none"
        />
      </div>
    </div>
  );
};

export const BrandsSection: React.FC = () => {
  return (
    <section
      id="brands"
      aria-label="Leading brand logos"
      className="relative overflow-hidden py-3 sm:py-5 bg-[#F2F7F4] select-none"
      style={{ contain: "paint" }}
    >
      {/* High-Performance Smooth Ambient Radial Aura (Zero GPU blur filter overhead) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(7,84,63,0.05),transparent_70%)]" />

      {/* Infinite Moving Marquee Wrapper with no-reveal isolation */}
      <div className="no-reveal relative w-full overflow-hidden space-y-2.5 sm:space-y-3.5">
        {/* Left & Right Smooth Edge Fade Masks in exact #F2F7F4 background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-r from-[#F2F7F4] via-[#F2F7F4]/90 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-l from-[#F2F7F4] via-[#F2F7F4]/90 to-transparent z-10" />

        {/* Track 1: Moving Smoothly Left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left py-0.5">
            {ROW_ONE_BRANDS.map((brand, idx) => (
              <LogoCard key={`row1-a-${brand.name}-${idx}`} brand={brand} />
            ))}
            {ROW_ONE_BRANDS.map((brand, idx) => (
              <LogoCard key={`row1-b-${brand.name}-${idx}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Track 2: Moving Smoothly Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right py-0.5">
            {ROW_TWO_BRANDS.map((brand, idx) => (
              <LogoCard key={`row2-a-${brand.name}-${idx}`} brand={brand} />
            ))}
            {ROW_TWO_BRANDS.map((brand, idx) => (
              <LogoCard key={`row2-b-${brand.name}-${idx}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
