import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ProductsFilterShowcase } from "@/components/products/ProductsFilterShowcase";
import { Sun, CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Solar PV Modules & Inverters Suppliers in Kolkata | BURAQ Enterprise",
  },
  description:
    "Wholesale supplier of Mono PERC & bifacial solar PV modules, on-grid string inverters, 1.5kV DC cables, and BOS hardware in Kolkata & West Bengal. Offline BOQ quotes.",
  alternates: { canonical: "https://buraq.in/products/solar" },
};

const solarFaqs = [
  {
    q: "Which solar PV module technologies does BURAQ source for commercial rooftops?",
    a: "We source high-efficiency Mono PERC and Bifacial modules (540W to 670W+) featuring multi-busbar (MBB) half-cut cell architecture with positive power tolerance. Sourced modules carry IEC 61215 and IEC 61730 international certifications, suitable for industrial sheds and ground-mount arrays.",
  },
  {
    q: "Are the grid-tied string inverters compliant with WBSEDCL and CESC utility grid standards?",
    a: "Yes. We source three-phase on-grid string and hybrid inverters featuring dual/multi-MPPT tracking, integrated DC disconnect switches, and grid-compliance documentation required by West Bengal utility bodies (WBSEDCL and CESC) for net metering clearance.",
  },
  {
    q: "What specifications do your solar DC cables and balance-of-system (BOS) components meet?",
    a: "Our solar DC cables feature cross-linked polyolefin (XLPO) dual insulation, 1.5kV DC voltage rating, and UV/ozone resistance conforming to EN 50618 (H1Z2Z2-K) / IS 17293 in 4 sq mm and 6 sq mm sizes, paired with IP68 rated MC4 compatible connectors.",
  },
  {
    q: "How do solar EPC contractors submit project bills of quantities (BOQ) for quotation?",
    a: "Submit your system specifications (total DC capacity, inverter rating, module mounting structure type, and DC cable drum requirements) to buraq.ep@gmail.com or via our contact form. Our Kolkata desk generates structured offline B2B commercial quotes with factory lead times within 24 to 48 hours.",
  },
];

const solarJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://buraq.in/products/solar#webpage",
      url: "https://buraq.in/products/solar",
      name: "Solar PV Modules & Inverters Suppliers in Kolkata | BURAQ Enterprise",
      description:
        "Wholesale supplier of Mono PERC & bifacial solar PV modules, on-grid string inverters, 1.5kV DC cables, and BOS hardware in Kolkata & West Bengal.",
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
          name: "Solar Components",
          item: "https://buraq.in/products/solar",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: solarFaqs.map((faq) => ({
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

export default function SolarComponentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solarJsonLd) }}
      />
      <PageHeader
        title="Solar PV Modules, Inverters & BOS Components"
        description="High-efficiency Mono PERC & bifacial PV modules, string inverters, certified 1.5kV DC solar cables, and engineered mounting structures supplied across Kolkata and West Bengal."
        breadcrumbs={[
          { label: "Solar Components", href: "/products/solar" },
        ]}
      />

      {/* Category Overview Details */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F2] to-white border-b border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-buraq-dark tracking-tight">
                Solar PV Modules &amp; Balance of System (BOS) Sourcing
              </h2>
              <p className="text-sm sm:text-base text-buraq-muted leading-relaxed">
                BURAQ supplies commercial and industrial solar hardware directly to solar EPC contractors, developers, and industrial rooftop installers in Kolkata and across West Bengal. Sourcing verified Tier-1 grade PV modules (Mono PERC, TopCon, Bifacial), three-phase grid-tied string inverters, UV-resistant cross-linked 1.5kV DC cables, IP68 MC4 connectors, and heavy-duty aluminium/HDG mounting rails on an offline BOQ procurement basis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm font-semibold text-buraq-dark">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Mono PERC &amp; Bifacial PV Modules (540W – 670W+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>On-Grid Three-Phase &amp; Hybrid String Inverters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>1.5kV UV &amp; Ozone Resistant DC Solar Cables (4/6 sq mm)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary shrink-0" />
                  <span>Anodized Aluminum &amp; HDG Solar Mounting Structures</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white border border-buraq-border shadow-card space-y-4">
              <h3 className="text-lg font-bold text-buraq-dark">
                Solar BOQ &amp; Wholesale Project Sourcing
              </h3>
              <p className="text-xs text-buraq-muted leading-relaxed">
                Send your bill of quantities (BOQ) with DC capacity, inverter configurations, and structure specifications. Our Kolkata desk coordinates availability, manufacturer test reports, and site delivery.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 rounded-xl bg-buraq-primary text-white font-bold text-xs sm:text-sm hover:bg-buraq-dark transition-colors"
              >
                <span>Submit Solar Sourcing Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filtered Products Showcase for Solar */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#FAF8F3] to-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-buraq-dark">
              Solar Components Showcase
            </h3>
            <p className="text-xs sm:text-sm text-buraq-muted">
              Select any solar component below to view specifications and submit an availability request.
            </p>
          </div>

          <ProductsFilterShowcase initialCategory="solar" />
        </div>
      </section>

      {/* Solar Buyer FAQs */}
      <section className="py-12 sm:py-16 bg-white border-t border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-buraq-dark tracking-tight">
              Solar Sourcing FAQs
            </h2>
            <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
              Technical answers regarding module certifications, utility grid compliance, BOS hardware, and procurement workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl mx-auto">
            {solarFaqs.map((faq, i) => (
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
        title="Planning a commercial or industrial solar project?"
        subtitle="Contact BURAQ at buraq.ep@gmail.com with your solar module and balance-of-system requirements."
        buttonText="Enquire for Solar Products"
        buttonHref="/contact"
      />
    </>
  );
}
