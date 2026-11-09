"use client";

import React from "react";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description: string;
  breadcrumbs?: { label: string; href: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
}) => {
  const breadcrumbJsonLd =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://buraq.in",
            },
            ...breadcrumbs.map((crumb, idx) => ({
              "@type": "ListItem",
              position: idx + 2,
              name: crumb.label,
              item: crumb.href.startsWith("http")
                ? crumb.href
                : `https://buraq.in${crumb.href}`,
            })),
          ],
        }
      : null;

  return (
    <section className="relative pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-12 lg:pb-14 bg-gradient-to-b from-[#FFFDEB] via-[#FAF8F0] to-[#F7F4EE]">
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3 pt-2 sm:pt-3">
          {/* Top Accent Line */}
          <div className="w-12 h-1 bg-buraq-primary rounded-full mb-1" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-buraq-dark tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-buraq-muted leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

