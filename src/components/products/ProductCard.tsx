"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProductItem } from "@/lib/products-data";
import { ProductEnquiryModal } from "./ProductEnquiryModal";

interface ProductCardProps {
  product: ProductItem;
  showEnquiryButton?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showEnquiryButton = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between group">
        <div className="space-y-4">
          {/* Product Image Cover: 3:2 Photographic Ratio */}
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-buraq-dark/5 shadow-sm">
            <Image
              src={product.image}
              alt={`${product.name} - ${product.categoryName} supplied by BURAQ Enterprise`}
              width={600}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-full object-cover object-[center_33%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Product Header & Description */}
          <div className="space-y-2 pt-1">
            <div>
              <h3
                className="text-base sm:text-[17px] font-bold text-buraq-dark tracking-tight leading-snug whitespace-nowrap overflow-hidden text-ellipsis"
                title={product.name}
              >
                {product.name}
              </h3>
              <div className="text-[11px] font-semibold text-buraq-accent uppercase tracking-wider mt-0.5">
                {product.categoryName}
              </div>
            </div>
            <p className="text-sm text-buraq-muted leading-relaxed">
              {product.shortDesc}
            </p>
          </div>

          {/* Product Items / Specifications List — Matching Product Categories styling */}
          {product.specifications && product.specifications.length > 0 && (
            <ul className="space-y-2 pt-3 border-t border-buraq-primary/20 text-xs sm:text-sm font-medium text-buraq-dark">
              {product.specifications.slice(0, 4).map((spec, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-buraq-primary flex-shrink-0" />
                  <span className="leading-snug">{spec}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Bottom Row — Only rendered when showEnquiryButton is true */}
        {showEnquiryButton && (
          <div className="pt-4 mt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-bold text-buraq-primary hover:text-buraq-dark transition-all cursor-pointer group/btn"
            >
              <span>Enquire About This Product</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {showEnquiryButton && (
        <ProductEnquiryModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
