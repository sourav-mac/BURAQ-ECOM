import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ProductsFilterShowcase } from "@/components/products/ProductsFilterShowcase";
import { Zap, CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Industrial Power Cables & Switchgear Suppliers Kolkata | BURAQ",
  },
  description:
    "Wholesale supplier of armoured LT/HT power cables, industrial switchgear, MCCB circuit breakers, and distribution boards in Kolkata (Poddar Court) & West Bengal.",
  alternates: { canonical: "https://buraq.in/products/electrical" },
};

const electricalFaqs = [
  {
    q: "Which Indian Standards (IS) and specifications do your industrial power cables comply with?",
    a: "Our heavy armoured and unarmoured power cables conform to IS 7098 (Part 1 & 2) for XLPE insulated cables up to 3.3kV and 11kV/33kV, and IS 1554 (Part 1) for PVC insulated cables. Manufacturer test certificates with conductor resistance and insulation thickness tests accompany drum dispatches.",
  },
  {
    q: "Can BURAQ supply custom cut-lengths or only full factory wooden drums?",
    a: "Through our wholesale network at Poddar Court, Kolkata, we fulfill both full factory drum dispatches (500m / 1000m) and custom cut-lengths for heavy feeder runs (e.g., 3.5C x 185 sq mm, 240 sq mm, 300 sq mm aluminium or copper) to eliminate expensive site scrap.",
  },
  {
    q: "Which switchgear and circuit breaker ratings are available for industrial panels?",
    a: "We source molded case circuit breakers (MCCBs) from 16A to 1250A with thermal-magnetic and microprocessor trip units, air circuit breakers (ACBs) up to 4000A, heavy motor starter contactors, and overload relays suitable for industrial motor control centers (MCC) and power distribution boards (PDB).",
  },
  {
    q: "How fast can electrical contractors receive a formal quotation for an electrical BOQ?",
    a: "Submit your material schedule, single-line diagram (SLD), or cable schedule to buraq.ep@gmail.com or via our contact form. Our Poddar Court commercial desk prepares a line-item quotation with manufacturer availability and delivery schedules within 24 to 48 hours.",
  },
];

const electricalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://buraq.in/products/electrical#webpage",
      url: "https://buraq.in/products/electrical",
      name: "Industrial Power Cables & Switchgear Suppliers Kolkata | BURAQ",
      description:
        "Wholesale supplier of armoured LT/HT power cables, industrial switchgear, MCCB circuit breakers, and distribution boards in Kolkata (Poddar Court) & West Bengal.",
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
          name: "Electrical Products",
          item: "https://buraq.in/products/electrical",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: electricalFaqs.map((faq) => ({
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

export default function ElectricalProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(electricalJsonLd) }}
      />
      <PageHeader
        title="Industrial Power Cables, Switchgear & Distribution Products"
        description="Armoured power cables, MCCB/MCB circuit breakers, motor switchgear, and modular distribution systems supplied across Kolkata and West Bengal."
        breadcrumbs={[
          { label: "Electrical Products", href: "/products/electrical" },
        ]}
      />

      {/* Category Overview Details */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F2] to-white border-b border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-buraq-dark tracking-tight">
                Heavy Power Cables, Industrial Switchgear &amp; Distribution Systems
              </h2>
              <p className="text-sm sm:text-base text-buraq-muted leading-relaxed">
                Operating directly from Kolkata&apos;s prime electrical trade corridor at Poddar Court, BURAQ supplies certified industrial electrification materials to MEP contractors, industrial plants, and infrastructure projects across West Bengal. Sourcing heavy-duty armoured copper and aluminium LT/HT power cables, high breaking capacity MCCBs, industrial modular distribution boards, and galvanized cable trays for project BOQ fulfillment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm font-semibold text-buraq-dark">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Armoured &amp; Unarmoured Copper/Aluminium Power Cables</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Industrial MCBs, MCCBs, ELCBs &amp; Air Circuit Breakers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Heavy Contactors, Thermal Relays &amp; Isolators</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Modular Distribution Boards, Cable Trays &amp; Conduits</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-buraq-border shadow-card space-y-4">
              <h3 className="text-lg font-bold text-buraq-dark">
                Electrical BOQ &amp; Wholesale Quotation
              </h3>
              <p className="text-xs text-buraq-muted leading-relaxed">
                Whether you need specific cable drum lengths, custom busbar enclosures, or volume circuit breakers, our Poddar Court desk verifies technical specifications and provides formal offline commercial quotes.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-xl bg-buraq-primary text-white font-bold text-xs sm:text-sm hover:bg-buraq-dark transition-colors"
              >
                <span>Request Electrical Supply Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filtered Products Showcase for Electrical */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#FAF8F3] to-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-buraq-dark">
              Electrical Products Showcase
            </h3>
            <p className="text-xs sm:text-sm text-buraq-muted">
              Select any electrical product below to view specifications and request availability.
            </p>
          </div>

          <ProductsFilterShowcase initialCategory="electrical" />
        </div>
      </section>

      {/* Electrical Buyer FAQs */}
      <section className="py-12 sm:py-16 bg-white border-t border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-buraq-dark tracking-tight">
              Electrical Procurement FAQs
            </h2>
            <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
              Technical guidance on IS cable standards, cut-length sourcing from Poddar Court, and switchgear selection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            {electricalFaqs.map((faq, i) => (
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
        title="Need electrical power cables or switchgear?"
        subtitle="Contact BURAQ at buraq.ep@gmail.com with your electrical material schedule for prompt quotation and supply support."
        buttonText="Enquire for Electrical Products"
        buttonHref="/contact"
      />
    </>
  );
}
