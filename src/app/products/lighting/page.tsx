import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ProductsFilterShowcase } from "@/components/products/ProductsFilterShowcase";
import { Lightbulb, CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Commercial LED Lighting Suppliers Kolkata | BURAQ Enterprise",
  },
  description:
    "B2B supplier of commercial LED panels, industrial high bay lights, outdoor floodlights, and streetlights in Kolkata & West Bengal. Sourcing for contractor BOQs.",
  alternates: { canonical: "https://buraq.in/products/lighting" },
};

const lightingFaqs = [
  {
    q: "What technical data sheets or photometric files (LM-79 / LM-80) can BURAQ supply for lighting tenders?",
    a: "For commercial fit-outs and institutional tenders, we provide manufacturer-backed LM-79 photometric reports, LM-80 lumen maintenance certificates, driver THD ratings (<10%), and surge protection test data (4kV to 10kV). IES/LDT files are provided upon request for Dialux lux level calculations.",
  },
  {
    q: "How do you coordinate staged site delivery for commercial office or warehouse fit-outs?",
    a: "Commercial lighting fixtures are delivered in phased batches matching your installation milestones (e.g., false ceiling framing, electrical conduit sign-off) from our Kolkata network. This prevents site congestion and luminaire damage during concurrent civil work.",
  },
  {
    q: "Can BURAQ supply retrofit LED luminaires for legacy fluorescent or metal-halide installations?",
    a: "Yes. We supply 2x2 modular drop-in LED panels (36W/40W) designed to fit existing grid ceiling apertures without frame modification, as well as IP65 UFO LED high bays (100W–200W) to directly replace legacy 250W/400W metal-halide fixtures in factory sheds and logistics bays.",
  },
  {
    q: "How do offline B2B quotations and volume pricing work for lighting BOQs?",
    a: "Submit your bill of quantities (BOQ) with luminaire type, wattage, CCT (3000K, 4000K, 6500K), and quantities to buraq.ep@gmail.com or via our contact form. Our Kolkata sales desk provides an official GST quotation with batch availability and delivery schedules within 24 to 48 hours.",
  },
];

const lightingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://buraq.in/products/lighting#webpage",
      url: "https://buraq.in/products/lighting",
      name: "Commercial LED Lighting Suppliers Kolkata | BURAQ Enterprise",
      description:
        "B2B supplier of commercial LED panels, industrial high bay lights, outdoor floodlights, and streetlights in Kolkata & West Bengal.",
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
          name: "Lighting Products",
          item: "https://buraq.in/products/lighting",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: lightingFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function LightingProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lightingJsonLd) }}
      />
      <PageHeader
        title="Commercial & Industrial LED Lighting Solutions"
        description="Energy-efficient commercial LED panel lights, industrial high bay luminaires, streetlights, and architectural fixtures supplied across Kolkata and West Bengal."
        breadcrumbs={[
          { label: "Lighting Products", href: "/products/lighting" },
        ]}
      />

      {/* Category Overview Details */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F2] to-white border-b border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-buraq-dark tracking-tight">
                Commercial Luminaires, High Bays &amp; Architectural Lighting
              </h2>
              <p className="text-sm sm:text-base text-buraq-muted leading-relaxed">
                BURAQ supplies commercial, industrial, and architectural lighting fixtures on an offline B2B enquiry basis. Connecting with premier lighting hubs including Kolkata&apos;s renowned Ezra Street wholesale market, we fulfill contractor BOQs for office 2x2 LED ceiling panels, warehouse IP65 high bays, outdoor security floodlights, and premium designer chandeliers with verified batch photometric specifications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm font-semibold text-buraq-dark">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Commercial 2x2 LED Ceiling Panels &amp; Downlights</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Industrial IP65 High Bay Lights (100W – 250W)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Outdoor Security Floodlights &amp; Street Fixtures</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Architectural Chandeliers &amp; Pendant Luminaires</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-buraq-border shadow-card space-y-4">
              <h3 className="text-lg font-bold text-buraq-dark">
                Enquire for Lighting Supply &amp; BOQ Quotes
              </h3>
              <p className="text-xs text-buraq-muted leading-relaxed">
                We supply lighting fixtures directly to contractors, facility managers, and business projects across Kolkata and West Bengal. Contact our desk for photometric considerations, volume pricing, and staged site delivery.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-xl bg-buraq-primary text-white font-bold text-xs sm:text-sm hover:bg-buraq-dark transition-colors"
              >
                <span>Request a Lighting Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filtered Products Showcase for Lighting */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#FAF8F3] to-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-buraq-dark">
              Lighting Products Showcase
            </h3>
            <p className="text-xs sm:text-sm text-buraq-muted">
              Select any lighting product below to view specifications and request availability.
            </p>
          </div>

          <ProductsFilterShowcase initialCategory="lighting" />
        </div>
      </section>

      {/* Lighting Buyer FAQs */}
      <section className="py-12 sm:py-16 bg-white border-t border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-buraq-dark tracking-tight">
              Lighting Procurement FAQs
            </h2>
            <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
              Clear technical guidance on commercial lighting specifications, compliance testing, and offline supply logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            {lightingFaqs.map((faq, i) => (
              <div
                key={i}
                className="space-y-2 p-5 sm:p-6 rounded-2xl bg-[#FAF8F2] border border-buraq-border/60"
              >
                <h3 className="text-sm sm:text-base font-bold text-buraq-dark flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-buraq-accent flex-shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-[13px] text-buraq-muted pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need lighting products for an upcoming project?"
        subtitle="Contact BURAQ today via email at buraq.ep@gmail.com to discuss project specifications and offline order fulfillment."
        buttonText="Contact Our Sales Desk"
        buttonHref="/contact"
      />
    </>
  );
}
