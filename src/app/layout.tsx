import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

import { NextAuthProvider } from "@/components/NextAuthProvider";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FilterProvider } from "@/context/FilterContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AgentationWrapper } from "@/components/AgentationWrapper";

export const metadata: Metadata = {
  title: "BURAQ Enterprise | Lights, Electricals & Solar E-Commerce",
  description:
    "Direct B2C & commercial store for premium LED lighting, heavy-duty electrical switchgear, power cables, and tier-1 solar photovoltaic energy systems.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-[#FFFDEB] text-[#10201F] antialiased selection:bg-[#D96B1F] selection:text-white">
        <NextAuthProvider>
          <AuthProvider>
            <CartProvider>
              <FilterProvider>
                <Navbar />
                <main className="flex-1 flex flex-col">{children}</main>
                <CartDrawer />
                <Footer />
                <AgentationWrapper />
              </FilterProvider>
            </CartProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
