import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AgentationWrapper } from "@/components/AgentationWrapper";

export const metadata: Metadata = {
  title: "BURAQ Enterprise | Lights, Electricals & Solar E-Commerce",
  description: "Direct B2C & commercial store for premium LED lighting, heavy-duty electrical switchgear, power cables, and tier-1 solar photovoltaic energy systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans min-h-screen flex flex-col bg-[#FFFDEB] text-[#10201F] antialiased selection:bg-[#D96B1F] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <CartDrawer />
            <Footer />
            <AgentationWrapper />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
