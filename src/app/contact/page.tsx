import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/shared/ContactForm";
import { COMPANY_INFO } from "@/lib/constants";
import { HelpCircle, Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Contact BURAQ Enterprise Kolkata | Product Enquiries & BOQ Quotes",
  },
  description:
    "Contact BURAQ Enterprise for lighting products, solar components, industrial electrical supply, and technical manpower in Kolkata (Poddar Court) & Murshidabad.",
  alternates: { canonical: "https://buraq.in/contact" },
};

const faqs = [
  {
    q: "How does product purchasing work with BURAQ?",
    a: "BURAQ operates on an offline B2B supply and enquiry model. We do not process online payments or cart checkouts on this website. Simply send your product requirements or BOQ via our enquiry form or email to receive an official commercial quote and availability timeline.",
  },
  {
    q: "What product categories do you supply?",
    a: "We supply three main product categories: Lighting Products (commercial LED panels, high bays, downlights, floodlights, streetlights), Solar Components (PV modules, on-grid inverters, 1.5kV DC cables, mounting hardware), and Electrical Products (industrial power cables, switchgear, breakers, distribution boards).",
  },
  {
    q: "Does BURAQ still provide technical manpower?",
    a: "Yes. Alongside our primary product catalogue, BURAQ maintains a secondary active service division for Technical Manpower Supply, deploying qualified engineers, technical workers, and industrial helpers for plants and projects across West Bengal.",
  },
  {
    q: "How can we request a formal offline quotation?",
    a: "You can submit the form on this page or email our sales desk at buraq.ep@gmail.com with your material schedule or project requirements. Direct WhatsApp and Call helplines are launching soon.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        title="Contact BURAQ Enterprise"
        description="Submit project requirements, request structured offline BOQ quotations, or inquire about material availability at our Kolkata and Murshidabad sales desks."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      {/* Main Contact Section with Ambient Greenish Aurora Glow */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F7F4EE] via-[#E2EFE7] to-[#F7F4EE] z-10">
        {/* Soft Ambient Greenish Aurora Glow with edge fades */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 right-10 w-[520px] h-[360px] bg-gradient-to-bl from-buraq-primary/20 via-[#25A170]/15 to-[#A7D7C5]/20 rounded-full blur-[100px] opacity-80" />
          <div className="absolute bottom-10 left-10 w-[440px] h-[300px] bg-gradient-to-tr from-[#1C4D3D]/15 via-[#52B788]/18 to-transparent rounded-full blur-[90px] opacity-75" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F7F4EE] via-[#F7F4EE]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7F4EE] via-[#F7F4EE]/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 lg:space-y-20">
          {/* Top Row: Balanced Form & Sourcing Desk Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column (7 cols): Enquiry Form */}
            <div className="lg:col-span-7">
              <h2 className="sr-only">Send Us an Enquiry</h2>
              <ContactForm />
            </div>

            {/* Right Column (5 cols): Direct Contacts, Offices & Sourcing Workflow */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Communications Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-buraq-border shadow-card space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-buraq-dark tracking-tight">
                    Direct Communication
                  </h3>
                  <p className="text-xs text-buraq-muted">
                    Direct lines to sales, billing, and operational coordinators.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm pt-1">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-buraq-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold text-buraq-dark block text-[11px] uppercase tracking-wider text-buraq-muted">
                        Sales &amp; Product Supply
                      </span>
                      <a href="mailto:buraq.ep@gmail.com" className="text-buraq-primary hover:text-buraq-primary-hover font-semibold text-sm transition-colors">
                        buraq.ep@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-buraq-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold text-buraq-dark block text-[11px] uppercase tracking-wider text-buraq-muted">
                        WhatsApp &amp; Phone Line
                      </span>
                      <span className="text-buraq-dark font-semibold text-sm">
                        +91 XXXXX XXXXX
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5 border-t border-buraq-border/60 pt-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-buraq-muted block">
                        Commercials &amp; Accounts
                      </span>
                      <a href="mailto:account@buraq.in" className="text-buraq-dark hover:text-buraq-primary font-medium text-xs">
                        account@buraq.in
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-buraq-muted block">
                        General Inquiries
                      </span>
                      <a href="mailto:info@buraq.in" className="text-buraq-dark hover:text-buraq-primary font-medium text-xs">
                        info@buraq.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-buraq-muted pt-1 border-t border-buraq-border/60">
                    <Clock className="w-3.5 h-3.5 text-buraq-primary shrink-0" />
                    <span>Operating Hours: <strong>Mon – Sat: 9:00 AM – 7:00 PM</strong></span>
                  </div>
                </div>
              </div>

              {/* Office Locations Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-buraq-border shadow-card space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-buraq-dark tracking-tight">
                    Offices &amp; Logistics Hubs
                  </h3>
                  <p className="text-xs text-buraq-muted">
                    Physical locations across West Bengal.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <div className="space-y-1 pb-3 border-b border-buraq-border/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-buraq-dark">Kolkata Office (Client Hub)</span>
                      <a
                        href={COMPANY_INFO.locations.kolkata.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-buraq-primary hover:text-buraq-primary-hover transition-colors"
                      >
                        <span>Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-buraq-muted leading-relaxed">
                      Poddar Court, Gate No. 3, 3rd Floor, Kolkata – 700001
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-buraq-dark">Registered Office (Admin Hub)</span>
                      <a
                        href={COMPANY_INFO.locations.domkal.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-buraq-primary hover:text-buraq-primary-hover transition-colors"
                      >
                        <span>Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-buraq-muted leading-relaxed">
                      Joyrampur, Domkal, Murshidabad, West Bengal – 742303
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Full-Width Section: Ordering & Sourcing FAQs (2x2 Grid) */}
          <div className="space-y-8 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-buraq-dark tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-buraq-muted leading-relaxed">
                Clear information on our offline B2B supply model, quotation turnaround, and delivery logistics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="space-y-2 pb-5 border-b border-buraq-border/60"
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
        </div>
      </section>
    </>
  );
}
