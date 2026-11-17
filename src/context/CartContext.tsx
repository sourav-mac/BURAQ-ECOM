"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

/**
 * One cart per account (saved in this browser), plus a guest cart for logged-out browsing.
 * Previously a single shared key leaked one account's cart into the next login.
 */
const GUEST_KEY = "buraq_cart_guest";
const userKey = (userId: string) => `buraq_cart_user_${userId}`;
const LEGACY_SHARED_KEY = "buraq_shop_cart_v2"; // old shared cart — owner unknown, so it's discarded

function readCart(key: string): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed.filter((i) => i?.product?.id && i.quantity > 0) : [];
  } catch {
    return [];
  }
}

function mergeCarts(base: CartItem[], extra: CartItem[]): CartItem[] {
  const out = base.map((i) => ({ ...i }));
  for (const e of extra) {
    const hit = out.find((i) => i.product.id === e.product.id);
    if (hit) hit.quantity += e.quantity;
    else out.push({ ...e });
  }
  return out;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Storage key the current `items` belong to. Nothing is written until it's set,
  // so the initial empty cart never overwrites a saved one.
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const loadedKeyRef = useRef<string | null>(null); // updated synchronously (Strict Mode re-runs effects)

  // Load the right cart whenever the signed-in account changes (login / logout / switch)
  useEffect(() => {
    if (authLoading) return;
    try {
      localStorage.removeItem(LEGACY_SHARED_KEY);
    } catch {}

    const key = user ? userKey(user.id) : GUEST_KEY;
    if (key === loadedKeyRef.current) return;
    loadedKeyRef.current = key;

    let next = readCart(key);
    if (user) {
      // Items added before logging in move into this account's cart
      const guest = readCart(GUEST_KEY);
      if (guest.length) {
        next = mergeCarts(next, guest);
        try {
          localStorage.removeItem(GUEST_KEY);
        } catch {}
      }
    }
    if (user && next.length) {
      // Save the merged cart right away so the guest items are never lost
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}
    }
    setItems(next);
    setActiveKey(key);
    setIsCartOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id]);

  // Save changes to the current account's cart only
  useEffect(() => {
    if (!activeKey) return;
    try {
      localStorage.setItem(activeKey, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to persist cart", e);
    }
  }, [items, activeKey]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  // Prices are MRP (GST-inclusive) — tax is the GST already contained in the subtotal
  const tax =
    Math.round(
      items.reduce((sum, { product, quantity }) => {
        const gross = product.price * quantity;
        return sum + (gross - gross / (1 + product.gstPercent / 100));
      }, 0) * 100
    ) / 100;
  const shipping = 0; // free delivery — matches the order total charged by the backend
  const totalAmount = subtotal;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        tax,
        shipping,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}
