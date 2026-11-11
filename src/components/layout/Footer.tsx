"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY_INFO } from "@/lib/constants";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on authentication pages so auth box fills single screen
  if (pathname === "/login" || pathname === "/auth") {
    return null;
  }
  return (
    <footer className="bg-buraq-dark text-white pt-16 pb-8 border-t border-buraq-dark-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center bg-[#FFFDEB] px-5 py-3 rounded-2xl shadow-sm">
              <Image
                src="/images/buraq-logo.png"
                alt="BURAQ ENTERPRISE Logo"
                width={280}
                height={90}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              BURAQ ENTERPRISE showcases lighting solutions, solar components, and electrical products for business and project requirements, alongside secondary technical manpower support.
            </p>
          </div>

          {/* Col 2: Products & Supply */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-buraq-sage mb-4">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="text-white font-bold hover:text-buraq-sage transition-colors flex items-center gap-1.5">
                  <span>All Products</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-buraq-primary/40 rounded-full text-buraq-sage">Store</span>
                </Link>
              </li>
              <li>
                <Link href="/products?sector=lighting" className="text-gray-300 hover:text-white transition-colors">
                  Lighting Products
                </Link>
              </li>
              <li>
                <Link href="/products?sector=solar" className="text-gray-300 hover:text-white transition-colors">
                  Solar Components
                </Link>
              </li>
              <li>
                <Link href="/products?sector=electrical" className="text-gray-300 hover:text-white transition-colors">
                  Electrical Products
                </Link>
              </li>
              <li className="pt-1 border-t border-white/10">
                <Link href="/services/manpower-supply" className="text-gray-300 hover:text-white transition-colors text-xs">
                  Secondary: Technical Manpower Supply
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-buraq-sage mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About BURAQ
                </Link>
              </li>
              <li>
                <Link href="/why-buraq" className="text-gray-300 hover:text-white transition-colors">
                  Why BURAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Primary Contact & Department Emails */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-buraq-sage mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <div className="text-[11px] text-gray-400 font-semibold uppercase">Sales &amp; Product Enquiries:</div>
                <a href={`mailto:${COMPANY_INFO.primaryEmail}`} className="hover:text-white transition-colors text-gray-300">
                  {COMPANY_INFO.primaryEmail}
                </a>
              </li>
              <li>
                <div className="text-[11px] text-gray-400 font-semibold uppercase">Phone / WhatsApp:</div>
                <span className="text-gray-300">
                  +91 XXXXX XXXXX
                </span>
              </li>
              <li>
                <div className="text-[11px] text-gray-400 font-semibold uppercase">General Enquiries:</div>
                <a href="mailto:info@buraq.in" className="hover:text-white transition-colors text-gray-300">
                  info@buraq.in
                </a>
              </li>
              <li>
                <div className="text-[11px] text-gray-400 font-semibold uppercase">Accounts &amp; Commercials:</div>
                <a href="mailto:account@buraq.in" className="hover:text-white transition-colors text-gray-300">
                  account@buraq.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-left">© 2025 BURAQ ENTERPRISE. All rights reserved.</p>
          <div className="flex items-center gap-4 text-center sm:text-right">
            <span>Lighting • Solar Components • Electrical Products • Technical Manpower</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
