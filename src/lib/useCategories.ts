"use client";

import { useEffect, useState } from "react";
import { api, Category } from "./api";

const STORAGE_KEY = "buraq_shop_categories";

let cache: Category[] | null = null;
let inflight: Promise<Category[]> | null = null;

function readStored(): Category[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Active categories (admin-managed). Shows the last known list instantly from
 * browser storage, then refreshes from the backend once per session.
 * `loaded` is false only until the first list (stored or fresh) is available.
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(cache ?? []);
  const [loaded, setLoaded] = useState(cache !== null);

  useEffect(() => {
    if (cache) return;
    const stored = readStored();
    if (stored) {
      setCategories(stored);
      setLoaded(true);
    }
    inflight ??= api.categories().then((c) => {
      cache = c;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
      } catch {}
      return c;
    });
    inflight
      .then((c) => {
        setCategories(c);
        setLoaded(true);
      })
      .catch(() => {
        inflight = null;
        setLoaded(true);
      });
  }, []);

  return Object.assign(categories, { loaded });
}
