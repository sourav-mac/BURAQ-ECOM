import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, ShieldCheck, FileText, MapPin, Truck } from "lucide-react";

export interface FaqItem {
  q: string;
  shortAnswer: string;
  fullAnswer: string;
  badge?: string;
  linkText?: string;
  linkHref?: string;
}

export const HOME_FAQS: FaqItem[] = [
  {
    q: "What products does BURAQ Enterprise supply?",
    shortAnswer:
      "BURAQ Enterprise is a wholesale B2B supplier of commercial LED lighting, solar energy hardware, and industrial electrical switchgear & power cables.",
    fullAnswer:
      "Our core portfolio spans commercial LED panels (2x2) and industrial high bay lights, Mono PERC and bifacial solar PV modules, on-grid string inverters, 1.5kV solar DC cables, heavy armoured LT/HT cables (XLPE/PVC), circuit breakers (MCB/MCCB), and power distribution boards for plants and contractors.",
    badge: "Product Range",
    linkText: "View Products",
    linkHref: "/products/lighting",
  },
  {
    q: "Where is BURAQ Enterprise located in Kolkata and West Bengal?",
    shortAnswer:
      "BURAQ operates its primary commercial client desk at Poddar Court, Gate No. 3, 3rd Floor, Kolkata – 700001, with registered administration at Joyrampur, Domkal, Murshidabad – 742303.",
    fullAnswer:
      "Poddar Court in central Kolkata serves as our procurement and wholesale trade hub for direct project consultations and contractor BOQ processing, while our Murshidabad office oversees regional logistics across central and northern West Bengal.",
    badge: "Office Locations",
    linkText: "View Offices & Maps",
    linkHref: "/contact",
  },
  {
    q: "How does the offline B2B quotation and procurement process work?",
    shortAnswer:
      "Submit your Bill of Quantities (BOQ) or material schedule via email at buraq.ep@gmail.com to receive an official line-item GST quotation within 24 to 48 hours.",
    fullAnswer:
      "BURAQ is strictly a B2B wholesale supplier, not an e-commerce website. We do not use online shopping carts. Our technical team verifies product specifications, confirms manufacturer batch availability, and delivers structured commercial quotes with staged site delivery schedules.",
    badge: "Sourcing Model",
    linkText: "Request BOQ Quote",
    linkHref: "/contact",
  },
  {
    q: "Which industrial brands does BURAQ Enterprise supply?",
    shortAnswer:
      "We source genuine materials from leading tier-1 manufacturers across lighting, solar hardware, and electrical distribution.",
    fullAnswer:
      "For commercial lighting, we source Havells, Philips, Wipro, and Crompton; for power cables, Polycab, KEI, and Havells; for industrial switchgear, L&T, Schneider Electric, and Siemens; and certified tier-1 brands for solar PV modules, inverters, and BOS hardware.",
    badge: "Authorized Brands",
    linkText: "See Brand Portfolio",
    linkHref: "/#brands",
  },
  {
    q: "Does BURAQ Enterprise provide technical manpower support?",
    shortAnswer:
      "Yes, BURAQ maintains a secondary active division deploying certified electrical technicians, site engineers, and industrial helpers across West Bengal.",
    fullAnswer:
      "We deploy skilled workforce teams for industrial plants, manufacturing units, and solar installation projects in Howrah, Hooghly, Haldia, Durgapur, and Kolkata, providing seamless coordination between material delivery and installation support.",
    badge: "Workforce Services",
    linkText: "Explore Manpower",
    linkHref: "/services/manpower-supply",
  },
  {
    q: "Which regions does BURAQ Enterprise serve across West Bengal?",
    shortAnswer:
      "We supply projects and facilities across Kolkata, Howrah, Hooghly, Durgapur, Haldia, Asansol, Kharagpur, and Murshidabad.",
    fullAnswer:
      "Our logistics network coordinates staged site delivery across all major industrial corridors and commercial districts in West Bengal, ensuring materials reach job sites safely with test certificates and delivery challans.",
    badge: "Regional Reach",
    linkText: "Check Delivery Details",
    linkHref: "/about",
  },
];

export const HomeFaqSection: React.FC = () => {
  return (
    <section
      id="faqs"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF8F2] via-white to-[#F7F4EE] border-t border-buraq-border/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-buraq-primary/10 text-buraq-primary text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Direct Answers for Buyers &amp; Engineers</span>
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-[40px] font-black text-buraq-dark tracking-tight leading-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-buraq-muted leading-relaxed">
            Direct, factual answers regarding our product catalog, offline B2B quotation model, brand sourcing, and regional logistics across West Bengal.
          </p>
        </div>

        {/* 2-Column Responsive Direct-Answer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HOME_FAQS.map((faq, index) => (
            <article
              key={index}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-buraq-border/80 shadow-sm hover:shadow-card transition-all duration-200 flex flex-col justify-between space-y-4"
              data-aeo="speakable"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-buraq-primary bg-buraq-primary/10 px-2.5 py-0.5 rounded-full">
                    {faq.badge}
                  </span>
                  <span className="text-xs font-bold text-buraq-muted/70">
                    Q{index + 1}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-buraq-dark tracking-tight flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-buraq-primary shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h3>

                {/* Direct Answer Box for AI Answer Engines & Quick Reading */}
                <div className="p-3.5 rounded-xl bg-[#FFFDEB] border border-amber-200/60 text-xs sm:text-sm font-semibold text-buraq-dark leading-relaxed aeo-direct-answer">
                  <span className="font-bold text-buraq-primary mr-1">Direct Answer:</span>
                  {faq.shortAnswer}
                </div>

                <p className="text-xs sm:text-[13px] text-buraq-muted leading-relaxed pl-1">
                  {faq.fullAnswer}
                </p>
              </div>

              {faq.linkHref && faq.linkText && (
                <div className="pt-3 border-t border-buraq-border/60">
                  <Link
                    href={faq.linkHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-buraq-primary hover:text-buraq-primary-hover transition-colors"
                  >
                    <span>{faq.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* At-A-Glance Fact Strip */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-buraq-dark to-[#0F2922] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-white/10 text-buraq-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Official Micro Enterprise Sourcing Partner
              </h4>
              <p className="text-xs text-gray-300">
                UDYAM Registered (UDYAM-WB-13-0109935) &bull; Poddar Court Sourcing Hub, Kolkata
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-buraq-primary hover:bg-buraq-primary-hover text-white text-xs font-bold transition-colors shrink-0"
          >
            <span>Request Official Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

