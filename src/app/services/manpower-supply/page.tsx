import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";

export const metadata: Metadata = {
  title: {
    absolute: "Technical Manpower Supply Agency Kolkata & West Bengal | BURAQ",
  },
  description:
    "Skilled technical manpower supply agency in Kolkata & West Bengal. Deploying electrical technicians, plant maintenance crew, certified engineers, and helpers.",
  alternates: { canonical: "https://buraq.in/services/manpower-supply" },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Technical Manpower Supply",
  provider: {
    "@type": "LocalBusiness",
    name: "BURAQ ENTERPRISE",
    url: "https://buraq.in",
  },
  areaServed: [
    { "@type": "City", name: "Kolkata" },
    { "@type": "City", name: "Howrah" },
    { "@type": "AdministrativeArea", name: "West Bengal" },
  ],
  description:
    "Supplying certified electrical technicians, plant maintenance crew, helpers, and engineering personnel for manufacturing units, industrial sites, and commercial facilities in West Bengal.",
};

export default function ManpowerSupplyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <PageHeader
        title="Technical Manpower Supply Agency in Kolkata & West Bengal"
        description="Supplying skilled technical workers, industrial maintenance crew, helpers, and engineering personnel for manufacturing plants, projects, and facilities across West Bengal."
        breadcrumbs={[
          { label: "Services & Products", href: "/services" },
          { label: "Manpower Supply", href: "/services/manpower-supply" },
        ]}
      />

      {/* Main Overview Section with Blended Background Image */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F2] to-white">
        {/* Background Layer: Blended Technical Manpower Image */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-full lg:w-[62%] pointer-events-none z-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,1) 80%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,1) 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,1) 80%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,1) 75%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src="/images/manpower-supply-team.jpg"
            alt="BURAQ Technical Manpower Team and Industrial Workers in West Bengal"
            width={1400}
            height={900}
            priority
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F7F4EE] via-[#F7F4EE]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-buraq-dark tracking-tight leading-tight">
              Skilled Technical Workforce &amp; Helpers for Industrial Operations
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-buraq-muted leading-relaxed">
              <p>
                BURAQ provides reliable technical manpower solutions tailored for industrial facilities, manufacturing units, and commercial infrastructure across Kolkata, Howrah, Hooghly, Durgapur, Haldia, and West Bengal. We understand the necessity of having capable technical workers and disciplined helpers on-site.
              </p>
              <p>
                With a dedicated core strength of 20 engineers, around 40 technical workers, and 20 core operations employees, we assist businesses with project-based, seasonal, plant shutdown, or ongoing operational staffing.
              </p>
            </div>

            {/* Verified Team Figures */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-3">
              <div>
                <span className="text-xs font-bold text-buraq-primary uppercase tracking-wider block mb-1">Engineering Oversight</span>
                <div className="text-base sm:text-lg font-bold text-buraq-dark">20 Engineers</div>
              </div>
              <div>
                <span className="text-xs font-bold text-buraq-primary uppercase tracking-wider block mb-1">Field Workforce</span>
                <div className="text-base sm:text-lg font-bold text-buraq-dark">40 Workers</div>
              </div>
              <div>
                <span className="text-xs font-bold text-buraq-primary uppercase tracking-wider block mb-1">Core Operations</span>
                <div className="text-base sm:text-lg font-bold text-buraq-dark">20 Employees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workforce Capabilities - Left Aligned Side-by-Side with Greenish Ambient Glow */}
      <section className="relative overflow-hidden py-14 sm:py-18 bg-gradient-to-b from-white via-[#E4EFE8] to-[#F7F4EE]">
        {/* Soft Ambient Greenish Glow with Top/Bottom Edge Fades */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[520px] h-[300px] bg-gradient-to-tr from-buraq-primary/15 via-[#25A170]/12 to-emerald-200/15 rounded-full blur-[95px] opacity-75" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F7F4EE] to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-buraq-dark tracking-tight">
              Available Workforce Capabilities
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
              {/* Technical Workers */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xl sm:text-2xl font-black text-buraq-dark pb-2 border-b border-buraq-border">
                  Technical Workers
                </h4>
                <p className="text-sm sm:text-base font-bold text-buraq-dark leading-relaxed">
                  Technical Workers & Equipment Hands &nbsp;&bull;&nbsp; Plant & Machinery Helpers &nbsp;&bull;&nbsp; Electrical & Maintenance Technicians
                </p>
              </div>

              {/* Industrial Helpers */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xl sm:text-2xl font-black text-buraq-dark pb-2 border-b border-buraq-border">
                  Industrial Helpers
                </h4>
                <p className="text-sm sm:text-base font-bold text-buraq-dark leading-relaxed">
                  Maintenance & Mechanical Crew &nbsp;&bull;&nbsp; Site Operations Support Staff &nbsp;&bull;&nbsp; Assembly & Warehouse Handlers
                </p>
              </div>
            </div>

            {/* Industrial Corridors & Deployment Verticals */}
            <div className="pt-8 border-t border-buraq-border/60">
              <h4 className="text-lg sm:text-xl font-bold text-buraq-dark mb-4">
                Industrial Corridors &amp; Deployment Verticals
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-buraq-muted">
                <div className="p-4 rounded-xl bg-white border border-buraq-border/80 space-y-1.5">
                  <span className="font-bold text-buraq-dark block">Manufacturing &amp; Engineering</span>
                  <p>Assembly line assistance, machine maintenance, and workshop helper support across Howrah and Hooghly.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-buraq-border/80 space-y-1.5">
                  <span className="font-bold text-buraq-dark block">Energy &amp; Solar Installations</span>
                  <p>Mechanical mounting hands, DC cable pullers, and inverter helpers for rooftop &amp; ground solar projects.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-buraq-border/80 space-y-1.5">
                  <span className="font-bold text-buraq-dark block">Commercial Infrastructure</span>
                  <p>Facility maintenance, electrical wiring assistance, and warehouse logistics support in Kolkata and Durgapur.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need technical workers or helpers for your site?"
        subtitle="Contact BURAQ today via email at buraq.ep@gmail.com for structured manpower deployment."
        buttonText="Explore Services"
        buttonHref="/services"
      />
    </>
  );
}
