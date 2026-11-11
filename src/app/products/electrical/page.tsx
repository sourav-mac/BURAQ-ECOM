import { redirect } from "next/navigation";

export default function ElectricalProductsPage() {
  redirect("/products?sector=electrical");
}
