"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { clean, check, validate, fieldErrorCls } from "@/lib/validation";

type Mode = "login" | "signup";

const inputCls =
  "w-full h-10 px-4 bg-white rounded-full border border-[#D9D3C4] hover:border-[#86948a] focus:border-[#07543F] focus:ring-2 focus:ring-[#07543F]/10 text-sm text-[#10201F] placeholder:text-[#9AA19C] focus:outline-none transition-colors";
const labelCls = "block text-xs font-semibold text-[#445048] mb-1.5 ml-1";

export function AuthCard({ initialMode }: { initialMode: Mode }) {
  const router = useRouter();
  const { login, signup, verifySignup, requestPasswordReset, resetPassword } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"name" | "phone" | "email" | "password", string>>>({});
  // Email verification (Create Account step 2)
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  // Forgot password: "email" → enter email, "code" → code + new password
  const [forgot, setForgot] = useState<null | "email" | "code">(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const openForgot = () => {
    setForgot("email");
    setError(null);
    setNotice(null);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const sendResetCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const emailErr = check.email(email);
    if (emailErr) return setError(emailErr);
    if (forgot === "code" && resendIn > 0) return;
    setIsLoading(true);
    setError(null);
    const res = await requestPasswordReset(email.trim());
    setIsLoading(false);
    if (!res.success) return setError(res.message || "Couldn't send the code.");
    setNotice(forgot === "code" ? "A new code has been sent." : null);
    setOtp("");
    setForgot("code");
    setResendIn(res.resendInSeconds ?? 60);
  };

  const submitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) return setError("Enter the 6-digit code from your email.");
    const pwErr = check.password(newPassword, true);
    if (pwErr) return setError(pwErr);
    if (newPassword !== confirmPassword) return setError("Passwords don't match.");
    setIsLoading(true);
    setError(null);
    const res = await resetPassword(email.trim(), otp, newPassword);
    setIsLoading(false);
    if (res.success) handleSuccessRedirect();
    else setError(res.message || "Couldn't reset the password.");
  };

  useEffect(() => {
    if (forgot === "code") otpRef.current?.focus();
  }, [forgot]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  useEffect(() => {
    if (otpStep) otpRef.current?.focus();
  }, [otpStep]);

  const isSignup = mode === "signup";

  const switchMode = () => {
    const next: Mode = isSignup ? "login" : "signup";
    setMode(next);
    setForgot(null);
    setError(null);
    setFieldErrors({});
    window.history.replaceState(null, "", (next === "signup" ? "/signup" : "/signin") + window.location.search);
  };

  const handleSuccessRedirect = () => {
    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next && next.startsWith("/") && !next.startsWith("//") ? next : "/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate({
      name: isSignup ? check.name(name) : null,
      phone: isSignup ? check.phone(phone, false) : null,
      email: check.email(email),
      password: check.password(password, isSignup),
    });
    setFieldErrors(errs ?? {});
    if (errs) {
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    if (isSignup) {
      // Step 1: email a verification code
      const res = await signup(name.trim(), email.trim(), phone.trim(), password);
      setIsLoading(false);
      if (!res.success) return setError(res.message || "Something went wrong.");
      setOtp("");
      setNotice(null);
      setOtpStep(true);
      setResendIn(res.resendInSeconds ?? 60);
      return;
    }
    const res = await login(email.trim(), password);
    setIsLoading(false);
    if (res.success) handleSuccessRedirect();
    else setError(res.message || "Something went wrong.");
  };

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!/^\d{6}$/.test(otp)) return setError("Enter the 6-digit code from your email.");
    setIsLoading(true);
    setError(null);
    const res = await verifySignup(email.trim(), otp);
    setIsLoading(false);
    if (res.success) handleSuccessRedirect();
    else setError(res.message || "Verification failed.");
  };

  const handleResend = async () => {
    if (resendIn > 0 || isLoading) return;
    setIsLoading(true);
    setError(null);
    const res = await signup(name.trim(), email.trim(), phone.trim(), password);
    setIsLoading(false);
    if (!res.success) return setError(res.message || "Couldn't resend the code.");
    setOtp("");
    setNotice("A new code has been sent.");
    setResendIn(res.resendInSeconds ?? 60);
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
          {forgot ? (
            forgot === "email" ? (
              <form onSubmit={sendResetCode} className="animate-[authFade_0.35s_ease]">
                <h1 className="text-2xl font-bold text-[#10201F] tracking-tight">Forgot password?</h1>
                <p className="text-sm text-[#667085] mt-1">Enter your registered email and we&apos;ll send you a code to reset it.</p>

                <label className={`${labelCls} mt-6`}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(clean.email(e.target.value));
                    setError(null);
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={100}
                  autoFocus
                  className={inputCls}
                />
                {error && <p className={fieldErrorCls}>{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 mt-5 rounded-full bg-[#07543F] hover:bg-[#053E2E] active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  Send code
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForgot(null);
                    setError(null);
                  }}
                  className="mt-5 text-sm text-[#667085] hover:text-[#10201F] cursor-pointer"
                >
                  Back to log in
                </button>
              </form>
            ) : (
              <form onSubmit={submitReset} className="animate-[authFade_0.35s_ease]">
                <h1 className="text-2xl font-bold text-[#10201F] tracking-tight">Reset password</h1>
                <p className="text-sm text-[#667085] mt-1">
                  If <span className="font-semibold text-[#10201F] break-all">{email}</span> is registered, we&apos;ve sent a 6-digit code to it.
                </p>

                <label className={`${labelCls} mt-5`}>Verification code</label>
                <input
                  ref={otpRef}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError(null);
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="••••••"
                  className={`${inputCls} h-12 text-center text-xl font-bold tracking-[0.5em]`}
                />

                <label className={`${labelCls} mt-3.5`}>New password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Min. 6 characters, letters + numbers"
                  autoComplete="new-password"
                  maxLength={128}
                  className={inputCls}
                />
                <label className={`${labelCls} mt-3.5`}>Confirm new password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError(null);
                  }}
                  autoComplete="new-password"
                  maxLength={128}
                  className={inputCls}
                />
                <label className="mt-2 ml-1 flex items-center gap-2 text-xs text-[#667085] cursor-pointer select-none">
                  <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} className="accent-[#07543F]" />
                  Show passwords
                </label>

                {error && <p className={fieldErrorCls}>{error}</p>}
                {!error && notice && <p className="mt-1 text-[11px] font-medium text-[#07543F]">{notice}</p>}

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full h-11 mt-5 rounded-full bg-[#07543F] hover:bg-[#053E2E] active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  Reset password &amp; log in
                </button>

                <div className="mt-5 flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setForgot("email");
                      setError(null);
                    }}
                    className="text-[#667085] hover:text-[#10201F] cursor-pointer"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={() => sendResetCode()}
                    disabled={resendIn > 0 || isLoading}
                    className="font-semibold text-[#07543F] hover:underline disabled:text-[#9AA19C] disabled:no-underline cursor-pointer disabled:cursor-default"
                  >
                    {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                  </button>
                </div>
              </form>
            )
          ) : otpStep ? (
            <form onSubmit={handleVerify} className="animate-[authFade_0.35s_ease]">
              <h1 className="text-2xl font-bold text-[#10201F] tracking-tight">Verify your email</h1>
              <p className="text-sm text-[#667085] mt-1">
                We sent a 6-digit code to <span className="font-semibold text-[#10201F] break-all">{email}</span>
              </p>

              <label className={`${labelCls} mt-6`}>Verification code</label>
              <input
                ref={otpRef}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setError(null);
                }}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="••••••"
                className={`${inputCls} h-12 text-center text-xl font-bold tracking-[0.5em]`}
              />
              {error && <p className={fieldErrorCls}>{error}</p>}
              {!error && notice && <p className="mt-1 text-[11px] font-medium text-[#07543F]">{notice}</p>}

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full h-11 mt-5 rounded-full bg-[#07543F] hover:bg-[#053E2E] active:scale-[0.99] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Verify &amp; create account
              </button>

              <div className="mt-5 flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setOtpStep(false);
                    setError(null);
                  }}
                  className="text-[#667085] hover:text-[#10201F] cursor-pointer"
                >
                  Change details
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendIn > 0 || isLoading}
                  className="font-semibold text-[#07543F] hover:underline disabled:text-[#9AA19C] disabled:no-underline cursor-pointer disabled:cursor-default"
                >
                  {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                </button>
              </div>
              <p className="mt-4 text-xs text-[#9AA19C]">Didn&apos;t get it? Check your spam folder. The code expires in 10 minutes.</p>
            </form>
          ) : (
            <>
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
                      onChange={(e) => setName(clean.name(e.target.value))}
                      placeholder="Your name"
                      autoComplete="name"
                      maxLength={60}
                      className={inputCls}
                    />
                    {fieldErrors.name && <p className={fieldErrorCls}>{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      tabIndex={isSignup ? 0 : -1}
                      onChange={(e) => setPhone(clean.phone(e.target.value))}
                      placeholder="Optional"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      className={inputCls}
                    />
                    {fieldErrors.phone && <p className={fieldErrorCls}>{fieldErrors.phone}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className={labelCls}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(clean.email(e.target.value))}
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={100}
                className={inputCls}
              />
              {fieldErrors.email && <p className={fieldErrorCls}>{fieldErrors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className={labelCls}>Password</label>
                {!isSignup && (
                  <button
                    type="button"
                    onClick={openForgot}
                    className="mb-1.5 mr-1 text-xs font-semibold text-[#07543F] hover:text-[#053E2E] cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignup ? "Min. 6 characters, letters + numbers" : "••••••••"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  maxLength={128}
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
              {fieldErrors.password && <p className={fieldErrorCls}>{fieldErrors.password}</p>}
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
              {isSignup ? "Continue" : "Log in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[#667085]">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-[#07543F] hover:text-[#053E2E] cursor-pointer"
            >
              {isSignup ? "Log in" : "Create one"}
            </button>
          </p>
            </>
          )}
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
