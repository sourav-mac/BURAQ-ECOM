"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { api, tokenStore, ShopUser } from "@/lib/api";

export type User = ShopUser;

type Result = { success: boolean; message?: string };

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<Result>;
  signup: (name: string, email: string, phone: string, pass: string) => Promise<Result>;
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
    } catch (e) {
      return { success: false, message: errMsg(e, "Login failed") };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, phone: string, pass: string): Promise<Result> => {
    if (pass.length < 6) return { success: false, message: "Password must be at least 6 characters." };
    try {
      const { token, user } = await api.register({ name, email, phone: phone || undefined, password: pass });
      tokenStore.set(token);
      setUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, message: errMsg(e, "Sign up failed") };
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
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
