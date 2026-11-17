import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Truck, Headphones, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#071513] border-t border-[#E2DED5] text-[#10201F]/70 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Value Prop Icons Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#E2DED5]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F2F7F4] border border-[#E2DED5] flex items-center justify-center text-[#D96B1F]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#10201F] uppercase tracking-wider">Fast Dispatch</h4>
              <p className="text-[11px] text-[#10201F]/50">Same day warehouse dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F2F7F4] border border-[#E2DED5] flex items-center justify-center text-[#0A7255]">
              <ShieldCheck className="w-5 h-5 text-[#0A7255]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#10201F] uppercase tracking-wider">BIS Certified</h4>
              <p className="text-[11px] text-[#10201F]/50">100% Genuine tested gear</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F2F7F4] border border-[#E2DED5] flex items-center justify-center text-[#D96B1F]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#10201F] uppercase tracking-wider">Warranty Backed</h4>
              <p className="text-[11px] text-[#10201F]/50">Up to 25 yrs panel & driver guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F2F7F4] border border-[#E2DED5] flex items-center justify-center text-[#07543F]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#10201F] uppercase tracking-wider">Engineering Support</h4>
              <p className="text-[11px] text-[#10201F]/50">Direct technical sizing assistance</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D96B1F] to-[#BE5A16] flex items-center justify-center text-[#10201F]">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-lg font-black tracking-wider text-[#10201F]">
                BURAQ ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-[#10201F]/60 leading-relaxed max-w-sm">
              Eastern India&apos;s leading supplier of energy-efficient commercial lighting, industrial heavy-duty power cables, switchgear protection, and turnkey solar energy systems.
            </p>
            <div className="text-[11px] text-[#10201F]/40 font-mono">
              Registered Office: Kolkata, West Bengal • GSTIN: 19AAECB1234F1Z5
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#10201F] uppercase tracking-wider mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/category/lighting" className="hover:text-[#0A7255] transition-colors">Lighting Fixtures</Link></li>
              <li><Link href="/category/electrical" className="hover:text-[#0A7255] transition-colors">Cables & Switchgear</Link></li>
              <li><Link href="/category/solar" className="hover:text-[#0A7255] transition-colors">Solar PV & Inverters</Link></li>
              <li><Link href="/products" className="hover:text-[#0A7255] transition-colors">Complete Catalog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#10201F] uppercase tracking-wider mb-3">Customer Service</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/cart" className="hover:text-[#0A7255] transition-colors">My Cart & Orders</Link></li>
              <li><Link href="/signin" className="hover:text-[#0A7255] transition-colors">Sign In / Register</Link></li>
              <li><Link href="/checkout" className="hover:text-[#0A7255] transition-colors">Track Order Status</Link></li>
              <li><Link href="/contact" className="hover:text-[#0A7255] transition-colors">Help & Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#10201F] uppercase tracking-wider mb-3">Direct Contact</h4>
            <div className="space-y-2 text-xs text-[#10201F]/60">
              <p><strong className="text-[#10201F]">Phone:</strong> +91 98300 00000</p>
              <p><strong className="text-[#10201F]">Email:</strong> sales@buraqenterprise.com</p>
              <p><strong className="text-[#10201F]">Hours:</strong> Mon - Sat: 9:30 AM – 7:30 PM</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E2DED5] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#10201F]/40">
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
