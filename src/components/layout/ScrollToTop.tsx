"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && !isChatOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="cursor-pointer relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/60 bg-buraq-dark hover:bg-buraq-primary text-white shadow-[0_12px_28px_-6px_rgba(7,84,63,0.45)] ring-1 ring-black/10 transition-all duration-300 hover:rounded-full hover:w-36 sm:hover:w-40 group/button overflow-hidden active:scale-95"
          >
            {/* Arrow SVG that slides up on hover */}
            <svg
              className="w-3.5 h-3.5 fill-white transition-all duration-250 ease-out group-hover/button:-translate-y-12 group-hover/button:opacity-0"
              viewBox="0 0 384 512"
            >
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>

            {/* "Scroll to top" text that scales and reveals in place */}
            <span className="absolute whitespace-nowrap text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase scale-0 opacity-0 group-hover/button:scale-100 group-hover/button:opacity-100 transition-all duration-200 delay-75 pointer-events-none">
              Scroll to top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
