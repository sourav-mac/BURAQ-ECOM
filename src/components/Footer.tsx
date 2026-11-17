import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-[#071F1B] border-t border-[#0A2E28] text-white/70 pt-12 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white/95 px-3 py-1.5 rounded-xl">
              <Image
                src="/images/buraq-logo.png"
                alt="BURAQ ENTERPRISE"
                width={200}
                height={60}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Eastern India&apos;s leading supplier of energy-efficient commercial lighting, industrial heavy-duty power cables, switchgear protection, and electrical infrastructure systems.
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
