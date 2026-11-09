"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

const renderSubtitle = (text: string) => {
  const parts = text.split(/(buraq\.ep@gmail\.com)/g);
  return parts.map((part, idx) => {
    if (part === "buraq.ep@gmail.com") {
      return (
        <a
          key={idx}
          href="mailto:buraq.ep@gmail.com"
          className="text-white font-bold hover:text-buraq-accent transition-colors"
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
};

export const CtaBanner: React.FC<CtaBannerProps> = ({
  title = "Looking for lighting, solar components, or electrical products?",
  subtitle = "Contact BURAQ today via email at buraq.ep@gmail.com. We are here to discuss product availability and structured offline quotations.",
  buttonText = "Explore Products",
  buttonHref = "/products/lighting",
  secondaryButtonText,
  secondaryButtonHref,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F0] to-[#EFECE3] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-white/10 bg-buraq-dark">
          {/* Immersive Industrial Photography Layer */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80"
              alt="BURAQ Industrial Sourcing and Supply Facility Operations in West Bengal"
              width={1600}
              height={900}
              sizes="100vw"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Deep Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-buraq-dark/95 via-buraq-dark/85 to-buraq-dark/90 z-0 pointer-events-none" />

          {/* Foreground Content: 2/3 Copy & 1/3 Action Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                {title}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                {renderSubtitle(subtitle)}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-3.5">
              <Link
                href={buttonHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-buraq-primary text-white font-bold text-sm sm:text-base shadow-lg hover:bg-buraq-primary-hover transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{buttonText}</span>
              </Link>
              {secondaryButtonText && secondaryButtonHref && (
                <Link
                  href={secondaryButtonHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <LayoutGrid className="w-4 h-4 text-buraq-sage" />
                  <span>{secondaryButtonText}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
