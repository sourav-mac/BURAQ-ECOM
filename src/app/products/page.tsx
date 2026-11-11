import React, { Suspense } from "react";
import { Metadata } from "next";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ProductsFilterShowcase } from "@/components/products/ProductsFilterShowcase";
import { COMPANY_INFO } from "@/lib/constants";
import { PRODUCTS_CATALOGUE } from "@/lib/products-data";

export const metadata: Metadata = {
  title: {
    absolute: "Commercial & Industrial Products Catalogue | BURAQ Enterprise",
  },
  description:
    "Explore BURAQ Enterprise's e-commerce catalogue: Commercial Lighting Products, Solar PV Components, and Heavy Industrial Electrical Equipment in Kolkata and West Bengal.",
  alternates: { canonical: "https://buraq.in/products" },
};

const productsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://buraq.in/products#webpage",
      url: "https://buraq.in/products",
      name: "Commercial & Industrial Products Catalogue | BURAQ Enterprise",
      description:
        "Comprehensive B2B e-commerce showcase featuring lighting fixtures, solar components, and industrial electrical equipment.",
      isPartOf: {
        "@id": "https://buraq.in/#website",
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
          name: "Products",
          item: "https://buraq.in/products",
        },
      ],
    },
    {
      "@type": "ItemList",
      numberOfItems: PRODUCTS_CATALOGUE.length,
      itemListElement: PRODUCTS_CATALOGUE.map((product, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.shortDesc,
          image: `https://buraq.in${product.image}`,
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.price,
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewsCount,
          },
        },
      })),
    },
  ],
};

function ProductsShowcaseSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="h-16 bg-neutral-200/60 rounded-2xl w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 bg-neutral-200/60 rounded-2xl" />
          ))}
        </div>
        <div className="hidden lg:block lg:col-span-3 h-80 bg-neutral-200/60 rounded-2xl" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />

      <div className="no-reveal relative z-10 pt-3 sm:pt-5 pb-12 sm:pb-16 bg-gradient-to-b from-[#FFFDEB] via-[#FAF8F2] to-[#F7F4EE] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ProductsShowcaseSkeleton />}>
            <ProductsFilterShowcase initialCategory="all" />
          </Suspense>
        </div>
      </div>

      <CtaBanner
        title="Need Bulk BOQ Pricing or Custom Project Sourcing?"
        subtitle="Submit your project specifications or bill of quantities directly to buraq.ep@gmail.com for expedited GST invoicing and Kolkata batch dispatch."
        buttonText="Request Custom Quotation"
        buttonHref="/contact"
      />
    </>
  );
}
