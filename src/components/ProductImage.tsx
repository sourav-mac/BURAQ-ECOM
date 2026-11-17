"use client";

import React, { useState } from "react";
import { Package } from "lucide-react";

/** Product photo with shimmer while loading and a clean placeholder when missing. */
export function ProductImage({ src, alt, className = "" }: { src: string | null; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-[#F2F7F4] text-[#07543F]/40 ${className}`}>
        <Package className="w-1/4 h-1/4 max-w-12 max-h-12" strokeWidth={1.5} />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-[#F7F4EE] ${className}`}>
      {!loaded && <div className="absolute inset-0 bg-[#E2DED5]/40 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
