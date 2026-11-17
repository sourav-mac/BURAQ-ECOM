"use client";

import { useEffect, useState } from "react";
import { api, Category } from "./api";

let cache: Category[] | null = null;
let inflight: Promise<Category[]> | null = null;

/** Active categories that have products (cached for the session). */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(cache ?? []);
  useEffect(() => {
    if (cache) return;
    inflight ??= api.categories().then((c) => (cache = c));
    inflight.then(setCategories).catch(() => {
      inflight = null;
    });
  }, []);
  return categories;
}
