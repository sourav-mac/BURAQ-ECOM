import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Truck, Headphones, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#071F1B] border-t border-[#0A2E28] text-white/70 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Value Prop Icons Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#0A2E28]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0A2E28] border border-[#164D43] flex items-center justify-center text-[#D96B1F]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Dispatch</h4>
              <p className="text-[11px] text-white/50">Same day warehouse dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0A2E28] border border-[#164D43] flex items-center justify-center text-[#0A7255]">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">BIS Certified</h4>
              <p className="text-[11px] text-white/50">100% Genuine tested gear</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0A2E28] border border-[#164D43] flex items-center justify-center text-[#D96B1F]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Warranty Backed</h4>
              <p className="text-[11px] text-white/50">Up to 25 yrs panel & driver guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0A2E28] border border-[#164D43] flex items-center justify-center text-emerald-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Engineering Support</h4>
              <p className="text-[11px] text-white/50">Direct technical sizing assistance</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D96B1F] flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                BURAQ ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Eastern India&apos;s leading supplier of energy-efficient commercial lighting, industrial heavy-duty power cables, switchgear protection, and turnkey solar energy systems.
            </p>
            <div className="text-[11px] text-white/40 font-mono">
              Registered Office: Kolkata, West Bengal • GSTIN: 19AAECB1234F1Z5
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/category/lighting" className="text-white/70">LIGHTING</Link></li>
              <li><Link href="/category/wire" className="text-white/70">WIRE</Link></li>
              <li><Link href="/category/fan" className="text-white/70">FAN</Link></li>
              <li><Link href="/category/mcb" className="text-white/70">MCB</Link></li>
              <li><Link href="/category/switch" className="text-white/70">SWITCH</Link></li>
              <li><Link href="/products" className="text-white/70">All 10 Categories →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Customer Service</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/cart" className="text-white/70">My Cart & Orders</Link></li>
              <li><Link href="/signin" className="text-white/70">Sign In / Register</Link></li>
              <li><Link href="/checkout" className="text-white/70">Track Order Status</Link></li>
              <li><Link href="/products" className="text-white/70">Help & Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Direct Contact</h4>
            <div className="space-y-2 text-xs text-white/60">
              <p><strong className="text-white">Phone:</strong> +91 98300 00000</p>
              <p><strong className="text-white">Email:</strong> sales@buraqenterprise.com</p>
              <p><strong className="text-white">Hours:</strong> Mon - Sat: 9:30 AM – 7:30 PM</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#0A2E28] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} BURAQ Enterprise. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
