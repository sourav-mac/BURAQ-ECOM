"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { useCategories } from "@/lib/useCategories";

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = String(params?.category || "");
  const category = useCategories().find((c) => c.id === categoryId);
  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              router.back();
            } else {
              router.push("/");
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#07543F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>
      <ProductGrid categoryId={categoryId} title={category?.name} />
    </div>
  );
}
