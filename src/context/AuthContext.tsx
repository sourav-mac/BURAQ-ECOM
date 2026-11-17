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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status: sessionStatus } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from stored token or NextAuth Google session
  useEffect(() => {
    if (sessionStatus === "loading") return;

    // Existing BURAQ login (email/password or an earlier Google exchange)
    if (tokenStore.get()) {
      api
        .me()
        .then(setUser)
        .catch(() => tokenStore.clear())
        .finally(() => setIsLoading(false));
      return;
    }

    // Fresh Google sign-in: exchange the verified Google ID token for a BURAQ
    // customer login, so the customer is created in the backend (Retail) and can order.
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

    if (!tokenStore.get()) {
      setIsLoading(false);
      return;
    }

    api
      .me()
      .then(setUser)
      .catch(() => tokenStore.clear())
      .finally(() => setIsLoading(false));
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
