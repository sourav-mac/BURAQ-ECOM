import { redirect } from "next/navigation";

export default function SolarProductsPage() {
  redirect("/products?sector=solar");
}
