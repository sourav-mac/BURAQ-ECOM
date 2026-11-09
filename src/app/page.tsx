import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { BrandsSection } from "@/components/home/BrandsSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { IndustrialCapabilitySection } from "@/components/home/IndustrialCapabilitySection";
import { MilestoneWorkflow } from "@/components/home/MilestoneWorkflow";
import { StatsBanner } from "@/components/home/StatsBanner";
import { HomeFaqSection, HOME_FAQS } from "@/components/home/HomeFaqSection";
import { CtaBanner } from "@/components/shared/CtaBanner";

export const metadata: Metadata = {
  title: {
    absolute: "BURAQ Enterprise | Lighting, Solar & Electrical in Kolkata",
  },
  description:
    "BURAQ Enterprise supplies commercial LED lighting, solar PV modules, and industrial electrical cables & switchgear across Kolkata, Howrah, and West Bengal.",
  alternates: {
    canonical: "https://buraq.in",
  },
};

const homeAeoSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://buraq.in/#webpage",
      url: "https://buraq.in",
      name: "BURAQ Enterprise | Lighting, Solar & Electrical in Kolkata",
      description:
        "B2B wholesale supplier of commercial LED lighting, solar energy components, and industrial electrical switchgear & cables in Kolkata and West Bengal.",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          "[data-aeo='speakable']",
          ".aeo-direct-answer",
          "#faq-heading",
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
      "@type": "FAQPage",
      "@id": "https://buraq.in/#faq",
      mainEntity: HOME_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${faq.shortAnswer} ${faq.fullAnswer}`,
        },
      })),
    },
    {
      "@type": "HowTo",
      "@id": "https://buraq.in/#procurement-guide",
      name: "How to Procure Industrial Products & Request BOQ Quotations from BURAQ Enterprise",
      description:
        "Step-by-step offline B2B procurement workflow for commercial lighting, solar components, and industrial switchgear & power cables in Kolkata and West Bengal.",
      totalTime: "P2D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Submit Your Bill of Quantities (BOQ)",
          text: "Email your material schedule, technical specifications, or BOQ to buraq.ep@gmail.com or via the online enquiry form.",
          url: "https://buraq.in/contact",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Technical Verification & Brand Matching",
          text: "Our engineering and sourcing desk at Poddar Court verifies technical parameters (voltage ratings, lumen outputs, compliance certifications) and aligns with authorized brands.",
          url: "https://buraq.in/services",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Receive Official GST Quotation",
          text: "Receive a line-item B2B commercial quote detailing unit pricing, GST breakups, batch availability, and manufacturer warranty within 24 to 48 hours.",
          url: "https://buraq.in/contact",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Staged Site Delivery & Documentation",
          text: "Materials are dispatched in staged batches directly to your facility or project site across Kolkata, Howrah, Hooghly, Durgapur, or Haldia with manufacturer test certificates.",
          url: "https://buraq.in/why-buraq",
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeAeoSchemas) }}
      />
      <HeroSection />
      <BrandsSection />
      <ServicesOverview />
      <FeaturedProductsSection />
      <AboutTeaser />
      <IndustrialCapabilitySection />
      <MilestoneWorkflow />
      <StatsBanner />
      <HomeFaqSection />
      <CtaBanner
        title="Ready to discuss product specifications or project supply?"
        subtitle="Contact BURAQ today via email at buraq.ep@gmail.com. We are here to support your business and project requirements with dependable solutions."
        buttonText="Explore Products"
        buttonHref="#products"
      />
    </>
  );
}
