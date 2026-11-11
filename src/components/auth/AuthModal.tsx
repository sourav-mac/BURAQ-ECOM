"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { GoogleAuthModal } from "./GoogleAuthModal";

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authMode,
    closeAuthModal,
    login,
    registerAccount,
    authenticateUser,
  } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  // Sign In form fields
  const [signInIdentifier, setSignInIdentifier] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up form fields
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpCompany, setSignUpCompany] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMode(authMode);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [authMode, isAuthModalOpen]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen || !mounted) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signInIdentifier.trim() || !signInPassword) {
      setErrorMessage("Please enter both email/phone and password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = authenticateUser(signInIdentifier, signInPassword);
      if (!res.success) {
        setErrorMessage(res.error || "Authentication failed.");
        return;
      }
      closeAuthModal();
    }, 400);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (signUpPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = registerAccount({
        name: signUpName.trim(),
        email: signUpEmail.trim(),
        phone: signUpPhone.trim() || undefined,
        company: signUpCompany.trim() || undefined,
        password: signUpPassword,
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to create account.");
        return;
      }
      closeAuthModal();
    }, 500);
  };

  const handleGoogleAuth = () => {
    setIsGoogleModalOpen(true);
  };

  const handleGoogleSuccess = (googleUser: { name: string; email: string }) => {
    login({
      name: googleUser.name,
      email: googleUser.email,
      role: "Verified Google Buyer",
    });
    closeAuthModal();
  };

  return (
    <>
      {createPortal(
        <div
          onClick={closeAuthModal}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
          role="dialog"
          aria-modal="true"
        >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md bg-[#FFFDEB] text-buraq-dark rounded-[26px] p-6 sm:p-7 border border-black/[0.08] shadow-[0_25px_60px_-15px_rgba(16,32,31,0.4)] flex flex-col gap-4 animate-in zoom-in-95 duration-200 cursor-default max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-buraq-dark/60 hover:text-buraq-dark hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-2 border-b border-black/[0.06]">
          <Image
            src="/images/buraq-logo.png"
            alt="BURAQ ENTERPRISE"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />
          <div className="h-6 w-px bg-neutral-200" />
          <span className="text-xs font-bold uppercase tracking-wider text-buraq-primary">
            Customer Portal
          </span>
        </div>

        {/* Switcher Tabs (Sign In / Sign Up) */}
        <div className="flex rounded-xl bg-black/[0.04] p-1 border border-black/[0.05]">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              mode === "signin"
                ? "bg-white text-buraq-dark shadow-xs"
                : "text-buraq-dark/60 hover:text-buraq-dark"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              mode === "signup"
                ? "bg-white text-buraq-dark shadow-xs"
                : "text-buraq-dark/60 hover:text-buraq-dark"
            }`}
          >
            Create Account (Sign Up)
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-buraq-dark mb-1">
                Email or Phone Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="name@company.com or 9876543210"
                  value={signInIdentifier}
                  onChange={(e) => setSignInIdentifier(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-buraq-dark">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset link will be sent to your registered email.")}
                  className="text-[11px] font-bold text-buraq-primary hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-buraq-dark cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-buraq-dark/80">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded accent-buraq-primary cursor-pointer"
                />
                <span>Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-buraq-primary text-white font-bold text-sm shadow-md hover:bg-buraq-dark disabled:opacity-60 transition-colors cursor-pointer"
            >
              <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4 text-buraq-sage" />
            </button>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-full bg-[#F8FAF9] hover:bg-white border border-neutral-300 text-neutral-800 font-semibold text-sm shadow-2xs hover:border-buraq-primary transition-all cursor-pointer"
              title="Log in with Google"
            >
              <GoogleLogo />
              <span>Log in with Google</span>
            </button>

            <div className="pt-2 border-t border-neutral-200/80">
              <p className="text-[11px] text-center text-neutral-500">
                New buyer or contractor?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-bold text-buraq-primary hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-buraq-dark mb-1">
                Full Name <span className="text-buraq-accent">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Mukherjee"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-buraq-dark mb-1">
                  Email Address <span className="text-buraq-accent">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-buraq-dark mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-buraq-dark mb-1">
                Company / Firm Name (Optional)
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Bengal Electricals & Infra Pvt Ltd"
                  value={signUpCompany}
                  onChange={(e) => setSignUpCompany(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-buraq-dark mb-1">
                Create Password <span className="text-buraq-accent">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 6 characters"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-buraq-border bg-white text-sm focus:outline-none focus:border-buraq-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-buraq-dark cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-buraq-primary text-white font-bold text-sm shadow-md hover:bg-buraq-dark disabled:opacity-60 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-buraq-sage" />
              <span>{isSubmitting ? "Signing Up..." : "Sign Up"}</span>
            </button>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-full bg-[#F8FAF9] hover:bg-white border border-neutral-300 text-neutral-800 font-semibold text-sm shadow-2xs hover:border-buraq-primary transition-all cursor-pointer"
              title="Log in with Google"
            >
              <GoogleLogo />
              <span>Log in with Google</span>
            </button>

            <p className="text-[11px] text-center text-neutral-500 pt-1">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="font-bold text-buraq-primary hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>,
    document.body
  )}

  {/* Real Google Account Chooser Modal */}
  <GoogleAuthModal
    isOpen={isGoogleModalOpen}
    onClose={() => setIsGoogleModalOpen(false)}
    onSuccess={handleGoogleSuccess}
  />
</>
);
};

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "19px", height: "19px", flexShrink: 0 }}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

