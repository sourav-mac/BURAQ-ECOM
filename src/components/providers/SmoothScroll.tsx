"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const pathname = usePathname();

  // Listen to chatbot open/close state
  useEffect(() => {
    const handleChatToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isOpen === "boolean") {
        setIsChatOpen(customEvent.detail.isOpen);
      }
    };

    window.addEventListener("buraq-chatbot-toggle", handleChatToggle);
    return () => {
      window.removeEventListener("buraq-chatbot-toggle", handleChatToggle);
    };
  }, []);

  // Reset scroll on route change (unless restoring saved product scroll position)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("buraq_product_scroll_y")
    ) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Native IntersectionObserver for ultra-lightweight scroll reveal (Desktop only: ≥ 1024px)
  useEffect(() => {
    // Disable on small screens (mobile & tablet < 1024px)
    if (typeof window === "undefined" || window.innerWidth < 1024) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target); // Unobserve immediately to release CPU/GPU memory
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      }
    );

    // Target elements across page
    const elements = document.querySelectorAll(
      ".reveal-on-scroll, section > div:not(.no-reveal), .depth-card"
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("is-revealed");
      } else {
        el.classList.add("reveal-on-scroll");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Show scroll-to-top button ONLY when user is in the footer section
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollTop(entry.isIntersecting);
      },
      {
        rootMargin: "0px",
        threshold: 0.05,
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {children}

      {/* Uiverse.io Scroll to Top Button (Appears only in footer section and when chatbot is closed) */}
      {showScrollTop && !isChatOpen && (
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 animate-in fade-in zoom-in-75 duration-300">
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="uiverse-scroll-btn"
          >
            <svg className="svgIcon" viewBox="0 0 384 512">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};
