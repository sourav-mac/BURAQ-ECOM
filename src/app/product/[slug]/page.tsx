"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
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
        <Link href="/" className="text-[#667085]">Home</Link>
        <span>/</span>
        <Link href="/products" className="text-[#667085]">Products</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="uppercase text-[#667085]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#10201F] truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl bg-white border border-[#E2DED5] overflow-hidden p-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
            {product.tag && (
              <span className="absolute top-6 left-6 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-[#07543F] text-[#FFFDEB] shadow-xs">
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
              <div className="text-xs font-bold text-[#D96B1F]">
                ★ {product.rating}{" "}
                <span className="text-[#667085] font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#10201F] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs text-[#667085]">
              Category: <span className="text-[#10201F] uppercase font-bold">{product.categoryName}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2DED5] space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#07543F]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-[#667085] line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FDEEE5] text-[#D96B1F] border border-[#D96B1F]/30">
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
              <div className="flex items-center gap-2 p-1 rounded-xl bg-white border border-[#E2DED5]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#10201F] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#10201F]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#10201F] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-black uppercase tracking-wider flex items-center justify-center shadow-xs cursor-pointer"
              >
                Add To Cart • ₹{(product.price * quantity).toLocaleString("en-IN")}
              </button>
            </div>

            {/* Guarantees - Text based */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-3 rounded-xl bg-white border border-[#E2DED5] text-center">
                <div className="text-[11px] font-bold text-[#10201F]">Free Delivery</div>
                <div className="text-[9px] text-[#667085]">Orders over ₹1500</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E2DED5] text-center">
                <div className="text-[11px] font-bold text-[#10201F]">Genuine BURAQ</div>
                <div className="text-[9px] text-[#667085]">Full warranty card</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E2DED5] text-center">
                <div className="text-[11px] font-bold text-[#10201F]">7 Days Return</div>
                <div className="text-[9px] text-[#667085]">Transit safety insured</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specs & Highlights */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2DED5] space-y-6">
        <div className="flex gap-4 border-b border-[#E2DED5] pb-3">
          <button
            onClick={() => setActiveTab("specs")}
            className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 cursor-pointer ${
              activeTab === "specs"
                ? "border-[#07543F] text-[#07543F]"
                : "border-transparent text-[#667085]"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`text-xs font-bold uppercase tracking-wider pb-2 border-b-2 cursor-pointer ${
              activeTab === "features"
                ? "border-[#07543F] text-[#07543F]"
                : "border-transparent text-[#667085]"
            }`}
          >
            Engineering Highlights
          </button>
        </div>

        {activeTab === "specs" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.specifications.map((s) => (
              <div key={s.key} className="p-3 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] flex justify-between text-xs">
                <span className="text-[#667085]">{s.key}</span>
                <span className="font-semibold text-[#10201F] text-right">{s.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#10201F]">
                <span className="text-[#07543F] font-bold">•</span>
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
              <div key={p.id} className="p-4 rounded-xl bg-white border border-[#E2DED5] space-y-3 shadow-xs">
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg" />
                <h4 className="text-xs font-bold text-[#10201F] truncate">{p.name}</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black text-[#07543F]">₹{p.price.toLocaleString("en-IN")}</span>
                  <Link href={`/product/${p.slug}`} className="text-[#07543F] font-bold">
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
