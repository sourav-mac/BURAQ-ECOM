import { redirect } from "next/navigation";

export default function LightingProductsPage() {
  redirect("/products?sector=lighting");
}
