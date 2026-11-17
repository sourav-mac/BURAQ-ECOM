"use client";

import { useParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { useCategories } from "@/lib/useCategories";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = String(params?.category || "");
  const category = useCategories().find((c) => c.id === categoryId);
  return <ProductGrid categoryId={categoryId} title={category?.name} />;
}
