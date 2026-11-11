"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Heart, ShieldCheck } from "lucide-react";
import { ProductItem } from "@/lib/products-data";
import { useAuth } from "@/lib/auth-context";

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { isWishlisted, toggleWishlist, isLoggedIn } = useAuth();
  const wishlisted = isWishlisted(product.id);

  // Badge colors
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-amber-500 text-white";
      case "Buraq Assured":
        return "bg-emerald-600 text-white";
      case "Top Rated":
        return "bg-indigo-600 text-white";
      case "Trending":
        return "bg-sky-600 text-white";
      default:
        return "bg-buraq-primary text-white";
    }
  };

  const [currentUrl, setCurrentUrl] = React.useState("/products");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const pathWithSearch = window.location.pathname + window.location.search;
      if (pathWithSearch && pathWithSearch !== "/") {
        setCurrentUrl(pathWithSearch);
      }
    }
  }, []);

  const targetHref = isLoggedIn
    ? `/products/${product.id}`
    : `/login?redirect=${encodeURIComponent(
        `/products/${product.id}`
      )}&from=${encodeURIComponent(currentUrl)}`;

  const handleCardClick = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("buraq_product_scroll_y", String(window.scrollY));
      const pathWithSearch = window.location.pathname + window.location.search;
      if (pathWithSearch && pathWithSearch !== "/") {
        sessionStorage.setItem("buraq_product_return_url", pathWithSearch);
      }
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      handleCardClick();
      router.push(targetHref);
      return;
    }
    toggleWishlist(product.id);
  };

  return (
    <Link
      href={targetHref}
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-neutral-200/90 hover:border-buraq-primary/50 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-full"
    >
      {/* Top Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FBFBFA] p-2 sm:p-3 flex items-center justify-center border-b border-neutral-100">
        <Image
          src={product.image}
          alt={`${product.name} - ${product.categoryName}`}
          width={500}
          height={375}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge && (
            <span
              className={`text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs tracking-wide uppercase flex items-center gap-1 ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge === "Buraq Assured" && (
                <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              )}
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button — ONLY shown when user is signed in */}
        {isLoggedIn && (
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-center transition-all z-10 hover:scale-110 active:scale-95 cursor-pointer ${
              wishlisted
                ? "text-rose-500"
                : "text-neutral-400 hover:text-rose-500"
            }`}
            title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            aria-label={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                wishlisted ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Content Body */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div className="space-y-1 sm:space-y-1.5">
          {/* Category / Brand metadata */}
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-buraq-accent truncate">
              {product.brand || product.categoryName}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full inline-flex items-center gap-1 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              In Stock
            </span>
          </div>

          {/* Product Title */}
          <h3
            className="text-xs sm:text-[14px] lg:text-[15px] font-bold text-buraq-dark group-hover:text-buraq-primary transition-colors line-clamp-2 leading-snug min-h-[32px] sm:min-h-[38px]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating Block (Flipkart / Amazon Signature) */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] sm:text-xs font-bold leading-none shadow-2xs">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white" />
            </div>
            <span className="text-[10px] sm:text-xs text-neutral-400 font-medium">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Dynamic Cost / Price Block — Only the cost shows as requested */}
          <div className="pt-1 sm:pt-2">
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-base sm:text-xl lg:text-[22px] font-black text-buraq-dark tracking-tight">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-400 line-through font-medium">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600">
                {product.discountPercent}% off
              </span>
            </div>
            {product.unit && (
              <div className="text-[10px] sm:text-[11px] text-neutral-500 font-medium truncate mt-0.5">
                Per {product.unit}
              </div>
            )}
          </div>

          {/* Key Specs Pills */}
          {product.specifications && product.specifications.length > 0 && (
            <ul className="pt-1.5 sm:pt-2 border-t border-neutral-100 space-y-0.5 sm:space-y-1 hidden sm:block">
              {product.specifications.slice(0, 2).map((spec, i) => (
                <li
                  key={i}
                  className="text-[10px] sm:text-xs text-neutral-600 line-clamp-1 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-buraq-primary/80 flex-shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
};
