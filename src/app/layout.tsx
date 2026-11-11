import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ChatbotWidget } from "@/components/shared/ChatbotWidget";
import { AgentationWrapper } from "@/components/shared/AgentationWrapper";
import { AuthProvider } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth/AuthModal";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buraq.in"),
  title: {
    default: "BURAQ Enterprise | Lighting, Solar & Electrical in Kolkata",
    template: "%s | BURAQ Enterprise",
  },
  description:
    "BURAQ Enterprise is a B2B supplier of commercial LED lighting, solar PV components, and industrial electrical switchgear & cables in Kolkata and West Bengal.",
  keywords: [
    "BURAQ ENTERPRISE",
    "BURAQ Kolkata",
    "electrical suppliers in kolkata",
    "commercial lighting suppliers kolkata",
    "solar components distributor west bengal",
    "industrial power cables poddar court",
    "industrial switchgear suppliers",
    "solar pv modules wholesale",
    "technical manpower supply kolkata",
    "b2b electrical sourcing west bengal",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://buraq.in",
    title: "BURAQ ENTERPRISE | Lighting, Solar & Electrical Suppliers in Kolkata",
    description:
      "B2B supplier of commercial LED lighting, solar PV modules, and industrial electrical switchgear & cables in Kolkata and West Bengal.",
    siteName: "BURAQ ENTERPRISE",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BURAQ ENTERPRISE Industrial Lighting, Solar and Electrical Supply",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BURAQ ENTERPRISE | Lighting, Solar & Electrical Suppliers in Kolkata",
    description:
      "B2B supplier of commercial LED lighting, solar PV components, and industrial electrical switchgear & cables in Kolkata.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://buraq.in",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://buraq.in/#organization",
      name: "BURAQ ENTERPRISE",
      alternateName: "BURAQ",
      legalName: "BURAQ ENTERPRISE",
      url: "https://buraq.in/",
      logo: {
        "@type": "ImageObject",
        url: "https://buraq.in/icon.png",
        caption: "BURAQ ENTERPRISE Logo",
      },
      image: "https://buraq.in/images/og-image.jpg",
      description:
        "BURAQ ENTERPRISE is a B2B product supplier based in Kolkata and Murshidabad, West Bengal, specializing in commercial lighting solutions, solar energy components, industrial electrical switchgear & power cables, and technical manpower supply.",
      email: "buraq.ep@gmail.com",
      foundingDate: "2025",
      taxID: "UDYAM-WB-13-0109935",
      founder: {
        "@type": "Person",
        name: "Tahena Najneen Ahmed",
        jobTitle: "Founder & Proprietor",
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Dumkal Institute of Engineering & Technology",
          },
          {
            "@type": "EducationalOrganization",
            name: "IMPS College of Engineering & Technology",
          },
        ],
      },
      priceRange: "$$",
      currenciesAccepted: "INR",
      paymentAccepted: "Offline Bank Transfer, Cheque, NEFT/RTGS",
      areaServed: [
        {
          "@type": "City",
          name: "Kolkata",
        },
        {
          "@type": "AdministrativeArea",
          name: "West Bengal",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Poddar Court, Gate No. 3, 3rd Floor",
          addressLocality: "Kolkata",
          addressRegion: "West Bengal",
          postalCode: "700001",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Joyrampur, Domkal",
          addressLocality: "Murshidabad",
          addressRegion: "West Bengal",
          postalCode: "742303",
          addressCountry: "IN",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.5714,
        longitude: 88.3512,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          "[data-aeo='speakable']",
          ".aeo-direct-answer",
          "h1",
          "h2",
        ],
      },
      knowsAbout: [
        "Commercial & Industrial LED Lighting",
        "Solar PV Modules & On-Grid Inverters",
        "Solar DC Cables & BOS Components",
        "Industrial Power Cables & Switchgear",
        "Technical Manpower Supply West Bengal",
        "Poddar Court Electrical Wholesale Kolkata",
        "B2B Electrical Bill of Quantities BOQ Quotation",
        "Mono PERC and Bifacial Solar Panels Wholesale",
        "XLPE Armoured LT HT Power Cables",
        "Air Circuit Breakers ACB and MCCB Switchgear",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Industrial Product Supply & Services",
        itemListElement: [
          {
            "@type": "OfferCatalog",
            name: "Commercial & Industrial Lighting",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Commercial LED Panels & Downlights Supply",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Industrial High Bay Lights & Floodlights Supply",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Solar Energy Components & BOS",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Solar PV Modules & String Inverters Wholesale",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "1.5kV Solar DC Cables & Mounting Hardware Supply",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Electrical Products & Switchgear",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Industrial Armoured Power Cables Supply",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Industrial Switchgear, MCB & MCCB Breakers Supply",
                },
              },
            ],
          },
          {
            "@type": "OfferCatalog",
            name: "Technical Workforce Supply",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Skilled Technical Workforce & Industrial Helpers Supply",
                },
              },
            ],
          },
        ],
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "buraq.ep@gmail.com",
        areaServed: "IN",
        availableLanguage: ["en", "hi", "bn"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://buraq.in/#website",
      url: "https://buraq.in/",
      name: "BURAQ ENTERPRISE",
      alternateName: "BURAQ",
      description:
        "B2B supplier of commercial lighting, solar components, and industrial electrical products in Kolkata and West Bengal.",
      publisher: {
        "@id": "https://buraq.in/#organization",
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#FFFDEB] text-buraq-dark relative selection:bg-buraq-primary selection:text-white">
        <AuthProvider>
          <SmoothScroll>
            <div className="relative z-10 flex-1 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ChatbotWidget />
            <AgentationWrapper />
          </SmoothScroll>
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
