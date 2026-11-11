"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  User,
  Package,
  Heart,
  LogOut,
  CheckCircle2,
  MapPin,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  Trash2,
  ExternalLink,
  Clock,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useAuth, Order } from "@/lib/auth-context";
import { PRODUCTS_CATALOGUE, ProductItem } from "@/lib/products-data";

type AccountTab = "profile" | "orders" | "wishlist";

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get("tab") as AccountTab;

  const {
    user,
    isLoggedIn,
    logout,
    updateProfile,
    wishlist,
    removeFromWishlist,
    orders,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<AccountTab>(
    tabParam === "orders" || tabParam === "wishlist" ? tabParam : "profile"
  );

  // Profile Form State
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [company, setCompany] = useState(user?.company || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [state, setState] = useState(user?.address?.state || "");
  const [pincode, setPincode] = useState(user?.address?.pincode || "");

  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?redirect=/account");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (tabParam && ["profile", "orders", "wishlist"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setCompany(user.company || "");
      setStreet(user.address?.street || "");
      setCity(user.address?.city || "");
      setState(user.address?.state || "");
      setPincode(user.address?.pincode || "");
    }
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      address: {
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
      },
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Resolve wishlisted product objects
  const wishlistedProducts: ProductItem[] = wishlist
    .map((id) => PRODUCTS_CATALOGUE.find((p) => p.id === id))
    .filter((p): p is ProductItem => !!p);

  return (
    <div className="min-h-screen bg-[#FFFDEB] text-buraq-dark py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Heading as requested: "Your Account" */}
        <div className="space-y-2 border-b border-black/[0.08] pb-6">
          <div className="w-12 h-1 bg-buraq-primary rounded-full mb-3" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-buraq-dark tracking-tight">
            Your Account
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl">
            Manage your personal profile, track your active procurement orders, and access saved products in your wishlist.
          </p>
        </div>

        {/* Tab Navigation & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar / Tabs */}
          <div className="lg:col-span-4 space-y-4">
            {/* User Identity Card */}
            <div className="p-5 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-buraq-primary text-white text-xl font-black flex items-center justify-center shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || "B"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-black text-buraq-dark truncate">
                    {user?.name || "BURAQ Member"}
                  </h3>
                  <p className="text-xs text-neutral-500 truncate">
                    {user?.email || "contractor@buraq.in"}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-buraq-accent bg-buraq-accent/10 px-2 py-0.5 rounded-full">
                    {user?.role || "Commercial Buyer"}
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1.5 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("profile");
                    router.push("/account?tab=profile", { scroll: false });
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                    activeTab === "profile"
                      ? "bg-buraq-primary text-white shadow-sm"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      activeTab === "profile" ? "translate-x-0.5" : "opacity-40"
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("orders");
                    router.push("/account?tab=orders", { scroll: false });
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                    activeTab === "orders"
                      ? "bg-buraq-primary text-white shadow-sm"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4" />
                    <span>Orders</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-black ${
                      activeTab === "orders"
                        ? "bg-white/20 text-white"
                        : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {orders.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("wishlist");
                    router.push("/account?tab=wishlist", { scroll: false });
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                    activeTab === "wishlist"
                      ? "bg-buraq-primary text-white shadow-sm"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4" />
                    <span>Wishlist</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-black ${
                      activeTab === "wishlist"
                        ? "bg-white/20 text-white"
                        : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {wishlistedProducts.length}
                  </span>
                </button>
              </nav>

              {/* Sign Out */}
              <div className="pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    router.push("/login?from=/products&redirect=/products");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Area: Dynamic Tab Content */}
          <div className="lg:col-span-8">
            {/* TAB 1: MY PROFILE */}
            {activeTab === "profile" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-buraq-dark">
                      My Profile
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Update your account contact details, email, and delivery location.
                    </p>
                  </div>
                </div>

                {saveSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in duration-150">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Your profile information has been successfully updated!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-buraq-dark mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 bg-[#FBFBFA] text-sm focus:outline-none focus:border-buraq-primary focus:bg-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-buraq-dark mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 bg-[#FBFBFA] text-sm focus:outline-none focus:border-buraq-primary focus:bg-white font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-buraq-dark mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 bg-[#FBFBFA] text-sm focus:outline-none focus:border-buraq-primary focus:bg-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-buraq-dark mb-1.5">
                        Company / Contractor Firm
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Bengal Electricals & Infra"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 bg-[#FBFBFA] text-sm focus:outline-none focus:border-buraq-primary focus:bg-white font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 space-y-4">
                    <h3 className="text-sm font-black text-buraq-dark flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-buraq-primary" />
                      <span>Delivery &amp; Project Site Address</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-buraq-dark mb-1.5">
                        Street Address / Site Premises
                      </label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Plot, Building, Industrial Estate, Street"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-[#FBFBFA] text-sm focus:outline-none focus:border-buraq-primary focus:bg-white font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-buraq-dark mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Kolkata"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-[#FBFBFA] text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-buraq-dark mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="West Bengal"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-[#FBFBFA] text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-buraq-dark mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="700091"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-[#FBFBFA] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-buraq-primary text-white text-sm font-bold hover:bg-buraq-dark transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="p-6 rounded-3xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-buraq-dark">
                      Your Orders
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Track status, delivery details, and items from your procurement orders.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-buraq-sage/40 text-buraq-primary">
                    {orders.length} Total Orders
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="p-10 rounded-3xl bg-white border border-black/[0.08] text-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                      <Package className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black text-buraq-dark">
                      No Orders Yet
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
                      You haven&apos;t placed any orders yet. Click on any product and hit &quot;Buy Now&quot; to test order placement.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-buraq-primary text-white text-xs sm:text-sm font-bold hover:bg-buraq-dark transition-colors"
                    >
                      <span>Explore Products</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const getStatusBadge = (status: Order["status"]) => {
                        switch (status) {
                          case "Delivered":
                            return "bg-emerald-100 text-emerald-800 border-emerald-200";
                          case "Shipped":
                            return "bg-sky-100 text-sky-800 border-sky-200";
                          case "Confirmed":
                            return "bg-indigo-100 text-indigo-800 border-indigo-200";
                          default:
                            return "bg-amber-100 text-amber-800 border-amber-200";
                        }
                      };

                      return (
                        <div
                          key={order.id}
                          className="p-5 sm:p-6 rounded-3xl bg-white border border-black/[0.08] shadow-sm space-y-4"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3.5">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-sm text-buraq-dark">
                                  {order.id}
                                </span>
                                <span
                                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-400">
                                Placed on {order.date}
                              </p>
                            </div>

                            <div className="text-left sm:text-right">
                              <span className="text-xs text-neutral-500 block">
                                Total Amount
                              </span>
                              <span className="text-base sm:text-lg font-black text-buraq-dark">
                                ₹{order.totalAmount.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FBFBFA] border border-neutral-200/60"
                              >
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.productName}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-buraq-accent truncate block">
                                    {item.category}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-buraq-dark truncate">
                                    {item.productName}
                                  </h4>
                                  <span className="text-xs text-neutral-500">
                                    Qty: {item.quantity} &bull; ₹
                                    {item.price.toLocaleString("en-IN")} each
                                  </span>
                                </div>
                                <Link
                                  href={`/products/${item.productId}`}
                                  className="p-2 rounded-xl text-neutral-500 hover:text-buraq-primary hover:bg-neutral-100 transition-colors"
                                  title="View Product"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              </div>
                            ))}
                          </div>

                          {/* Shipping & Payment Footer */}
                          <div className="text-xs text-neutral-500 pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span>
                              Deliver to:{" "}
                              <strong className="text-buraq-dark">
                                {order.shippingAddress.fullName}
                              </strong>{" "}
                              ({order.shippingAddress.addressLine},{" "}
                              {order.shippingAddress.city})
                            </span>
                            <span className="text-neutral-400">
                              Method: {order.paymentMethod}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="p-6 rounded-3xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-buraq-dark">
                      Your Wishlist
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Saved products ready for enquiry or direct purchase.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                    {wishlistedProducts.length} Saved Items
                  </span>
                </div>

                {wishlistedProducts.length === 0 ? (
                  <div className="p-10 rounded-3xl bg-white border border-black/[0.08] text-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
                      <Heart className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black text-buraq-dark">
                      Your Wishlist is Empty
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
                      You haven&apos;t added any items to your wishlist yet. Click the heart icon on any product to save it here!
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-buraq-primary text-white text-xs sm:text-sm font-bold hover:bg-buraq-dark transition-colors"
                    >
                      <span>Discover Products</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistedProducts.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-3xl bg-white border border-black/[0.08] shadow-sm flex flex-col justify-between space-y-3 relative group"
                      >
                        <div className="flex gap-3.5">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-buraq-accent truncate block">
                              {item.categoryName}
                            </span>
                            <h4 className="text-sm font-bold text-buraq-dark line-clamp-2 leading-snug">
                              {item.name}
                            </h4>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-base font-black text-buraq-dark">
                                ₹{item.price.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs text-neutral-400 line-through">
                                ₹{item.mrp.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                          <Link
                            href={`/products/${item.id}`}
                            className="flex-1 py-2 px-3 rounded-xl bg-buraq-primary text-white text-xs font-bold text-center hover:bg-buraq-dark transition-colors shadow-2xs"
                          >
                            Buy Now
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFDEB] flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-buraq-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-neutral-500">Loading Account...</p>
          </div>
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}

