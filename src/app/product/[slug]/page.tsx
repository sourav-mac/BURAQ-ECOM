"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "features">("specs");

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#667085]">
        <Link href="/" className="hover:text-[#10201F]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-[#10201F]">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/category/${product.category}`} className="capitalize hover:text-[#10201F]">{product.category}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#10201F] truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] overflow-hidden p-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
            {product.tag && (
              <span className="absolute top-6 left-6 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-[#07543F] text-[#FFFDEB] shadow-md">
                {product.tag}
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#07543F]">
                {product.brand}
              </span>
              <span className="text-[#E2DED5]">•</span>
              <div className="flex items-center gap-1 text-[#07543F] text-xs font-bold">
                <Star className="w-4 h-4 fill-[#07543F]" />
                <span className="text-[#10201F]">{product.rating}</span>
                <span className="text-[#667085]">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#10201F] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs text-[#667085]">
              Category: <span className="text-[#10201F] capitalize">{product.categoryName}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#07543F]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-[#667085] line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFFDEB] text-[#07543F] border border-[#07543F]/40">
                    Save {product.discountPercent}%
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-[#667085]">Includes all applicable GST taxes</p>
          </div>

          <p className="text-xs sm:text-sm text-[#10201F] leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Selector + Add to Cart Button */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 rounded-xl bg-[#FFFFFF] border border-[#E2DED5]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#10201F] hover:text-[#10201F] hover:bg-[#F2F7F4]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#10201F]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#10201F] hover:text-[#10201F] hover:bg-[#F2F7F4]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-[#FFFDEB] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2DED5] flex flex-col items-center text-center">
                <Truck className="w-4 h-4 text-[#07543F] mb-1" />
                <span className="text-[10px] font-bold text-[#10201F]">Free Delivery</span>
                <span className="text-[9px] text-[#667085]">Orders over ₹1500</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2DED5] flex flex-col items-center text-center">
                <ShieldCheck className="w-4 h-4 text-[#07543F] mb-1" />
                <span className="text-[10px] font-bold text-[#10201F]">Genuine BURAQ</span>
                <span className="text-[9px] text-[#667085]">Full warranty card</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2DED5] flex flex-col items-center text-center">
                <RotateCcw className="w-4 h-4 text-[#07543F] mb-1" />
                <span className="text-[10px] font-bold text-[#10201F]">7 Days Return</span>
                <span className="text-[9px] text-[#667085]">Transit safety insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specs & Highlights */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] space-y-6">
        <div className="flex gap-4 border-b border-[#E2DED5] pb-3">
          <button
            onClick={() => setActiveTab("specs")}
            className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "specs"
                ? "border-[#07543F] text-[#07543F]"
                : "border-transparent text-[#667085] hover:text-[#10201F]"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "features"
                ? "border-[#07543F] text-[#07543F]"
                : "border-transparent text-[#667085] hover:text-[#10201F]"
            }`}
          >
            Engineering Highlights
          </button>
        </div>

        {activeTab === "specs" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.specifications.map((s) => (
              <div key={s.key} className="p-3 rounded-xl bg-[#FFFDEB] border border-[#E2DED5] flex justify-between text-xs">
                <span className="text-[#667085]">{s.key}</span>
                <span className="font-semibold text-[#10201F] text-right">{s.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-[#10201F]">
                <CheckCircle2 className="w-4 h-4 text-[#07543F] shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase text-[#10201F] tracking-tight">
            Related {product.categoryName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2DED5] space-y-3">
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg" />
                <h4 className="text-xs font-bold text-[#10201F] truncate">{p.name}</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black text-[#07543F]">₹{p.price.toLocaleString("en-IN")}</span>
                  <Link href={`/product/${p.slug}`} className="text-[#10201F] hover:text-[#07543F] font-bold">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
