"use client";

import React from "react";

export interface StickyNoteProps {
  tag?: string;
  title: string;
  text: string;
  color?: "yellow" | "green" | "peach" | "blue";
  rotate?: "left" | "right" | "slight-left" | "slight-right" | "none";
  pin?: boolean;
  className?: string;
  author?: string;
}

const colorStyles = {
  yellow: {
    bg: "bg-[#FEF9C3]", // Warm canary post-it
    border: "border-[#FDE047]/60",
    text: "text-amber-950",
    tagBg: "bg-amber-950/10 text-amber-900",
    tape: "bg-amber-100/70",
  },
  green: {
    bg: "bg-[#DCFCE7]", // Fresh mint post-it
    border: "border-[#86EFAC]/60",
    text: "text-emerald-950",
    tagBg: "bg-emerald-950/10 text-emerald-900",
    tape: "bg-emerald-100/70",
  },
  peach: {
    bg: "bg-[#FFEDD5]", // Soft warm peach post-it
    border: "border-[#FDBA74]/60",
    text: "text-orange-950",
    tagBg: "bg-orange-950/10 text-orange-900",
    tape: "bg-orange-100/70",
  },
  blue: {
    bg: "bg-[#E0F2FE]", // Soft sky blue post-it
    border: "border-[#7DD3FC]/60",
    text: "text-sky-950",
    tagBg: "bg-sky-950/10 text-sky-900",
    tape: "bg-sky-100/70",
  },
};

const rotateClasses = {
  "slight-left": "-rotate-1",
  left: "-rotate-2 sm:-rotate-3",
  "slight-right": "rotate-1",
  right: "rotate-2 sm:rotate-3",
  none: "rotate-0",
};

export const StickyNote: React.FC<StickyNoteProps> = ({
  tag = "BURAQ NOTE",
  title,
  text,
  color = "yellow",
  rotate = "slight-left",
  pin = false,
  className = "",
  author = "Site Operations",
}) => {
  const styles = colorStyles[color] || colorStyles.yellow;
  const rotClass = rotateClasses[rotate] || rotateClasses["slight-left"];

  return (
    <div
      className={`relative inline-block ${rotClass} ${className}`}
    >
      {/* Tape or Push-Pin Effect */}
      {pin ? (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/60 pointer-events-none z-20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 -mt-1 -ml-1" />
        </div>
      ) : (
        <div
          className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-4 ${styles.tape} backdrop-blur-[2px] border border-black/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.06)] rounded-[1px] rotate-[-1.5deg] pointer-events-none z-20`}
        />
      )}

      {/* Sticky Note Body */}
      <div
        className={`relative ${styles.bg} ${styles.border} border p-4 sm:p-5 rounded-md shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] max-w-xs sm:max-w-sm flex flex-col justify-between`}
      >
        {/* Title */}
        <h4 className="text-sm sm:text-[15px] font-bold text-black/90 leading-snug mb-1.5 tracking-tight">
          {title}
        </h4>

        {/* Content */}
        <p className="text-xs sm:text-[13px] text-black/80 leading-relaxed font-normal">
          {text}
        </p>

        {/* Realistic subtle corner curl shadow effect */}
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gradient-to-tl from-black/15 to-transparent rounded-bl-sm pointer-events-none" />
      </div>
    </div>
  );
};
