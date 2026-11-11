"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Clock,
  Sparkles,
  Layers,
  FileText,
  X,
  CreditCard,
  Building,
  MapPin,
  Check,
} from "lucide-react";
import {
  PRODUCTS_CATALOGUE,
  getProductById,
  getRelatedProducts,
} from "@/lib/products-data";
import { useAuth } from "@/lib/auth-context";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function SingleProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const { isWishlisted, toggleWishlist, user, isLoggedIn, placeOrder } = useAuth();
  const wishlisted = isWishlisted(product.id);

  // If signed out, redirect immediately to the sign in page
  React.useEffect(() => {
    if (!isLoggedIn) {
      router.replace(
        `/login?redirect=${encodeURIComponent(`/products/${product.id}`)}&from=${encodeURIComponent("/products")}`
      );
    }
  }, [isLoggedIn, product.id, router]);

  const [quantity, setQuantity] = useState(1);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Buy Now form fields (pre-filled from user profile)
  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [addressLine, setAddressLine] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "Kolkata");
  const [state, setState] = useState(user?.address?.state || "West Bengal");
  const [pincode, setPincode] = useState(user?.address?.pincode || "700091");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const related = getRelatedProducts(product.id, product.category, 4);

  const handleWishlistToggle = () => {
    if (!isLoggedIn) {
      router.push(
        `/login?redirect=${encodeURIComponent(`/products/${product.id}`)}`
      );
      return;
    }
    const isAdded = toggleWishlist(product.id);
    setToastMessage(
      isAdded ? "Added to your Wishlist!" : "Removed from your Wishlist"
    );
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleOpenBuyModal = () => {
    if (!isLoggedIn) {
      router.push(
        `/login?redirect=${encodeURIComponent(`/products/${product.id}`)}`
      );
      return;
    }
    if (user) {
      if (!fullName) setFullName(user.name);
      if (!phone) setPhone(user.phone || "");
      if (!addressLine) setAddressLine(user.address?.street || "");
      if (!city) setCity(user.address?.city || "Kolkata");
      if (!state) setState(user.address?.state || "West Bengal");
      if (!pincode) setPincode(user.address?.pincode || "700091");
    }
    setOrderPlacedId(null);
    setIsBuyModalOpen(true);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !addressLine.trim()) {
      return;
    }

    setIsSubmittingOrder(true);
    setTimeout(() => {
      setIsSubmittingOrder(false);
      const totalAmount = product.price * quantity;
      const order = placeOrder({
        items: [
          {
            productId: product.id,
            productName: product.name,
            category: product.category,
            image: product.image,
            price: product.price,
            quantity: quantity,
          },
        ],
        totalAmount,
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          addressLine: addressLine.trim(),
          city: city.trim() || "Kolkata",
          state: state.trim() || "West Bengal",
          pincode: pincode.trim() || "700091",
        },
        paymentMethod,
      });

      setOrderPlacedId(order.id);
    }, 600);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-[#FFFDEB] text-buraq-dark">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[999999] bg-buraq-dark text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-200 border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Bar */}
      <div className="border-b border-black/[0.06] bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-500 overflow-x-auto whitespace-nowrap">
            <Link
              href="/"
              className="hover:text-buraq-primary transition-colors flex items-center gap-1"
            >
              <span>Home</span>
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-buraq-primary transition-colors"
            >
              <span>Products</span>
            </Link>
            <span>/</span>
            <Link
              href={`/products?sector=${product.category}`}
              className="hover:text-buraq-primary transition-colors uppercase tracking-wider text-[11px]"
            >
              <span>{product.categoryName}</span>
            </Link>
            <span>/</span>
            <span className="text-buraq-dark font-bold truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
        {/* Top Back Link */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-600 hover:text-buraq-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Products Catalogue</span>
          </Link>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Stage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl bg-white border border-black/[0.08] p-4 sm:p-6 shadow-sm overflow-hidden flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />

              {/* Floating Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  In Stock
                </span>
                {product.badge && (
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Wishlist Button on Image */}
              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-10 ${
                  wishlisted ? "text-rose-500" : "text-neutral-400 hover:text-rose-500"
                }`}
                title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wishlisted ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-white border border-black/[0.06] text-center space-y-1 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-buraq-primary mx-auto" />
                <p className="text-[11px] font-bold text-buraq-dark">100% Genuine</p>
                <p className="text-[9px] text-neutral-400">BURAQ Assured</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-black/[0.06] text-center space-y-1 shadow-2xs">
                <Truck className="w-5 h-5 text-buraq-primary mx-auto" />
                <p className="text-[11px] font-bold text-buraq-dark">Quick Dispatch</p>
                <p className="text-[9px] text-neutral-400">Within 24-48 hrs</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-black/[0.06] text-center space-y-1 shadow-2xs">
                <FileText className="w-5 h-5 text-buraq-primary mx-auto" />
                <p className="text-[11px] font-bold text-buraq-dark">GST Invoice</p>
                <p className="text-[9px] text-neutral-400">B2B Tax Credit</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header info */}
            <div className="space-y-2 border-b border-black/[0.08] pb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-buraq-accent bg-buraq-accent/10 px-2.5 py-0.5 rounded-md">
                  {product.categoryName}
                </span>
                <span className="text-[11px] font-bold text-neutral-500">
                  &bull; Brand: <strong className="text-buraq-dark">{product.brand || "BURAQ"}</strong>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-buraq-dark tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating Bar */}
              <div className="flex items-center gap-3 pt-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold leading-none shadow-2xs">
                  <span>{product.rating.toFixed(1)}</span>
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <span className="text-xs font-bold text-neutral-500">
                  {product.reviewsCount} customer reviews &amp; ratings
                </span>
                <span className="text-xs text-neutral-300">|</span>
                <span className="text-xs font-bold text-emerald-700">
                  Verified Contractor Choice
                </span>
              </div>
            </div>

            {/* Dynamic Price Display */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-buraq-dark tracking-tight">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm sm:text-base text-neutral-400 line-through font-medium">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {product.discountPercent}% OFF
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 border-t border-neutral-100 flex-wrap gap-2">
                <span>
                  Pricing per: <strong className="text-buraq-dark">{product.unit || "unit / piece"}</strong>
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Inclusive of all GST &amp; commercial taxes
                </span>
              </div>
            </div>

            {/* Brief Details */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400">
                Brief Details &amp; Overview
              </h3>
              <p className="text-sm sm:text-base text-buraq-dark/90 leading-relaxed">
                {product.description}
              </p>
              {product.shortDesc && (
                <p className="text-xs text-neutral-500 leading-normal italic">
                  Key summary: {product.shortDesc}
                </p>
              )}
            </div>

            {/* Highlights of the Product */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-buraq-primary" />
                <h3 className="text-sm font-black uppercase tracking-wide text-buraq-dark">
                  Product Highlights &amp; Specifications
                </h3>
              </div>

              {product.specifications && product.specifications.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.specifications.map((spec, i) => (
                    <li
                      key={i}
                      className="text-xs text-neutral-700 flex items-start gap-2 bg-[#FBFBFA] p-2.5 rounded-xl border border-neutral-200/70"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="leading-snug">{spec}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-neutral-500">
                  Engineered and inspected under verified BURAQ commercial supply standards.
                </p>
              )}

              {product.applications && product.applications.length > 0 && (
                <div className="pt-2 border-t border-neutral-100">
                  <span className="text-xs font-bold text-buraq-dark block mb-1.5">
                    Recommended Applications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.applications.map((app, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-buraq-sage/30 text-buraq-dark border border-buraq-primary/10"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action Buttons: Buy Now & Add to Wishlist */}
            <div className="space-y-4 pt-2">
              {/* Quantity row */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-buraq-dark">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3.5 py-1.5 text-sm font-bold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-black text-buraq-dark min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3.5 py-1.5 text-sm font-bold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-neutral-500">
                  Total: <strong className="text-buraq-dark">₹{totalPrice.toLocaleString("en-IN")}</strong>
                </span>
              </div>

              {/* Action Buttons: Buy Now and Add to Wishlist (Only shown when logged in) */}
              {!isLoggedIn ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-amber-900 leading-relaxed">
                    Please sign in to your verified account to buy this product or add it to your wishlist.
                  </p>
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/products/${product.id}`)}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-buraq-primary text-white font-bold text-xs sm:text-sm hover:bg-buraq-dark transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-buraq-sage" />
                    <span>Sign In to Buy / Wishlist</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Buy Now Button */}
                  <button
                    type="button"
                    onClick={handleOpenBuyModal}
                    className="w-full py-3.5 px-6 rounded-2xl bg-buraq-primary text-white font-extrabold text-sm sm:text-base shadow-md hover:bg-buraq-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5 text-buraq-sage" />
                    <span>Buy Now</span>
                  </button>

                  {/* Add to Wishlist Button */}
                  <button
                    type="button"
                    onClick={handleWishlistToggle}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base border-2 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      wishlisted
                        ? "bg-rose-50 border-rose-400 text-rose-600 hover:bg-rose-100"
                        : "bg-white border-neutral-300 text-buraq-dark hover:border-buraq-primary hover:text-buraq-primary"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlisted ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                    <span>{wishlisted ? "Added in Wishlist" : "Add to Wishlist"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar / Related Products Section */}
        {related.length > 0 && (
          <div className="pt-10 border-t border-black/[0.08] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-buraq-dark tracking-tight">
                  Similar &amp; Related Products
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Explore matching items in {product.categoryName}
                </p>
              </div>
              <Link
                href={`/products?sector=${product.category}`}
                className="text-xs sm:text-sm font-bold text-buraq-primary hover:underline"
              >
                View all in category &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Buy Now Checkout Modal */}
      {isBuyModalOpen && (
        <div
          onClick={() => setIsBuyModalOpen(false)}
          className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg bg-[#FFFDEB] text-buraq-dark rounded-[28px] p-6 sm:p-7 border border-black/[0.08] shadow-[0_25px_60px_-15px_rgba(16,32,31,0.4)] flex flex-col gap-4 animate-in zoom-in-95 duration-200 cursor-default max-h-[92vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsBuyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-buraq-dark/60 hover:text-buraq-dark hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {orderPlacedId ? (
              /* ORDER SUCCESS SCREEN */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-buraq-dark tracking-tight">
                  Order Placed Successfully!
                </h3>
                <p className="text-sm font-semibold text-buraq-primary bg-buraq-sage/40 py-1.5 px-3 rounded-full w-fit mx-auto">
                  Order ID: {orderPlacedId}
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for purchasing <strong>{product.name}</strong> ({quantity} {product.unit || "units"}). Your order is confirmed and will appear in your <strong>Orders</strong> page.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsBuyModalOpen(false);
                      router.push("/account?tab=orders");
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-buraq-primary text-white text-xs sm:text-sm font-bold hover:bg-buraq-dark transition-colors cursor-pointer"
                  >
                    View in Orders
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsBuyModalOpen(false);
                      router.push("/products");
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white border border-neutral-300 text-buraq-dark text-xs sm:text-sm font-bold hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              /* CHECKOUT FORM */
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div className="pr-8">
                  <h3 className="text-xl sm:text-2xl font-black text-buraq-dark tracking-tight">
                    Confirm Purchase
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Fast checkout with direct wholesale delivery
                  </p>
                </div>

                {/* Selected Item Summary */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase text-buraq-accent tracking-wider truncate">
                      {product.categoryName} &bull; {product.brand || "BURAQ"}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-buraq-dark truncate">
                      {product.name}
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="font-semibold text-neutral-500">
                        ₹{product.price.toLocaleString("en-IN")} &times; {quantity}
                      </span>
                      <span className="font-black text-buraq-dark text-sm">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-neutral-400">
                    Delivery Address
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-buraq-dark mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Recipient Name"
                        className="w-full px-3 py-2 rounded-xl border border-buraq-border bg-white text-xs sm:text-sm focus:outline-none focus:border-buraq-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-buraq-dark mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-xl border border-buraq-border bg-white text-xs sm:text-sm focus:outline-none focus:border-buraq-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-buraq-dark mb-1">
                      Street Address / Project Site *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="Premises, Street, Site Location"
                      className="w-full px-3 py-2 rounded-xl border border-buraq-border bg-white text-xs sm:text-sm focus:outline-none focus:border-buraq-primary"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-buraq-dark mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl border border-buraq-border bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-buraq-dark mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl border border-buraq-border bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-buraq-dark mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl border border-buraq-border bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2 pt-1 border-t border-neutral-200/80">
                  <div className="text-xs font-black uppercase tracking-wider text-neutral-400">
                    Payment Method
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Cash on Delivery",
                      "Offline Bank Transfer (NEFT)",
                      "B2B Credit Invoice",
                    ].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                          paymentMethod === method
                            ? "bg-buraq-sage/40 border-buraq-primary text-buraq-primary shadow-2xs"
                            : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        <span>{method}</span>
                        {paymentMethod === method && (
                          <Check className="w-3.5 h-3.5 text-buraq-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingOrder}
                    className="w-full py-3.5 rounded-2xl bg-buraq-primary text-white font-extrabold text-sm sm:text-base shadow-md hover:bg-buraq-dark disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5 text-buraq-sage" />
                    <span>
                      {isSubmittingOrder
                        ? "Confirming Order..."
                        : `Confirm & Place Order (₹${totalPrice.toLocaleString("en-IN")})`}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

