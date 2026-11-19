"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { api, tokenStore, ShopUser } from "@/lib/api";

export type User = ShopUser;

type Result = { success: boolean; message?: string; status?: number; retryAfter?: number };

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<Result>;
  /** Step 1: send the email verification code */
  signup: (name: string, email: string, phone: string, pass: string) => Promise<Result & { resendInSeconds?: number }>;
  /** Step 2: verify the code → creates the account and logs in */
  verifySignup: (email: string, otp: string) => Promise<Result>;
  /** Forgot password: send code, then reset (logs in on success) */
  requestPasswordReset: (email: string) => Promise<Result & { resendInSeconds?: number }>;
  resetPassword: (email: string, otp: string, password: string) => Promise<Result>;
  logout: () => void;
  updateProfile: (data: Partial<Omit<User, "id" | "email">>) => Promise<Result>;
  updateAvatar: (file: File | null) => Promise<Result>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const errMsg = (e: unknown, fallback: string) => (e instanceof Error ? e.message : fallback);

const USER_CACHE_KEY = "buraq_shop_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status: sessionStatus } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1) Existing BURAQ login: show the cached user instantly (no "Sign in" flash on refresh),
  //    then re-validate with the backend in the background. Doesn't wait for NextAuth.
  useEffect(() => {
    if (!tokenStore.get()) return;
    try {
      const cached = localStorage.getItem(USER_CACHE_KEY);
      if (cached) {
        setUser(JSON.parse(cached));
        setIsLoading(false);
      }
    } catch {}
    api
      .me()
      .then(setUser)
      .catch((e) => {
        // Only log out when the token is really invalid — not on a network hiccup
        if (e?.status === 401 || e?.status === 403 || e?.status === 404) {
          tokenStore.clear();
          setUser(null);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Keep the cached copy in sync with the signed-in user
  useEffect(() => {
    try {
      if (user) localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
      else if (!tokenStore.get()) localStorage.removeItem(USER_CACHE_KEY);
    } catch {}
  }, [user]);

  // 2) Fresh Google sign-in (no BURAQ token yet): wait for NextAuth, then exchange
  //    the verified Google ID token for a BURAQ customer login.
  useEffect(() => {
    if (tokenStore.get()) return; // handled above
    if (sessionStatus === "loading") return;

    const idToken = (session as any)?.idToken as string | undefined;
    if (idToken) {
      api
        .googleLogin(idToken)
        .then(({ token, user }) => {
          tokenStore.set(token);
          setUser(user);
        })
        .catch((e) => {
          console.warn("Google sign-in exchange failed:", e);
          nextAuthSignOut({ redirect: false }).catch(() => {});
          alert(errMsg(e, "Google sign-in failed"));
        })
        .finally(() => setIsLoading(false));
      return;
    }

    setIsLoading(false); // not signed in
  }, [session, sessionStatus]);

  const login = useCallback(async (email: string, pass: string): Promise<Result> => {
    try {
      const { token, user } = await api.login(email, pass);
      tokenStore.set(token);
      setUser(user);
      return { success: true };
    } catch (e: any) {
      return {
        success: false,
        message: errMsg(e, "Login failed"),
        status: e?.status,
        retryAfter: e?.retryAfter,
      };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, phone: string, pass: string) => {
    try {
      const r = await api.register({ name, email, phone: phone || undefined, password: pass });
      return { success: true, resendInSeconds: r.resendInSeconds };
    } catch (e) {
      return { success: false, message: errMsg(e, "Sign up failed") };
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    try {
      const r = await api.forgotPassword(email);
      return { success: true, resendInSeconds: r.resendInSeconds };
    } catch (e) {
      return { success: false, message: errMsg(e, "Couldn't send the code") };
    }
  }, []);

  const resetPassword = useCallback(async (email: string, otp: string, password: string): Promise<Result> => {
    try {
      const { token, user } = await api.resetPassword(email, otp, password);
      tokenStore.set(token);
      setUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, message: errMsg(e, "Couldn't reset the password") };
    }
  }, []);

  const verifySignup = useCallback(async (email: string, otp: string): Promise<Result> => {
    try {
      const { token, user } = await api.verifyRegister(email, otp);
      tokenStore.set(token);
      setUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, message: errMsg(e, "Verification failed") };
    }
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
    nextAuthSignOut({ redirect: false }).catch(() => {});
  }, []);

  const updateProfile = useCallback(async (data: Partial<Omit<User, "id" | "email">>): Promise<Result> => {
    try {
      const clean = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v ?? ""]));
      setUser(await api.updateMe(clean));
      return { success: true };
    } catch (e) {
      return { success: false, message: errMsg(e, "Could not save") };
    }
  }, []);

  // Upload (or remove, with null) the profile photo — stored on Cloudinary via the backend
  const updateAvatar = useCallback(async (file: File | null): Promise<Result> => {
    try {
      setUser(file ? await api.uploadAvatar(file) : await api.removeAvatar());
      return { success: true };
    } catch (e) {
      return { success: false, message: errMsg(e, "Could not update photo") };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, verifySignup, requestPasswordReset, resetPassword, logout, updateProfile, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

const AUTH_FALLBACK: AuthContextType = {
  user: null,
  isLoading: false,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  verifySignup: async () => ({ success: false }),
  requestPasswordReset: async () => ({ success: false }),
  resetPassword: async () => ({ success: false }),
  logout: () => {},
  updateProfile: async () => ({ success: false }),
  updateAvatar: async () => ({ success: false }),
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  // Outside AuthProvider (e.g. Next.js /_global-error prerender): return a safe no-op fallback
  return ctx ?? AUTH_FALLBACK;
}
