"use client";

import React, { useEffect } from "react";

interface OperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const operationalSteps = [
  {
    step: "01",
    title: "Requirement & Schedule Assessment",
    desc: "We review your lighting schedule, solar BOQ, or electrical product requirements to understand exact site and project needs.",
  },
  {
    step: "02",
    title: "Specification Sourcing & Verification",
    desc: "From manufacturer data sheets to availability confirmation, we ensure all products match project specifications.",
  },
  {
    step: "03",
    title: "Reliable Lighting & Electrical Sourcing",
    desc: "We source and supply commercial LED luminaires, solar PV modules, inverters, power cables, and industrial switchgear according to verified specifications.",
  },
  {
    step: "04",
    title: "Dedicated Supply Coordination",
    desc: "We coordinate staged delivery, documentation, and responsive communication to keep your project operations moving on time.",
  },
];

export const OperationsModal: React.FC<OperationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Close on ESC key and prevent body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      aria-modal="true"
      role="dialog"
    >
      {/* Light, Clean, Box-Free & Ultra-Modern Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FFFDEB] text-buraq-dark rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-black/[0.08] shadow-[0_24px_60px_-12px_rgba(16,32,31,0.25),0_4px_16px_-4px_rgba(0,0,0,0.06)] flex flex-col gap-4 animate-in zoom-in-95 fade-in duration-200 cursor-default overflow-hidden"
      >
        {/* Soft Ambient Light Tint */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-buraq-primary/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-buraq-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Top-Left Green Accent Line */}
        <div className="relative z-10 w-10 h-1 bg-buraq-primary rounded-full" />

        {/* Intro Paragraph */}
        <div className="relative z-10">
          <p className="text-sm sm:text-[14.5px] text-buraq-dark/95 leading-relaxed font-medium">
            BURAQ bridges technical requirements with dependable product supply. We coordinate verified specifications across lighting systems, solar components, and electrical infrastructure.
          </p>
        </div>

        {/* Box-Free Clean Operational Execution List */}
        <div className="relative z-10 space-y-3 pt-1 border-t border-black/[0.07]">
          {operationalSteps.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3.5 group"
            >
              {/* Bullet indicator */}
              <span className="w-2 h-2 rounded-full bg-buraq-primary shrink-0 mt-1.5 group-hover:scale-125 transition-transform" />

              {/* Text content - completely box-free */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <h4 className="text-sm font-bold text-buraq-dark group-hover:text-buraq-primary transition-colors tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-[12.5px] text-buraq-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
