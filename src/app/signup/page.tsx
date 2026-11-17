"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signup(name, email, phone, password);
    setLoading(false);

    if (res.success) {
      router.push("/");
    } else {
      setError(res.message || "Failed to create account");
    }
  };

  return (
    <div className="py-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white border border-[#E2DED5] space-y-6 shadow-xl relative">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-1">
            <Image
              src="/images/buraq-logo.png"
              alt="BURAQ ENTERPRISE"
              width={200}
              height={60}
              className="h-10 w-auto mx-auto object-contain"
            />
          </Link>
          <h1 className="text-2xl font-black text-[#10201F]">Create Customer Account</h1>
          <p className="text-xs text-[#667085]">
            Register to enjoy faster checkout, doorstep delivery, and invoices.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#10201F]">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#10201F]">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#10201F]">Phone Number (For Delivery Updates) *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#10201F]">Password (Min 6 Characters) *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8E4] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-black uppercase tracking-wider flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#667085] border-t border-[#E2DED5]">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#07543F] font-bold">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
