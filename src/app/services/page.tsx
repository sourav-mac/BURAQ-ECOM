import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import {
  Users,
  Lightbulb,
  Sun,
  Zap,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/products-data";

export const metadata: Metadata = {
  title: {
    absolute: "B2B Industrial Products & Technical Services Overview | BURAQ Enterprise",
  },
  description:
    "Overview of BURAQ Enterprise's B2B supply offerings in Kolkata & West Bengal: commercial LED lighting, solar hardware, electrical products & technical workforce.",
  alternates: { canonical: "https://buraq.in/services" },
};

const serviceFaqs = [
  {
    q: "Can BURAQ supply both industrial products and technical workforce on a single contract?",
    shortAnswer:
      "Yes. BURAQ coordinates both material procurement and technical manpower supply across West Bengal.",
    fullAnswer:
      "Contractors and industrial plants can source commercial LED luminaires, solar BOS components, or electrical switchgear alongside certified technicians and industrial helpers for seamless staging and site installation support.",
  },
  {
    q: "What technical documentation and test certificates accompany product deliveries?",
    shortAnswer:
      "All dispatches include manufacturer test certificates, warranty certificates, and compliance documentation.",
    fullAnswer:
      "For lighting tenders we provide LM-79/LM-80 test reports and driver THD certificates; for power cables, IS 7098 routine test certificates; and for solar modules and inverters, IEC 61215/61730 test reports and utility grid clearance datasheets.",
  },
  {
    q: "How does BURAQ ensure genuine tier-1 brand supply and warranty protection?",
    shortAnswer:
      "BURAQ sources exclusively through authorized distribution networks in Kolkata with direct manufacturer warranties.",
    fullAnswer:
      "Every cable drum, circuit breaker, lighting fixture, and solar module is supplied in factory-sealed condition with original manufacturer batch serials, protecting contractors against counterfeit materials.",
  },
  {
    q: "What is the quotation turnaround time for a complete contractor BOQ?",
    shortAnswer:
      "Official line-item GST quotations are typically delivered within 24 to 48 hours.",
    fullAnswer:
      "Once you submit your Bill of Quantities (BOQ) or single-line diagram (SLD) to buraq.ep@gmail.com, our Poddar Court commercial desk conducts technical verification, checks batch inventory, and issues a formal commercial proposal.",
  },
];

const serviceAeoSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://buraq.in/services#webpage",
      url: "https://buraq.in/services",
      name: "B2B Industrial Products & Technical Services Overview | BURAQ Enterprise",
      description:
        "Comprehensive B2B procurement across commercial lighting, solar energy components, industrial power cables & switchgear, and technical manpower support in West Bengal.",
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
          name: "Services & Products",
          item: "https://buraq.in/services",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://buraq.in/services#faq",
      mainEntity: serviceFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${faq.shortAnswer} ${faq.fullAnswer}`,
        },
      })),
    },
  ],
};

export default function ServicesAndProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAeoSchemas) }}
      />
      <PageHeader
        title="Industrial Products & Technical Services Overview"
        description="Comprehensive B2B procurement across commercial lighting, solar energy components, industrial power cables & switchgear, and technical manpower support in West Bengal."
        breadcrumbs={[{ label: "Services & Products", href: "/services" }]}
      />

      {/* Main Focus: 3 Product Categories */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F2] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-buraq-primary bg-buraq-primary/10 px-3 py-1 rounded-full">
              Primary Business Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-buraq-dark tracking-tight">
              Product Categories for Business &amp; Projects
            </h2>
            <p className="text-sm sm:text-base text-buraq-muted leading-relaxed">
              We supply lighting luminaires, solar energy hardware, and industrial electrical equipment on an offline enquiry basis for commercial facilities, factories, and project contractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCT_CATEGORIES.map((cat) => {
              const Icon = cat.id === "lighting" ? Lightbulb : cat.id === "solar" ? Sun : Zap;
              return (
                <div
                  key={cat.id}
                  className="rounded-3xl bg-white border border-buraq-border shadow-card overflow-hidden flex flex-col justify-between"
                  data-aeo="speakable"
                >
                  <div className="relative h-48 w-full bg-buraq-dark">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        {cat.itemCountLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-buraq-primary shrink-0" />
                        <h3 className="text-xl font-bold text-buraq-dark">
                          {cat.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
                        {cat.description}
                      </p>

                      <ul className="space-y-1.5 pt-2 text-xs font-semibold text-buraq-dark">
                        {cat.examples.slice(0, 4).map((ex) => (
                          <li key={ex} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-buraq-primary shrink-0" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-buraq-border/60">
                      <Link
                        href={`/products/${cat.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-buraq-primary hover:text-buraq-dark transition-colors"
                      >
                        <span>View {cat.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Retained Secondary Service: Technical Manpower Supply */}
      <section className="py-12 sm:py-16 bg-[#FFFDEB] border-t border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-card border border-buraq-border bg-buraq-dark">
              <Image
                src="/images/manpower-supply-team.jpg"
                alt="BURAQ Technical Manpower Supply"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-buraq-dark/80 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-6 space-y-5" data-aeo="speakable">
              <span className="text-xs font-bold uppercase tracking-wider text-buraq-primary bg-buraq-primary/10 px-3 py-1 rounded-full">
                Secondary Service Division
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-buraq-dark">
                Technical Manpower Supply
              </h2>
              <div className="p-3.5 rounded-xl bg-white border border-buraq-border/80 text-xs sm:text-sm font-semibold text-buraq-dark leading-relaxed aeo-direct-answer">
                <span className="font-bold text-buraq-primary mr-1">Direct Answer:</span>
                BURAQ supplies qualified technical workers, site engineers, and industrial helpers to support plant maintenance, industrial facilities, and turnaround operations across West Bengal.
              </div>
              <p className="text-sm text-buraq-muted leading-relaxed">
                Alongside our product supply business, BURAQ deploys vetted technical crews for manufacturing units, solar installations, and infrastructure projects in Howrah, Hooghly, Haldia, Durgapur, and Kolkata.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-buraq-dark">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary flex-shrink-0" />
                  <span>Technical Workers &amp; Specialists</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary flex-shrink-0" />
                  <span>Industrial Helpers &amp; Crew</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary flex-shrink-0" />
                  <span>Qualified Engineers &amp; Site Oversight</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-buraq-primary flex-shrink-0" />
                  <span>Plant &amp; Turnaround Deployments</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/services/manpower-supply"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-buraq-dark text-white font-bold text-sm hover:bg-buraq-primary shadow-md transition-colors"
                >
                  <Users className="w-4 h-4 text-buraq-sage" />
                  <span>View Manpower Details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Sourcing FAQs Section for AEO */}
      <section className="py-14 sm:py-18 bg-white border-t border-buraq-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-buraq-primary bg-buraq-primary/10 px-3 py-1 rounded-full">
              Procurement &amp; Services Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-buraq-dark tracking-tight">
              Services &amp; Supply FAQs
            </h2>
            <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
              Clear technical details on quotation turnaround, genuine brand sourcing, and dual product-workforce support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {serviceFaqs.map((faq, i) => (
              <div
                key={i}
                className="space-y-3 p-6 rounded-2xl bg-[#FAF8F2] border border-buraq-border/80 shadow-sm"
                data-aeo="speakable"
              >
                <h3 className="text-sm sm:text-base font-bold text-buraq-dark flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-buraq-accent flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <div className="p-3 rounded-xl bg-white border border-amber-200/50 text-xs sm:text-sm font-semibold text-buraq-dark leading-relaxed aeo-direct-answer">
                  <span className="font-bold text-buraq-primary mr-1">Direct Answer:</span>
                  {faq.shortAnswer}
                </div>
                <p className="text-xs sm:text-[13px] text-buraq-muted pl-1 leading-relaxed">
                  {faq.fullAnswer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to discuss product availability or manpower?"
        subtitle="Contact BURAQ today via email at buraq.ep@gmail.com for structured offline quotes and dependable delivery."
        buttonText="Contact BURAQ"
        buttonHref="/contact"
      />
    </>
  );
}
