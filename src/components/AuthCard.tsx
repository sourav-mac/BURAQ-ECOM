"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "signup";

const inputCls =
  "w-full h-10 px-4 bg-white rounded-full border border-[#D9D3C4] hover:border-[#86948a] focus:border-[#07543F] focus:ring-2 focus:ring-[#07543F]/10 text-sm text-[#10201F] placeholder:text-[#9AA19C] focus:outline-none transition-colors";
const labelCls = "block text-xs font-semibold text-[#445048] mb-1.5 ml-1";

export function AuthCard({ initialMode }: { initialMode: Mode }) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  const switchMode = () => {
    const next: Mode = isSignup ? "login" : "signup";
    setMode(next);
    setError(null);
    window.history.replaceState(null, "", (next === "signup" ? "/signup" : "/signin") + window.location.search);
  };

  const handleSuccessRedirect = () => {
    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next && next.startsWith("/") && !next.startsWith("//") ? next : "/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password || (isSignup && !name.trim())) {
      setError("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    setError(null);
    const res = isSignup
      ? await signup(name.trim(), email.trim(), phone.trim(), password)
      : await login(email.trim(), password);
    setIsLoading(false);
    if (res.success) {
      handleSuccessRedirect();
    } else {
      setError(res.message || "Something went wrong.");
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      const next = new URLSearchParams(window.location.search).get("next");
      const callbackUrl = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
      await nextAuthSignIn("google", { callbackUrl });
    } catch {
      setError("Unable to authenticate with Google. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 py-6 bg-[#2d3a33] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-85 scale-105 pointer-events-none blur-[4px]"
        style={{ backgroundImage: "url('/images/botanical-bg-ambient.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#162721]/80 via-[#1c2e26]/60 to-[#273d33]/70 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[800px] md:min-h-[500px] bg-[#fbf9f7] rounded-[28px] shadow-[0_25px_70px_rgba(7,24,18,0.5)] border border-white/60 overflow-hidden flex flex-col md:flex-row">
        {/* Form side */}
        <div className="w-full md:w-[55%] px-6 sm:px-10 py-8 flex flex-col justify-center">
          {/* Title (cross-fades between modes) */}
          <div key={mode} className="animate-[authFade_0.35s_ease]">
            <h1 className="text-2xl font-bold text-[#10201F] tracking-tight">
              {isSignup ? "Create account" : "Log in"}
            </h1>
            <p className="text-sm text-[#667085] mt-1">
              {isSignup ? "Sign up to start shopping with BURAQ" : "Enter your credentials to continue"}
            </p>
          </div>

          {/* Continue with Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="mt-5 w-full h-11 rounded-full bg-white hover:bg-[#F2F7F4] active:scale-[0.99] border border-[#D9D3C4] text-sm font-semibold text-[#10201F] transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
          >
            {isGoogleLoading ? (
              <span className="w-3.5 h-3.5 border-2 border-[#10201F]/20 border-t-[#10201F] rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <span className="flex-1 h-px bg-[#E2DED5]" />
            <span className="text-[11px] font-semibold text-[#9AA19C] uppercase tracking-wider">or with email</span>
            <span className="flex-1 h-px bg-[#E2DED5]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Sign-up only row: smoothly expands / collapses */}
            <div
              className={`grid transition-all duration-300 ease-out ${
                isSignup ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 -mb-3.5"
              }`}
              aria-hidden={!isSignup}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-2 gap-3 p-px">
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      tabIndex={isSignup ? 0 : -1}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      tabIndex={isSignup ? 0 : -1}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Optional"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className={labelCls}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignup ? "Min. 6 characters" : "••••••••"}
                  className={`${inputCls} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#9AA19C] hover:text-[#10201F] cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs font-medium text-[#C2410C] -mt-1">{error}</p>}

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full h-11 !mt-5 rounded-full bg-[#07543F] hover:bg-[#053E2E] active:scale-[0.99] text-white text-sm font-semibold transition-all shadow-[0_8px_20px_rgba(7,84,63,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading && (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {isSignup ? "Create account" : "Log in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[#667085]">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-[#07543F] hover:underline cursor-pointer"
            >
              {isSignup ? "Log in" : "Create one"}
            </button>
          </p>
        </div>

        {/* Artwork side */}
        <div className="hidden md:block md:w-[45%] relative bg-[#1b2f27]">
          <Image
            src="/images/botanical-papercut-original.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute top-0 bottom-0 -left-1 w-9 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.2), transparent)" }}
          />
        </div>
      </div>
    </div>
  );
}
