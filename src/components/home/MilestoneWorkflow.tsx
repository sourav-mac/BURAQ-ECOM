"use client";

import React from "react";

interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    year: "2023",
    title: "Foundation & Industrial Sourcing",
    description:
      "BURAQ commenced operations establishing supply networks and technical personnel coordination across regional industrial facilities.",
  },
  {
    year: "2024",
    title: "Lighting & Electrical Supply Division",
    description:
      "Expanded commercial supply capabilities across energy-efficient LED luminaires, heavy power cables, circuit breakers, and distribution switchgear.",
  },
  {
    year: "2025",
    title: "Solar Components & Renewable Hardware",
    description:
      "Introduced wholesale supply of solar PV modules, string inverters, 1.5kV DC cables, MC4 connectors, and engineered mounting hardware.",
  },
  {
    year: "2026",
    title: "Integrated Supply Coordination & Regional Reach",
    description:
      "Full coordination across lighting solutions, solar hardware, and electrical products with structured offline quotations and dedicated project support.",
  },
];

export const MilestoneWorkflow: React.FC = () => {
  return (
    <section
      id="workflow"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F7F4EE] via-[#E4EFE8] to-[#F7F4EE] border-t border-buraq-border/40 z-10"
    >
      {/* Soft Greenish Ambient Aurora Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[340px] bg-gradient-to-tr from-buraq-primary/12 via-[#25A170]/10 to-emerald-200/12 rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="w-12 h-1 bg-buraq-primary rounded-full mb-3.5 mx-auto" />
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-buraq-dark tracking-tight leading-tight">
            Roadmap
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-buraq-muted leading-relaxed max-w-lg mx-auto">
            Our strategic journey of operational growth, engineering milestones, and dependable service delivery.
          </p>
        </div>

        {/* Desktop & Tablet Central Road Timeline (md+) */}
        <div className="hidden md:block relative">
          {/* Continuous Central Road Track running down the center */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-7 bg-buraq-dark rounded-full shadow-inner border border-buraq-primary/30 z-0 flex items-center justify-center">
            {/* Road Center Dashed Line */}
            <div className="h-full border-l-2 border-dashed border-[#FFFDEB]/80" />
          </div>

          {/* Alternating Milestone Items */}
          <div className="space-y-16 lg:space-y-20 relative z-10">
            {MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0; // Even: content on right, Odd: content on left
              const isFirst = idx === 0;
              const isLast = idx === MILESTONES.length - 1;

              return (
                <div key={item.year} className="grid grid-cols-2 items-center relative">
                  {/* Left Column */}
                  <div className="pr-12 lg:pr-16 text-right">
                    {!isEven && (
                      <div className="space-y-1">
                        <span className="text-2xl sm:text-3xl font-black tracking-tight text-buraq-primary block leading-none">
                          {item.year}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-buraq-dark tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-buraq-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Node on the Road */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                    <div className="relative flex items-center justify-center">
                      {isFirst || isLast ? (
                        <div className="w-10 h-10 rounded-full bg-buraq-dark border-[3px] border-buraq-primary shadow-md flex items-center justify-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-buraq-dark border-2 border-white shadow-md flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="pl-12 lg:pl-16 text-left">
                    {isEven && (
                      <div className="space-y-1">
                        <span className="text-2xl sm:text-3xl font-black tracking-tight text-buraq-primary block leading-none">
                          {item.year}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-buraq-dark tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-buraq-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Road Timeline (< md) — Continuous Unbroken Road Track */}
        <div className="block md:hidden relative">
          {/* Continuous Unbroken Black Road Track Running All the Way Down */}
          <div className="absolute left-6 top-2 bottom-3 w-7 -translate-x-1/2 bg-buraq-dark rounded-full shadow-inner border border-buraq-primary/40 z-10 flex items-center justify-center">
            {/* Continuous Dashed White Center Lane */}
            <div className="h-full border-l-2 border-dashed border-[#FFFDEB]/90" />
          </div>

          {/* Milestone Items List */}
          <div className="space-y-5 sm:space-y-6 relative">
            {MILESTONES.map((item, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === MILESTONES.length - 1;

              return (
                <div key={item.year} className="relative pl-14 sm:pl-16">
                  {/* Horizontal Connector Line from Road into Card */}
                  <div className="absolute left-6 top-6 w-8 h-[2px] bg-gradient-to-r from-buraq-primary/60 to-buraq-border z-10" />

                  {/* Road Checkpoint Node — 100% Centered on the Road Axis */}
                  <div className="absolute left-6 top-6 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-buraq-dark flex items-center justify-center shadow-md z-20">
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center ${
                        isFirst || isLast
                          ? "border-[2.5px] border-buraq-primary"
                          : "border-2 border-white"
                      }`}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                    </div>
                  </div>

                  {/* Styled Milestone Card Beside Road */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-buraq-border/80 shadow-xs space-y-1.5 transition-all relative z-10">
                    <span className="text-xl font-black tracking-tight text-buraq-primary leading-none block">
                      {item.year}
                    </span>
                    <h3 className="text-[15px] font-bold text-buraq-dark tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-buraq-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
