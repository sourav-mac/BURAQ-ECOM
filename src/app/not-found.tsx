import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, FileQuestion, Lightbulb, Sun, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | BURAQ ENTERPRISE",
  description:
    "The page you are looking for does not exist or has been removed. Explore BURAQ Enterprise lighting solutions, solar components, and electrical products.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDEB] via-[#FAF8F2] to-white">
      <div className="max-w-xl w-full text-center space-y-8 p-8 sm:p-12 rounded-3xl bg-white border border-buraq-border shadow-card">
        <div className="w-20 h-20 rounded-2xl bg-buraq-primary/10 text-buraq-primary flex items-center justify-center mx-auto">
          <FileQuestion className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-buraq-primary bg-buraq-primary/10 px-3.5 py-1 rounded-full">
            404 — Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-buraq-dark tracking-tight">
            Looking for BURAQ Products or Services?
          </h1>
          <p className="text-sm sm:text-base text-buraq-muted leading-relaxed max-w-md mx-auto">
            The page you requested is not available. BURAQ Enterprise supplies lighting solutions, solar components, and electrical products alongside technical manpower support.
          </p>
        </div>

        {/* Quick Links to Core Product Verticals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
          <Link
            href="/products/lighting"
            className="p-3.5 rounded-2xl bg-buraq-bg/60 border border-buraq-border/60 hover:border-buraq-primary hover:bg-white transition-all group flex flex-col justify-between"
          >
            <Lightbulb className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-buraq-dark group-hover:text-buraq-primary transition-colors">
                Lighting Products
              </div>
              <div className="text-[11px] text-buraq-muted">LED & Commercial</div>
            </div>
          </Link>

          <Link
            href="/products/solar"
            className="p-3.5 rounded-2xl bg-buraq-bg/60 border border-buraq-border/60 hover:border-buraq-primary hover:bg-white transition-all group flex flex-col justify-between"
          >
            <Sun className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-buraq-dark group-hover:text-buraq-primary transition-colors">
                Solar Components
              </div>
              <div className="text-[11px] text-buraq-muted">PV Modules & BOS</div>
            </div>
          </Link>

          <Link
            href="/products/electrical"
            className="p-3.5 rounded-2xl bg-buraq-bg/60 border border-buraq-border/60 hover:border-buraq-primary hover:bg-white transition-all group flex flex-col justify-between"
          >
            <Zap className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-buraq-dark group-hover:text-buraq-primary transition-colors">
                Electrical Products
              </div>
              <div className="text-[11px] text-buraq-muted">Cables & Switchgear</div>
            </div>
          </Link>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-buraq-primary text-white font-bold text-sm shadow-md hover:bg-buraq-dark transition-all"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-buraq-dark border border-buraq-border font-bold text-sm hover:border-buraq-primary hover:text-buraq-primary transition-all"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
