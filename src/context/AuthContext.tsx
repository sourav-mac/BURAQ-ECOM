"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "CUSTOMER";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("buraq_ecom_user");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.warn("Failed to read user session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    // Check credentials (mocking/local storage authentication for customer portal)
    if (!email || !pass) {
      return { success: false, message: "Please fill in email and password." };
    }

    try {
      const usersStr = localStorage.getItem("buraq_registered_users");
      const registered = usersStr ? JSON.parse(usersStr) : [];
      const found = registered.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (found) {
        if (found.password === pass) {
          const authUser: User = { id: found.id, name: found.name, email: found.email, phone: found.phone, role: "CUSTOMER" };
          setUser(authUser);
          localStorage.setItem("buraq_ecom_user", JSON.stringify(authUser));
          return { success: true };
        } else {
          return { success: false, message: "Invalid email or password." };
        }
      }

      // Default demo customer account if not registered yet
      if (pass.length >= 6) {
        const demoUser: User = {
          id: "cust-" + Date.now(),
          name: email.split("@")[0].toUpperCase(),
          email,
          role: "CUSTOMER",
        };
        setUser(demoUser);
        localStorage.setItem("buraq_ecom_user", JSON.stringify(demoUser));
        return { success: true };
      } else {
        return { success: false, message: "Password must be at least 6 characters." };
      }
    } catch (e: any) {
      return { success: false, message: e.message || "Failed to log in" };
    }
  };

  const signup = async (name: string, email: string, phone: string, pass: string) => {
    if (!name || !email || !pass) {
      return { success: false, message: "Please fill in all required fields." };
    }
    if (pass.length < 6) {
      return { success: false, message: "Password must be at least 6 characters." };
    }

    try {
      const usersStr = localStorage.getItem("buraq_registered_users");
      const registered = usersStr ? JSON.parse(usersStr) : [];
      if (registered.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: "An account with this email already exists." };
      }

      const newUser = {
        id: "cust-" + Date.now(),
        name,
        email,
        phone,
        password: pass,
        role: "CUSTOMER",
      };

      registered.push(newUser);
      localStorage.setItem("buraq_registered_users", JSON.stringify(registered));

      const authUser: User = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, role: "CUSTOMER" };
      setUser(authUser);
      localStorage.setItem("buraq_ecom_user", JSON.stringify(authUser));
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message || "Failed to sign up" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("buraq_ecom_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
