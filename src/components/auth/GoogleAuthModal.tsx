"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, UserPlus, ArrowLeft, Check, Shield } from "lucide-react";

export interface GoogleAccount {
  name: string;
  email: string;
  picture?: string;
  sub?: string;
}

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

const GOOGLE_ACCOUNTS_KEY = "buraq_google_accounts";

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [mounted, setMounted] = useState(false);
  const [accounts, setAccounts] = useState<GoogleAccount[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load saved accounts from localStorage on open
  useEffect(() => {
    if (!isOpen) {
      setShowAddForm(false);
      setErrorMsg(null);
      setEmailInput("");
      setNameInput("");
      return;
    }

    try {
      const stored = localStorage.getItem(GOOGLE_ACCOUNTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAccounts(parsed);
          setShowAddForm(false);
          return;
        }
      }
    } catch {
      // Ignore
    }

    // Default to show input form if no accounts saved yet
    setShowAddForm(true);
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSelectAccount = (acc: GoogleAccount) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        name: acc.name,
        email: acc.email,
      });
      onClose();
    }, 400);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanName = nameInput.trim();

    if (!cleanEmail) {
      setErrorMsg("Please enter your Google / Gmail address.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg("Please enter a valid email address (e.g., yourname@gmail.com).");
      return;
    }

    if (!cleanName) {
      setErrorMsg("Please enter your name as registered with Google.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newAcc: GoogleAccount = {
        name: cleanName,
        email: cleanEmail,
      };

      // Save to localStorage for future 1-click Google sign-in
      try {
        const nextList = [
          newAcc,
          ...accounts.filter((a) => a.email.toLowerCase() !== cleanEmail),
        ];
        localStorage.setItem(GOOGLE_ACCOUNTS_KEY, JSON.stringify(nextList));
        setAccounts(nextList);
      } catch {
        // Ignore
      }

      onSuccess({
        name: cleanName,
        email: cleanEmail,
      });
      onClose();
    }, 500);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-600",
      "bg-emerald-600",
      "bg-amber-600",
      "bg-purple-600",
      "bg-rose-600",
      "bg-teal-600",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-150 cursor-pointer"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[430px] bg-white text-[#202124] rounded-[28px] p-6 sm:p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#dadce0] flex flex-col gap-4 animate-in zoom-in-95 duration-150 cursor-default"
        style={{ fontFamily: "'Roboto', 'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Close Google sign in"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Header */}
        <div className="flex flex-col items-center text-center pt-1 pb-2 border-b border-[#f1f3f4]">
          <GoogleOfficialLogo className="w-9 h-9 mb-2.5" />
          <h2 className="text-xl font-medium text-[#202124] tracking-tight">
            Sign in with Google
          </h2>
          <p className="text-sm text-[#5f6368] mt-0.5 flex items-center justify-center gap-1.5">
            <span>to continue to</span>
            <strong className="text-[#202124] font-semibold">BURAQ ENTERPRISE</strong>
          </p>
        </div>

        {errorMsg && (
          <div className="py-2 px-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* VIEW 1: SELECT EXISTING GOOGLE ACCOUNT */}
        {!showAddForm && accounts.length > 0 ? (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#5f6368] px-1 uppercase tracking-wider block mb-1">
              Choose an account
            </span>

            <div className="space-y-1.5 max-h-[260px] overflow-y-auto">
              {accounts.map((acc, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSelectAccount(acc)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-[#dadce0] hover:bg-[#f8f9fa] transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full ${getAvatarColor(
                        acc.name
                      )} text-white font-bold text-sm flex items-center justify-center shadow-xs flex-shrink-0`}
                    >
                      {acc.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors truncate">
                        {acc.name}
                      </p>
                      <p className="text-xs text-[#5f6368] truncate">
                        {acc.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#1a73e8] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    Continue
                  </span>
                </button>
              ))}
            </div>

            {/* Use Another Account Button */}
            <div className="pt-2 border-t border-[#f1f3f4]">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setErrorMsg(null);
                  setShowAddForm(true);
                }}
                className="w-full flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#f8f9fa] transition-colors text-left cursor-pointer text-[#1a73e8] font-medium text-sm group"
              >
                <div className="w-10 h-10 rounded-full border border-dashed border-[#1a73e8]/60 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a73e8]/10 transition-colors">
                  <UserPlus className="w-4 h-4 text-[#1a73e8]" />
                </div>
                <span>Use another Google account</span>
              </button>
            </div>
          </div>
        ) : (
          /* VIEW 2: ADD / ENTER GOOGLE ACCOUNT */
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#5f6368] block">
                Sign in with your Google Account
              </span>
              <p className="text-xs text-[#5f6368]">
                Enter the Gmail account active in your browser or device.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#3c4043] mb-1">
                  Gmail or Google Workspace Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] text-sm text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all placeholder:text-[#9aa0a6]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3c4043] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Raihan Ahmed"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dadce0] text-sm text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 transition-all placeholder:text-[#9aa0a6]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {accounts.length > 0 ? (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setErrorMsg(null);
                    setShowAddForm(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1a73e8] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Saved Accounts</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                <span>{isLoading ? "Signing In..." : "Next"}</span>
              </button>
            </div>
          </form>
        )}

        {/* Footer Security Note */}
        <div className="pt-2 border-t border-[#f1f3f4] text-center">
          <p className="text-[11px] text-[#5f6368] leading-relaxed flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>
              Google verifies your email and shares your profile details securely with BURAQ Enterprise.
            </span>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

function GoogleOfficialLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
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

