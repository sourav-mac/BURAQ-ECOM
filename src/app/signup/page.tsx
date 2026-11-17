"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Zap, AlertCircle } from "lucide-react";
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
    <div className="py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#E2DED5] space-y-6 shadow-xl relative">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#07543F] flex items-center justify-center text-[#FFFDEB] shadow-md">
            <Zap className="w-6 h-6 fill-[#FFFDEB]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#07543F]">
            BURAQ STORE
          </span>
          <h1 className="text-2xl font-black text-[#10201F]">Create Customer Account</h1>
          <p className="text-xs text-[#667085]">
            Register to place direct orders, track dispatches, and save billing addresses.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
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
              placeholder="e.g. Sourav Mandal"
              className="w-full px-4 py-3 rounded-xl bg-[#FFFDEB] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
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
              className="w-full px-4 py-3 rounded-xl bg-[#FFFDEB] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#10201F]">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9830012345"
              className="w-full px-4 py-3 rounded-xl bg-[#FFFDEB] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
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
              className="w-full px-4 py-3 rounded-xl bg-[#FFFDEB] border border-[#E2DED5] text-xs text-[#10201F] placeholder:text-[#667085]/50 focus:outline-none focus:border-[#07543F]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#07543F] text-[#FFFDEB] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
            <ArrowRight className="w-4 h-4" />
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
