import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import {
  Layers,
  ShieldCheck,
  Building2,
  FileText,
  Truck,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Why Choose BURAQ Enterprise | B2B Industrial Supply Partner West Bengal",
  },
  description:
    "Why businesses and contractors partner with BURAQ Enterprise: verifiable technical data, structured offline BOQ sourcing, and reliable delivery across West Bengal.",
  alternates: { canonical: "https://buraq.in/why-buraq" },
};

const differentiators = [
  {
    num: "01",
    title: "Factual Specifications & Transparent Data",
    desc: "We provide clear, verifiable technical specifications for lighting luminaires, solar PV components, and electrical switchgear without speculative ratings or unverified claims.",
  },
  {
    num: "02",
    title: "Structured Offline Sourcing & BOQ Supply",
    desc: "Direct coordination for commercial and contractor bills of quantities (BOQ), ensuring authentic materials, batch consistency, and staged delivery to your job site.",
  },
  {
    num: "03",
    title: "Secondary Technical Workforce Availability",
    desc: "In addition to product supply, BURAQ maintains a dedicated roster of engineers, technical workers, and helpers available for plant turnarounds and site operations.",
  },
];

const atAGlanceFacts = [
  { label: "Legal Trade Name", value: "BURAQ ENTERPRISE" },
  { label: "Enterprise Type", value: "Proprietorship &bull; Micro Enterprise" },
  { label: "UDYAM Registration", value: "UDYAM-WB-13-0109935" },
  { label: "Founder & Leadership", value: "Tahena Najneen Ahmed (B.Tech, M.Tech)" },
  { label: "Kolkata Sourcing Hub", value: "Poddar Court, Gate No. 3, 3rd Floor, Kolkata – 700001" },
  { label: "Registered Admin Office", value: "Joyrampur, Domkal, Murshidabad – 742303, West Bengal" },
  { label: "Primary Business", value: "B2B Supply: Commercial LED Lighting, Solar PV & BOS, Industrial Cables & Switchgear" },
  { label: "Secondary Division", value: "Technical Manpower Supply (Skilled Technicians & Industrial Helpers)" },
  { label: "Procurement Model", value: "Offline B2B Quotation against Bill of Quantities (No online shopping cart)" },
  { label: "Delivery Territory", value: "Kolkata, Howrah, Hooghly, Durgapur, Haldia, Asansol & all West Bengal" },
  { label: "Quality Standards", value: "IS 7098 (Cables), IEC 61215/61730 (Solar), LM-79/LM-80 (Lighting)" },
];

const whyBuraqAeoSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://buraq.in/why-buraq#webpage",
      url: "https://buraq.in/why-buraq",
      name: "Why Choose BURAQ Enterprise | B2B Industrial Supply Partner West Bengal",
      description:
        "Factual verification, offline BOQ sourcing reliability, and authorized brand distribution for industrial and commercial projects across West Bengal.",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          "[data-aeo='speakable']",
          ".aeo-direct-answer",
        ],
      },
      isPartOf: {
        "@id": "https://buraq.in/#website",
      },
      about: {
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
          name: "Why BURAQ",
          item: "https://buraq.in/why-buraq",
        },
      ],
    },
  ],
};

export default function WhyBuraqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whyBuraqAeoSchemas) }}
      />
      <PageHeader
        title="Why Choose BURAQ Enterprise"
        description="Dependable B2B product sourcing for commercial and industrial projects, built on verified technical data, offline BOQ fulfillment, and dedicated workforce availability in West Bengal."
        breadcrumbs={[{ label: "Why BURAQ", href: "/why-buraq" }]}
      />

      {/* Main Value Proposition with Blended Background Image */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#F7F4EE] via-[#FAF7EE] to-[#EFECE3]">
        {/* Background Layer: Blended Industrial Operations Backdrop */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-full lg:w-[62%] pointer-events-none z-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,1) 80%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.9) 35%, rgba(0,0,1) 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 6%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.85) 50%, rgba(0,0,1) 80%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0.9) 35%, rgba(0,0,1) 75%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src="/images/why-buraq.jpg"
            alt="BURAQ Solar Energy, Wind & Technical Operations"
            width={1400}
            height={900}
            sizes="(max-width: 1024px) 100vw, 62vw"
            priority
            className="w-full h-full object-cover object-[70%_33%] opacity-90"
          />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F7F4EE] via-[#F7F4EE]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EFECE3] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-xl space-y-6" data-aeo="speakable">
            <div>
              <div className="w-12 h-1 bg-buraq-primary rounded-full mb-4" />
              <h2 className="text-3xl sm:text-4xl font-black text-buraq-dark tracking-tight leading-tight">
                Product Sourcing You Can Depend On Every Day
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-buraq-border/80 text-xs sm:text-sm font-semibold text-buraq-dark leading-relaxed aeo-direct-answer">
              <span className="font-bold text-buraq-primary mr-1">Direct Answer:</span>
              BURAQ Enterprise eliminates procurement friction for electrical, solar, and lighting contractors in West Bengal through transparent offline pricing, verified manufacturer test certificates, and staged job-site deliveries from our Poddar Court commercial hub.
            </div>

            <p className="text-sm sm:text-base text-buraq-muted leading-relaxed">
              Industrial facilities and contractors need supply partners who respond promptly, verify technical compatibility, and deliver materials on schedule without commercial friction.
            </p>

            <p className="text-sm sm:text-base text-buraq-muted leading-relaxed">
              BURAQ combines transparent product supply across lighting, solar, and electrical components with disciplined technical manpower coordination. Learn more about our company profile and regional presence on the{" "}
              <Link
                href="/about"
                className="font-bold text-buraq-primary hover:text-buraq-primary-hover transition-colors"
              >
                About BURAQ
              </Link>{" "}
              page.
            </p>

            <div className="pt-2">
              <Link
                href="/products/lighting"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-buraq-primary text-white font-bold text-sm sm:text-base shadow-md hover:bg-buraq-primary-hover transition-all duration-200 group"
              >
                <Layers className="w-4.5 h-4.5 text-buraq-sage" />
                <span>Explore Products</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Key Differentiators */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#EFECE3] via-[#E2EFE7] to-[#F7F4EE] z-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/3 right-1/4 w-[520px] h-[350px] bg-gradient-to-bl from-buraq-primary/20 via-[#25A170]/15 to-[#A7D7C5]/22 rounded-full blur-[100px] opacity-80" />
          <div className="absolute -bottom-10 left-10 w-[420px] h-[280px] bg-gradient-to-tr from-[#1C4D3D]/15 via-[#52B788]/18 to-transparent rounded-full blur-[90px] opacity-75" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#EFECE3] via-[#EFECE3]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7F4EE] via-[#F7F4EE]/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="w-12 h-1 bg-buraq-primary rounded-full mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-buraq-dark tracking-tight">
              What Sets BURAQ Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {differentiators.map((diff) => (
              <div
                key={diff.title}
                className="border-l-[3px] border-buraq-primary pl-5 sm:pl-6 flex flex-col space-y-2.5"
              >
                <h3 className="text-lg sm:text-xl font-bold text-buraq-dark leading-snug">
                  {diff.title}
                </h3>
                <p className="text-sm sm:text-base text-buraq-muted leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Regional Hub & Trade Integration */}
          <div className="mt-14 pt-10 border-t border-buraq-border/60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/70 p-6 sm:p-8 rounded-2xl border border-buraq-border/80">
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-buraq-primary uppercase tracking-wider">
                  Regional Sourcing Integration
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-buraq-dark">
                  Direct Trade Links with Poddar Court &amp; Ezra Street
                </h3>
                <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
                  Operating directly out of Poddar Court (Kolkata&apos;s principal electrical trade hub) and networked with Ezra Street wholesale lighting distributors, BURAQ enables contractors to eliminate supply chain delays, ensure authentic batch warranties, and secure wholesale project pricing.
                </p>
              </div>
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-buraq-accent uppercase tracking-wider">
                  Logistics &amp; Delivery
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-buraq-dark">
                  Staged Job-Site Fulfillment Across West Bengal
                </h3>
                <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
                  Whether your installation is a commercial office fitout in Sector V Salt Lake, an industrial factory in Howrah, or a rooftop solar plant in Murshidabad, our logistics coordination ensures materials arrive synchronized with your contractor milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BURAQ At-A-Glance Entity Verification Section for Answer Engines & Buyers */}
      <section className="py-14 sm:py-20 bg-white border-t border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-buraq-primary/10 text-buraq-primary text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Entity Verification &amp; Overview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-buraq-dark tracking-tight">
              BURAQ Enterprise At-a-Glance
            </h2>
            <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
              Standard corporate and operational data structured for verification, compliance checks, and AI answer engine validation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl border border-buraq-border/80 overflow-hidden shadow-card bg-[#FAF8F2]">
            <div className="bg-buraq-dark text-white px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-buraq-sage">
                Verified Corporate Fact Sheet
              </span>
              <span className="text-xs text-gray-400">
                Official UDYAM Micro Enterprise
              </span>
            </div>

            <div className="divide-y divide-buraq-border/60">
              {atAGlanceFacts.map((fact, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-12 px-6 py-4 items-center gap-2 hover:bg-white/60 transition-colors"
                >
                  <div className="sm:col-span-4 text-xs font-bold text-buraq-dark">
                    {fact.label}
                  </div>
                  <div
                    className="sm:col-span-8 text-xs sm:text-sm text-buraq-muted sm:text-buraq-dark leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: fact.value }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to discuss product specifications with BURAQ?"
        subtitle="Get in touch with us at buraq.ep@gmail.com for structured offline quotes and dependable delivery."
        buttonText="Contact BURAQ"
        buttonHref="/contact"
        secondaryButtonText="Explore Products"
        secondaryButtonHref="/products/lighting"
      />
    </>
  );
}
