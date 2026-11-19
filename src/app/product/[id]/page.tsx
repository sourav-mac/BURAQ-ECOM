"use client";

import React, { Suspense, use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Minus, ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { api, inr, ProductDetail } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "@/components/ProductImage";

interface PageProps {
  params: Promise<{ id: string }>;
}

function ProductDetailSkeleton() {
  return (
    <div className="w-full max-w-[1800px] 2xl:max-w-[2200px] 3xl:max-w-[2400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16 items-center animate-pulse">
      <div className="w-full max-w-[430px] 2xl:max-w-[560px] 3xl:max-w-[620px] mx-auto aspect-square rounded-2xl bg-[#E2DED5]/40" />
      <div className="space-y-4 pt-4">
        <div className="h-3 w-24 bg-[#E2DED5]/60 rounded" />
        <div className="h-7 w-3/4 bg-[#E2DED5]/60 rounded" />
        <div className="h-9 w-32 bg-[#E2DED5]/60 rounded" />
        <div className="h-16 w-full bg-[#E2DED5]/40 rounded" />
      </div>
    </div>
  );
}

function ProductDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setProduct(null);
    setError(null);
    setQuantity(1);
    setSelectedImageIndex(0);
    if (id) {
      api.product(id).then(setProduct).catch((e) => setError(e.message));
    }
  }, [id]);

  const allImages = useMemo(() => {
    const list: string[] = [];
    if (product?.photos && product.photos.length > 0) {
      for (const p of product.photos) {
        if (p?.trim() && !list.includes(p.trim())) list.push(p.trim());
      }
    } else if (product?.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img?.publicUrl?.trim() && !list.includes(img.publicUrl.trim())) {
          list.push(img.publicUrl.trim());
        }
      }
    }
    if (product?.photoUrl?.trim() && !list.includes(product.photoUrl.trim())) {
      list.unshift(product.photoUrl.trim());
    }
    return list;
  }, [product]);

  const currentImage = allImages[selectedImageIndex] || product?.photoUrl || null;

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-base font-bold text-[#10201F]">Product not found</p>
        <p className="text-xs text-[#667085] mt-1">{error}</p>
        <Link href="/products" className="mt-5 inline-flex h-10 px-5 items-center rounded-xl bg-[#07543F] text-white text-xs font-bold">
          Browse products
        </Link>
      </div>
    );
  }

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const specs = [
    { key: "Item code", value: product.materialCode },
    { key: "Category", value: product.category.name },
    { key: "Brand", value: product.brand || "—" },
    { key: "Unit", value: product.unit },
    { key: "GST", value: `${product.gstPercent}%` },
    {
      key: "Availability",
      value: !product.inStock ? "Out of stock" : product.stockStatus === "LOW_STOCK" ? "Few left" : "In stock",
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 2xl:px-12 max-w-[1800px] 2xl:max-w-[2200px] 3xl:max-w-[2400px] mx-auto py-3 md:py-6">
      <div className="mb-2">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              router.back();
            } else {
              router.push("/");
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#07543F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 2xl:gap-16 items-start">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-[430px] 2xl:max-w-[560px] 3xl:max-w-[620px] relative group">
            <ProductImage
              key={currentImage || "main"}
              src={currentImage}
              alt={product.name}
              className="w-full aspect-square rounded-2xl border border-[#E2DED5] shadow-xs object-cover bg-white"
            />
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#10201F] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#10201F] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#10201F]/70 text-white text-[10px] font-bold tracking-wider pointer-events-none">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail preview strip below main image */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2.5 mt-3 max-w-[430px] 2xl:max-w-[560px] 3xl:max-w-[620px] w-full overflow-x-auto pb-1">
              {allImages.map((imgUrl, idx) => {
                const isSelected = idx === selectedImageIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    onMouseEnter={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white cursor-pointer ${
                      isSelected
                        ? "border-[#07543F] shadow-xs ring-2 ring-[#07543F]/20"
                        : "border-[#E2DED5] opacity-65 hover:opacity-100 hover:border-[#07543F]/50"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-4 max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#07543F]">{product.brand || "BURAQ"}</div>
            <h1 className="mt-1 text-xl sm:text-2xl font-black text-[#10201F] leading-snug">{product.name}</h1>
          </div>

          <div className="flex items-baseline gap-3 py-2 border-y border-[#E2DED5]">
            <span className="text-3xl font-black text-[#07543F]">{inr(product.price)}</span>
            {product.printedMrp ? (
              <>
                <span className="text-sm text-[#9AA19C]">
                  MRP <span className="line-through">{inr(product.printedMrp)}</span>
                </span>
                <span className="text-xs font-bold text-[#D96B1F]">{product.discountPercent}% off</span>
              </>
            ) : (
              <span className="text-xs text-[#667085]">per {product.unit.toLowerCase()}</span>
            )}
            <span className="text-xs text-[#667085] ml-auto font-medium">GST Inclusive</span>
          </div>

          {product.description && (
            <p className="text-xs sm:text-sm text-[#10201F]/80 leading-relaxed line-clamp-3">{product.description}</p>
          )}

          <div className="pt-2 border-t border-[#E2DED5]">
            <div className="text-xs font-bold text-[#07543F] uppercase tracking-wider mb-1.5">Specifications</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
              {specs.map((s) => (
                <div key={s.key} className="flex justify-between py-1 border-b border-[#E2DED5]/60">
                  <span className="text-[#667085] truncate pr-2">{s.key}</span>
                  <span className="font-semibold text-[#10201F] text-right truncate">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center h-11 rounded-xl border border-[#E2DED5] bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-full flex items-center justify-center text-[#10201F] cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-9 text-center font-bold text-sm text-[#10201F]">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-full flex items-center justify-center text-[#10201F] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex-1 h-11 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!product.inStock ? (
                <span>Out of stock</span>
              ) : added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add To Cart {inr(product.price * quantity)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageParamsResolver({ params }: PageProps) {
  const unwrapped = use(params);
  return <ProductDetailContent id={unwrapped.id} />;
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <PageParamsResolver params={params} />
    </Suspense>
  );
}
