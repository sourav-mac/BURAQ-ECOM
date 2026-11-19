import React from "react";

export function ProductSkeleton() {
  return (
    <div className="rounded-2xl buraq-card flex flex-col overflow-hidden shadow-xs animate-pulse bg-white border border-[#E2DED5]">
      {/* Image Skeleton */}
      <div className="aspect-square w-full bg-[#E2DED5]/40" />

      {/* Info Block Skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Brand & Rating */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 bg-[#E2DED5]/50 rounded" />
            <div className="h-3 w-12 bg-[#E2DED5]/50 rounded" />
          </div>

          {/* Title (2 lines) */}
          <div className="h-4 w-5/6 bg-[#E2DED5]/60 rounded" />
          <div className="h-4 w-3/4 bg-[#E2DED5]/40 rounded" />

          {/* Description snippet */}
          <div className="h-3 w-full bg-[#E2DED5]/30 rounded mt-1" />
        </div>

        {/* Price & Action Button Skeleton */}
        <div className="pt-2.5 border-t border-[#E2DED5] flex items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="h-5 w-16 bg-[#E2DED5]/70 rounded" />
            <div className="h-3 w-10 bg-[#E2DED5]/40 rounded" />
          </div>
          <div className="h-8 w-24 bg-[#E2DED5]/60 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}
