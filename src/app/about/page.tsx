import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  MapPin,
  Quote,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import { LocationsMap } from "@/components/about/LocationsMap";
import { StickyNote } from "@/components/shared/StickyNote";

export const metadata: Metadata = {
  title: {
    absolute: "About BURAQ Enterprise | Industrial Sourcing & Supply in West Bengal",
  },
  description:
    "About BURAQ Enterprise: B2B supplier of commercial LED lighting, solar components, and electrical products based at Poddar Court, Kolkata and Murshidabad.",
  alternates: { canonical: "https://buraq.in/about" },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://buraq.in/about#webpage",
      url: "https://buraq.in/about",
      name: "About BURAQ Enterprise | Industrial Sourcing & Supply in West Bengal",
      description:
        "About BURAQ Enterprise: B2B supplier of commercial LED lighting, solar components, and electrical products based at Poddar Court, Kolkata and Murshidabad.",
      isPartOf: {
        "@id": "https://buraq.in/#website",
      },
      about: {
        "@id": "https://buraq.in/#organization",
      },
      mainEntity: {
        "@id": "https://buraq.in/#organization",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://buraq.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: "https://buraq.in/about",
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {/* 1. Main Narrative Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-24 bg-gradient-to-b from-[#FFFDEB] via-[#FAF8F2] to-[#F7F4EE]">
        {/* Background Layer: Blended Industrial Operations Image */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-full lg:w-[62%] pointer-events-none z-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.2) 22%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,1) 80%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,1) 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.2) 22%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,1) 80%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,1) 75%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src="/images/about.png"
            alt="BURAQ Industrial Sourcing Operations and Technical Support in Kolkata"
            width={1400}
            height={900}
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FFFDEB] via-[#FFFDEB]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7F4EE] via-[#F7F4EE]/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-xl space-y-5 lg:space-y-6 pt-2 sm:pt-4 lg:pt-2">
            {/* Top Accent Line */}
            <div className="w-12 h-1 bg-buraq-primary rounded-full mb-1" />

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-buraq-dark tracking-tight leading-tight">
                About BURAQ Enterprise
              </h1>
              <p className="text-lg sm:text-xl font-bold text-buraq-primary mt-1">
                Industrial Sourcing, Commercial Supply &amp; Technical Support in West Bengal
              </p>
            </div>

            <div className="space-y-3.5 text-base sm:text-lg text-buraq-muted leading-relaxed">
              <p>
                BURAQ ENTERPRISE showcases lighting solutions, solar components, and electrical products to support commercial facilities, industrial units, and project contractors, alongside secondary technical manpower support.
              </p>
              <p>
                Operating on an offline B2B quotation and delivery model from Kolkata&apos;s primary commercial corridors (Poddar Court and Ezra Street wholesale hubs), we fulfill project bills of quantities (BOQs) with verified product specifications, official GST billing, and staged site dispatch.
              </p>
              <p>
                Our focus is straightforward — understand your requirement, deliver dependable product specifications on time, and build lasting working relationships based on trust.
              </p>
            </div>

            {/* Corporate Profile Specifications (Side-by-Side Horizontal Row on Mobile & Desktop) */}
            <div className="pt-5 mt-3 border-t border-buraq-border/80 flex flex-wrap items-center gap-3 sm:gap-6">
              <div>
                <span className="block text-[9.5px] sm:text-[11px] font-bold text-buraq-primary uppercase tracking-wider mb-0.5 leading-tight">
                  Established
                </span>
                <span className="text-[13px] sm:text-lg font-black text-buraq-dark leading-tight">
                  2025
                </span>
              </div>

              <div className="w-px h-7 sm:h-8 bg-buraq-border/80 flex-shrink-0" />

              <div>
                <span className="block text-[9.5px] sm:text-[11px] font-bold text-buraq-primary uppercase tracking-wider mb-0.5 leading-tight">
                  Enterprise Type
                </span>
                <span className="text-[12px] sm:text-lg font-black text-buraq-dark leading-tight whitespace-nowrap">
                  Micro Enterprise
                </span>
              </div>

              <div className="w-px h-7 sm:h-8 bg-buraq-border/80 flex-shrink-0" />

              <div>
                <span className="block text-[9.5px] sm:text-[11px] font-bold text-buraq-primary uppercase tracking-wider mb-0.5 leading-tight">
                  Structure
                </span>
                <span className="text-[12px] sm:text-lg font-black text-buraq-dark leading-tight whitespace-nowrap">
                  Proprietorship
                </span>
              </div>

              <div className="w-px h-7 sm:h-8 bg-buraq-border/80 flex-shrink-0" />

              <div>
                <span className="block text-[9.5px] sm:text-[11px] font-bold text-buraq-primary uppercase tracking-wider mb-0.5 leading-tight">
                  UDYAM Reg.
                </span>
                <span className="text-[11px] sm:text-sm font-black text-buraq-dark leading-tight whitespace-nowrap">
                  UDYAM-WB-13-0109935
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Leadership & Founder's Vision - Ultra-Smooth Blended Greenish Aurora Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 bg-[radial-gradient(ellipse_95%_75%_at_50%_50%,rgba(215,238,225,0.7)_0%,rgba(235,247,240,0.4)_50%,#F7F4EE_100%)]">
        {/* Organic Greenish Ambient Clouds with Progressive Linear Mask */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.15) 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.15) 90%, transparent 100%)",
          }}
        >
          {/* Cloud 1: Behind Founder Photo & Top Left */}
          <div className="absolute top-0 -left-10 w-[600px] sm:w-[700px] h-[480px] bg-gradient-to-br from-buraq-primary/24 via-[#2EA879]/18 to-[#A7D7C5]/20 rounded-full blur-[140px] -rotate-12 opacity-85" />
          
          {/* Cloud 2: Behind Philosophy & Vision Text (Center Right) */}
          <div className="absolute top-1/4 -right-10 w-[650px] sm:w-[760px] h-[420px] bg-gradient-to-tl from-[#1B5E48]/22 via-[#48B88B]/18 to-[#8FE3C2]/16 rounded-full blur-[135px] rotate-12 opacity-80" />
          
          {/* Cloud 3: Bottom Left / Center Drift */}
          <div className="absolute bottom-0 left-1/4 w-[560px] h-[340px] bg-gradient-to-tr from-[#0F4A38]/18 via-[#3BB27F]/16 to-transparent rounded-full blur-[125px] opacity-75" />
          
          {/* Cloud 4: Upper Center Accent Nebula */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[460px] h-[300px] bg-gradient-to-b from-[#207558]/16 via-[#5ECDA4]/14 to-transparent rounded-full blur-[120px] opacity-70" />
          
          {/* Cloud 5: Bottom Right Drift */}
          <div className="absolute bottom-4 -right-4 w-[480px] h-[320px] bg-gradient-to-l from-buraq-primary/16 via-[#52B788]/14 to-transparent rounded-full blur-[120px] opacity-70" />

          {/* Deep Progressive Top & Bottom Feathers into #F7F4EE */}
          <div className="absolute top-0 left-0 right-0 h-40 sm:h-52 bg-gradient-to-b from-[#F7F4EE] via-[#F7F4EE]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 bg-gradient-to-t from-[#F7F4EE] via-[#F7F4EE]/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Founder Photo & Identity */}
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-3.5">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-md flex items-center justify-center">
                  <Image
                    src="/images/founder.webp"
                    alt="Tahena Najneen Ahmed - Founder & Proprietor, BURAQ Enterprise"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-bold text-buraq-dark leading-snug">
                    Tahena Najneen Ahmed
                  </h4>
                  <p className="text-xs sm:text-[13px] font-semibold text-buraq-primary tracking-wide">
                    Founder &amp; Proprietor, BURAQ Enterprise
                  </p>
                </div>
              </div>

              {/* Right Column: Leadership Philosophy & Qualifications */}
              <div className="md:col-span-8 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-buraq-primary uppercase tracking-widest">
                    Leadership Philosophy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-buraq-dark tracking-tight leading-tight">
                    A Business Built Around Trust &amp; Service
                  </h3>
                </div>

                <div className="flex items-start gap-3.5">
                  <Quote className="w-7 h-7 text-buraq-primary/80 flex-shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg lg:text-xl text-buraq-dark font-medium italic leading-relaxed">
                    &ldquo;Our goal is simple — to understand what our clients need, deliver it properly, and be someone they can rely on when they need us.&rdquo;
                  </p>
                </div>

                {/* Horizontal Balanced Qualifications Grid */}
                <div className="pt-5 border-t border-buraq-border/80">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-buraq-primary uppercase tracking-wider">
                        B.Tech
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-buraq-dark leading-snug">
                        IMPS College of Engineering &amp; Technology
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-buraq-primary uppercase tracking-wider">
                        M.Tech
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-buraq-dark leading-snug">
                        Dumkal Institute of Engineering &amp; Technology
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Locations - 2 Columns with Blurred Background Image */}
      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F2] to-[#FAF8F0]">
        {/* Background Layer: Blurred Corporate Infrastructure Backdrop */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-full lg:w-[65%] pointer-events-none z-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.7) 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.9) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.7) 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.9) 85%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src="/images/location.webp"
            alt="BURAQ Operational Hubs and Locations"
            width={1400}
            height={900}
            className="w-full h-full object-cover object-bottom opacity-40"
          />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F7F4EE] via-[#F7F4EE]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F0] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-black tracking-tight leading-tight">
              Our Locations
            </h2>
          </div>

          {/* 2 Columns: 2/3 Locations Info Stacked + 1/3 West Bengal Map (Rule of Thirds) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: 2/3 Width (8 cols) — Stacked Location Details */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-7">
              {/* Kolkata Office */}
              <div className="space-y-2.5">
                <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  Kolkata Office
                </h3>

                <div>
                  <a
                    href="https://maps.app.goo.gl/TvcqaEw6sUdEQc7U6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2.5 text-base sm:text-lg font-black text-black hover:text-buraq-primary transition-colors group cursor-pointer"
                    title="Open Kolkata Office in Google Maps"
                  >
                    <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-buraq-primary transition-colors">
                      Poddar Court, Gate No. 3, 3rd Floor, Kolkata
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-black opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
                  </a>
                </div>

                <p className="text-sm sm:text-base text-black font-semibold leading-relaxed pt-0.5">
                  Our central hub for enterprise accounts, rapid workforce deployment, project consultations, and daily client communications.
                </p>
              </div>

              {/* Registered Head Office */}
              <div className="space-y-2.5 pt-5 border-t border-black/15">
                <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  Registered Office
                </h3>

                <div>
                  <a
                    href="https://maps.app.goo.gl/tEAEmQEPYrsJvfjN7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2.5 text-base sm:text-lg font-black text-black hover:text-buraq-primary transition-colors group cursor-pointer"
                    title="Open Domkal Office in Google Maps"
                  >
                    <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-buraq-primary transition-colors">
                      Domkal, Murshidabad, West Bengal – 742303
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-black opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
                  </a>
                </div>

                <p className="text-sm sm:text-base text-black font-semibold leading-relaxed pt-0.5">
                  Our registered headquarters handles corporate administration, statutory governance, regional talent sourcing, and grassroots technical network relationships.
                </p>
              </div>

              {/* Verified Contact Details for Enquiries */}
              <div className="pt-4 border-t border-black/15 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-semibold text-black">
                <span className="text-buraq-primary font-bold">Official Direct Enquiry Desk:</span>
                <a
                  href="mailto:buraq.ep@gmail.com"
                  className="underline hover:text-buraq-primary transition-colors"
                >
                  buraq.ep@gmail.com
                </a>
                <span className="text-black/40 hidden sm:inline">•</span>
                <span className="text-buraq-muted">Offline B2B Quotations &amp; Material Schedules</span>
              </div>

              {/* Authentic Regional Logistics Sticky Note */}
              <div className="pt-4 sm:pt-6">
                <StickyNote
                  tag="STATEWIDE DISPATCH"
                  title="Regional Mobilization Reach"
                  text="Dual hubs in Kolkata and Murshidabad allow rapid product coordination, material dispatch, and technical workforce deployment across Kolkata, Howrah, Hooghly, Durgapur, Haldia, and neighboring industrial corridors."
                  color="yellow"
                  rotate="slight-left"
                  author="Logistics & Dispatch Desk"
                />
              </div>
            </div>

            {/* Right Column: 1/3 Width (4 cols) — West Bengal Modern Map */}
            <div className="lg:col-span-4 flex justify-center items-start pt-1 sm:pt-2">
              <LocationsMap />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA Banner (Rule of Thirds 2/3 & 1/3) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F0] via-[#FAF8F2] to-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10 bg-buraq-dark">
            {/* Immersive Industrial Photography Layer (Slidely visible) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-25">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80"
                alt="BURAQ Industrial Facility and Technical Support"
                width={1600}
                height={900}
                className="w-full h-full object-cover object-[50%_33%]"
              />
            </div>

            {/* Deep Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-buraq-dark/95 via-buraq-dark/85 to-buraq-dark/90 z-0 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                  Have a Requirement? Let&apos;s Talk.
                </h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Whether you need lighting solutions, solar components, electrical products, or technical manpower, we&apos;re here to understand your requirement and provide dependable supply.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3.5">
                <Link
                  href="/products/lighting"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-buraq-primary text-white font-bold text-sm sm:text-base shadow-lg hover:bg-buraq-primary-hover transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <LayoutGrid className="w-4 h-4 text-buraq-sage" />
                  <span>Explore Products</span>
                </Link>
                <Link
                  href="/why-buraq"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Why BURAQ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
