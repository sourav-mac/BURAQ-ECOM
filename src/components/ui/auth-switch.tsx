"use client";

import React, { useState, type FormEvent, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { GoogleAuthModal } from "@/components/auth/GoogleAuthModal";

function AuthSwitchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from");
  const redirectParam = searchParams?.get("redirect");

  // Determine return destination when user clicks "Return to BURAQ":
  // As requested by user: Must return to the product page (and same place/sector), NOT the home page!
  const getReturnDestination = () => {
    if (fromParam && fromParam !== "/") return fromParam;
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("buraq_product_return_url");
      if (stored && stored !== "/") return stored;
    }
    if (redirectParam && redirectParam.startsWith("/products")) return redirectParam;
    return "/products";
  };

  const returnDestination = getReturnDestination();

  const handleReturnToBuraq = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(getReturnDestination());
  };

  const redirectPath = redirectParam || "/products";

  const { login, registerAccount, authenticateUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const handleGoogleAuth = () => {
    setIsGoogleModalOpen(true);
  };

  const handleGoogleSuccess = (googleUser: { name: string; email: string }) => {
    login({
      name: googleUser.name,
      email: googleUser.email,
      role: "Verified Google Buyer",
    });
    router.push(redirectPath);
  };

  const onSignInSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMsg(null);

    if (!signInEmail.trim() || !signInPassword) {
      setStatusMsg("Please enter both your email or phone number and password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = authenticateUser(signInEmail, signInPassword);
      if (!res.success) {
        setStatusMsg(res.error || "Authentication failed.");
        return;
      }

      router.push(redirectPath);
    }, 400);
  };

  const onSignUpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMsg(null);

    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword) {
      setStatusMsg("Please fill in your name, email, and password.");
      return;
    }

    if (signUpPassword.length < 6) {
      setStatusMsg("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = registerAccount({
        name: signUpName.trim(),
        email: signUpEmail.trim(),
        phone: signUpPhone.trim() || undefined,
        password: signUpPassword,
      });

      if (!res.success) {
        setStatusMsg(res.error || "Failed to create account.");
        return;
      }

      router.push(redirectPath);
    }, 500);
  };

  return (
    <div className="auth-switch">
      <style>{`
        .auth-switch,
        .auth-switch * {
          box-sizing: border-box;
        }

        /* 100% viewport single screen - no scroll down */
        .auth-switch {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #EBF5F0 0%, #FFFDEB 45%, #E3EFE8 100%);
          height: 100vh;
          max-height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          position: relative;
        }

        /* Centered Box with clean white and emerald border */
        .container {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 520px;
          max-height: calc(100vh - 32px);
          background: #FFFFFF;
          border-radius: 24px;
          box-shadow: 0 25px 60px -15px rgba(16, 32, 31, 0.16), 0 0 0 1px rgba(27, 67, 50, 0.08);
          overflow: hidden;
          border: 1px solid rgba(27, 67, 50, 0.12);
        }

        .forms-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .signin-signup {
          position: absolute;
          top: 50%;
          left: 0;
          width: 50%;
          transform: translate3d(100%, -50%, 0);
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          display: grid;
          grid-template-columns: 1fr;
          z-index: 5;
        }

        form {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 2.5rem;
          overflow: hidden;
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          width: 100%;
          will-change: opacity, transform;
        }

        form.sign-in-form {
          opacity: 1;
          transform: scale(1);
          pointer-events: all;
          z-index: 2;
          transition: opacity 0.35s ease 0.18s, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.18s;
        }

        form.sign-up-form {
          opacity: 0;
          transform: scale(0.95);
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.18s ease 0s, transform 0.18s ease 0s;
        }

        .title {
          font-size: 1.8rem;
          color: #10201F;
          margin-bottom: 2px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .subtitle {
          font-size: 0.8rem;
          color: #64748B;
          margin-bottom: 10px;
          text-align: center;
        }

        .input-field {
          max-width: 360px;
          width: 100%;
          background-color: #F8FAF9;
          margin: 4px 0;
          height: 42px;
          border-radius: 12px;
          display: grid;
          grid-template-columns: 14% 86%;
          padding: 0 0.4rem;
          position: relative;
          transition: 0.25s;
          border: 1px solid #D1E3D8;
        }

        .input-field:focus-within {
          background-color: #FFFFFF;
          border-color: #1b4332;
          box-shadow: 0 0 0 2px rgba(27, 67, 50, 0.16);
        }

        .input-field i {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1b4332;
          transition: 0.25s;
        }

        .input-field input {
          background: none;
          outline: none;
          border: none;
          line-height: 1;
          font-weight: 600;
          font-size: 0.88rem;
          color: #10201F;
          width: 100%;
        }

        .input-field input::placeholder {
          color: #94A3B8;
          font-weight: 400;
          font-size: 0.84rem;
        }

        .btn {
          width: 100%;
          max-width: 360px;
          background-color: #1b4332;
          border: none;
          outline: none;
          height: 44px;
          border-radius: 9999px;
          color: #FFFFFF;
          font-weight: 700;
          margin: 8px 0 2px 0;
          cursor: pointer;
          transition: 0.25s;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn:hover {
          background-color: #10201F;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(16, 32, 31, 0.25);
        }

        .panels-container {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .panel {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-around;
          text-align: center;
          z-index: 6;
        }

        .left-panel {
          pointer-events: all;
          padding: 2.5rem 13% 2rem 9%;
        }

        .right-panel {
          pointer-events: none;
          padding: 2.5rem 9% 2rem 13%;
        }

        .panel .content {
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform, opacity;
        }

        .left-panel .content {
          transform: translate3d(0, 0, 0);
          opacity: 1;
          pointer-events: all;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s, opacity 0.4s ease 0.15s;
        }

        .right-panel .content {
          transform: translate3d(500px, 0, 0);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease 0s, opacity 0.18s ease 0s;
        }

        .panel h3 {
          font-weight: 800;
          line-height: 1.15;
          font-size: 1.65rem;
          margin-bottom: 8px;
          color: #FFFDEB;
          letter-spacing: -0.02em;
        }

        .panel p {
          font-size: 0.86rem;
          padding: 0.3rem 0 1rem 0;
          line-height: 1.45;
          color: #E2E8F0;
          max-width: 290px;
        }

        .btn.transparent {
          margin: 0;
          background: rgba(255, 255, 255, 0.12);
          border: 2px solid #FFFDEB;
          width: 140px;
          height: 40px;
          font-weight: 700;
          font-size: 0.84rem;
          border-radius: 9999px;
          backdrop-blur: 4px;
          color: #FFFDEB;
          cursor: pointer;
          transition: 0.25s;
        }

        .btn.transparent:hover {
          background: #FFFDEB;
          color: #1b4332;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .container.sign-up-mode:before {
          transform: translate3d(100%, -50%, 0);
          right: 52%;
        }

        .container.sign-up-mode .left-panel .content {
          transform: translate3d(-500px, 0, 0);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.25s ease 0s, opacity 0.18s ease 0s;
        }

        .container.sign-up-mode .right-panel .content {
          transform: translate3d(0, 0, 0);
          opacity: 1;
          pointer-events: all;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s, opacity 0.4s ease 0.15s;
        }

        .container.sign-up-mode .signin-signup {
          transform: translate3d(0%, -50%, 0);
        }

        .container.sign-up-mode form.sign-in-form {
          opacity: 0;
          transform: scale(0.95);
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.18s ease 0s, transform 0.18s ease 0s;
        }

        .container.sign-up-mode form.sign-up-form {
          opacity: 1;
          transform: scale(1);
          pointer-events: all;
          z-index: 2;
          transition: opacity 0.35s ease 0.18s, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.18s;
        }

        .container.sign-up-mode .left-panel {
          pointer-events: none;
        }

        .container.sign-up-mode .right-panel {
          pointer-events: all;
        }

        /* The signature swing curved circle in BURAQ green */
        .container:before {
          content: "";
          position: absolute;
          height: 2000px;
          width: 2000px;
          top: -10%;
          right: 48%;
          transform: translate3d(0, -50%, 0);
          background: linear-gradient(-45deg, #10201F 0%, #1b4332 55%, #25A170 100%);
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), right 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          border-radius: 50%;
          z-index: 6;
        }

        .forgot-password-btn {
          background: none;
          border: none;
          color: #10201F;
          font-size: 0.84rem;
          font-weight: 600;
          padding: 6px 0;
          margin: 4px 0 8px 0;
          cursor: pointer;
          transition: color 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }

        .forgot-password-btn:hover {
          color: #25A170;
          text-decoration: underline;
        }

        .google-pill-btn {
          width: 100%;
          max-width: 360px;
          height: 44px;
          background-color: #F8FAF9;
          border: 1.5px solid #CBD5E1;
          border-radius: 9999px;
          color: #1E293B;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .google-pill-btn:hover {
          background-color: #FFFFFF;
          border-color: #1b4332;
          color: #1b4332;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(27, 67, 50, 0.12);
        }

        .google-pill-btn:active {
          transform: translateY(0);
        }

        .back-home-btn {
          position: absolute;
          top: 20px;
          left: 24px;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #1b4332;
          font-size: 0.82rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          padding: 8px 18px;
          border-radius: 9999px;
          border: 1px solid rgba(27, 67, 50, 0.18);
          box-shadow: 0 4px 16px rgba(16, 32, 31, 0.08);
          text-decoration: none;
          transition: 0.2s;
        }

        .back-home-btn:hover {
          background: #FFFFFF;
          border-color: #1b4332;
          color: #10201F;
          transform: translateX(-3px);
          box-shadow: 0 6px 20px rgba(16, 32, 31, 0.12);
        }

        @media (max-width: 870px) {
          .auth-switch {
            overflow-y: auto;
            height: auto;
            min-height: 100vh;
            padding: 40px 16px 24px 16px;
          }
          .container {
            min-height: 720px;
            height: auto;
            max-height: none;
          }
          .signin-signup {
            width: 100%;
            top: 92%;
            transform: translate3d(-50%, -100%, 0);
            transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .signin-signup,
          .container.sign-up-mode .signin-signup {
            left: 50%;
          }
          .panels-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
          }
          .panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2rem 6%;
            grid-column: 1 / 2;
          }
          .right-panel {
            grid-row: 3 / 4;
          }
          .left-panel {
            grid-row: 1 / 2;
          }
          .panel .content {
            padding-right: 10%;
          }
          .panel h3 {
            font-size: 1.25rem;
          }
          .panel p {
            font-size: 0.72rem;
            padding: 0.3rem 0;
          }
          .btn.transparent {
            width: 110px;
            height: 36px;
            font-size: 0.72rem;
          }
          .container:before {
            width: 1500px;
            height: 1500px;
            transform: translate3d(-50%, 0, 0);
            left: 50%;
            top: -450px;
            bottom: initial;
            right: initial;
            transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .container.sign-up-mode:before {
            transform: translate3d(-50%, 100%, 0);
            top: -450px;
          }
          .container.sign-up-mode .left-panel .content {
            transform: translate3d(0, -250px, 0);
            opacity: 0;
            transition: transform 0.25s ease 0s, opacity 0.18s ease 0s;
          }
          .container.sign-up-mode .right-panel .content {
            transform: translate3d(0, 0, 0);
            opacity: 1;
            transition: transform 0.5s ease 0.15s, opacity 0.35s ease 0.15s;
          }
          .right-panel .content {
            transform: translate3d(0, 250px, 0);
            opacity: 0;
            transition: transform 0.25s ease 0s, opacity 0.18s ease 0s;
          }
          .left-panel .content {
            transform: translate3d(0, 0, 0);
            opacity: 1;
            transition: transform 0.5s ease 0.15s, opacity 0.35s ease 0.15s;
          }
          .container.sign-up-mode .signin-signup {
            top: 6%;
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 570px) {
          form {
            padding: 0 1.2rem;
          }
          .panel .content {
            padding: 0.4rem 0.4rem;
          }
          .title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* Subtle Aurora Ambient Blooms (Green and Cream-White) */}
      <div className="absolute top-12 left-12 w-96 h-96 bg-buraq-primary/10 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute bottom-12 right-12 w-96 h-96 bg-[#25A170]/12 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFFDEB]/60 rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Floating Return Link — Navigates back to the product page, never the home page */}
      <Link
        href={returnDestination}
        onClick={handleReturnToBuraq}
        className="back-home-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to BURAQ</span>
      </Link>

      {/* Centered Box */}
      <div className={isSignUp ? "container sign-up-mode" : "container"}>
        <div className="forms-container">
          <div className="signin-signup">
            {/* SIGN IN FORM */}
            <form className="sign-in-form" onSubmit={onSignInSubmit}>
              <h2 className="title">Sign in</h2>
              <p className="subtitle">Welcome back! Please enter your details.</p>

              {statusMsg && (
                <div className="w-full max-w-[360px] py-1.5 px-2.5 mb-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
                  {statusMsg}
                </div>
              )}

              <div className="input-field">
                <i>
                  <Mail className="w-4 h-4" />
                </i>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
              </div>

              <div className="input-field">
                <i>
                  <Lock className="w-4 h-4" />
                </i>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn solid">
                <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
              </button>

              <button
                type="button"
                onClick={() => alert("Password reset instructions will be sent to your registered email.")}
                className="forgot-password-btn"
              >
                Forgotten password?
              </button>

              <button
                type="button"
                onClick={handleGoogleAuth}
                className="google-pill-btn"
                title="Log in with Google"
              >
                <GoogleLogo />
                <span>Log in with Google</span>
              </button>
            </form>

            {/* SIGN UP FORM */}
            <form className="sign-up-form" onSubmit={onSignUpSubmit}>
              <h2 className="title">Sign up</h2>
              <p className="subtitle">Create your verified BURAQ procurement account.</p>

              {statusMsg && (
                <div className="w-full max-w-[360px] py-1.5 px-2.5 mb-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
                  {statusMsg}
                </div>
              )}

              <div className="input-field">
                <i>
                  <User className="w-4 h-4" />
                </i>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                />
              </div>

              <div className="input-field">
                <i>
                  <Mail className="w-4 h-4" />
                </i>
                <input
                  type="email"
                  required
                  placeholder="Official Email Address"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>

              <div className="input-field">
                <i>
                  <Phone className="w-4 h-4" />
                </i>
                <input
                  type="tel"
                  placeholder="Phone Number (+91)"
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value)}
                />
              </div>

              <div className="input-field">
                <i>
                  <Lock className="w-4 h-4" />
                </i>
                <input
                  type="password"
                  required
                  placeholder="Create Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? "Signing Up..." : "Sign Up"}</span>
              </button>

              <button
                type="button"
                onClick={handleGoogleAuth}
                className="google-pill-btn"
                title="Log in with Google"
                style={{ marginTop: "10px" }}
              >
                <GoogleLogo />
                <span>Log in with Google</span>
              </button>
            </form>
          </div>
        </div>

        {/* SWING PANELS IN BURAQ EMERALD GREEN */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <div className="mb-3">
                <Image
                  src="/images/buraq-logo.png"
                  alt="BURAQ ENTERPRISE"
                  width={130}
                  height={42}
                  className="h-9 w-auto object-contain brightness-0 invert"
                />
              </div>
              <h3>New to BURAQ?</h3>
              <p>
                Join Bengal&apos;s verified distributor for commercial lighting, solar components, and industrial electrical switchgear.
              </p>
              <button
                type="button"
                className="btn transparent"
                onClick={() => {
                  setIsSignUp(true);
                  setStatusMsg(null);
                }}
              >
                Sign up
              </button>
            </div>
          </div>

          <div className="panel right-panel">
            <div className="content">
              <div className="mb-3">
                <Image
                  src="/images/buraq-logo.png"
                  alt="BURAQ ENTERPRISE"
                  width={130}
                  height={42}
                  className="h-9 w-auto object-contain brightness-0 invert"
                />
              </div>
              <h3>Already Registered?</h3>
              <p>
                Sign in to manage active contractor BOQs, project inquiries, and verified offline wholesale quotations.
              </p>
              <button
                type="button"
                className="btn transparent"
                onClick={() => {
                  setIsSignUp(false);
                  setStatusMsg(null);
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real Google Account Chooser Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSuccess={handleGoogleSuccess}
      />
    </div>
  );
}

export default function AuthSwitch() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFDEB] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-buraq-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthSwitchContent />
    </Suspense>
  );
}

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "20px", height: "20px", flexShrink: 0 }}
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
