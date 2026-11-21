"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, ReceiptText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api, inr, ShopOrder, OrderStatus, ORDER_STATUS_LABEL } from "@/lib/api";
import { ProductImage } from "@/components/ProductImage";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const STATUS_CLS: Partial<Record<OrderStatus, string>> = {
  DISPATCHED: "text-[#1D4ED8]",
  DELIVERED: "text-[#10201F]",
  REJECTED: "text-[#C2410C]",
  CANCELLED: "text-[#C2410C]",
};

export default function OrdersPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [orders, setOrders] = useState<ShopOrder[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/signin?next=/orders");
      return;
    }
    api.orders().then(setOrders).catch((e) => setError(e.message));
  }, [user, isLoading, router]);

  if (error) {
    return (
      <div className="flex-1 py-20 text-center px-4">
        <p className="font-semibold text-[#10201F]">Couldn&apos;t load your orders</p>
        <p className="text-sm text-[#667085] mt-1">{error}</p>
      </div>
    );
  }

  if (!orders) {
    return (
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-[#E2DED5]/60 rounded" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 bg-[#E2DED5]/30 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-xl font-bold text-[#10201F]">My orders</h1>
      <p className="text-sm text-[#667085] mt-0.5">
        {orders.length} {orders.length === 1 ? "order" : "orders"}
      </p>

      {orders.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#F2F7F4] flex items-center justify-center">
            <Package className="w-5 h-5 text-[#07543F]" />
          </div>
          <p className="mt-4 font-semibold text-[#10201F]">No orders yet</p>
          <p className="text-sm text-[#667085] mt-1">Your placed orders will show up here.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex h-10 px-5 items-center rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-white text-sm font-semibold"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-[#EFECE3] border-y border-[#EFECE3]">
          {orders.map((o) => {
            const open = openId === o.id;
            const count = o.items.reduce((n, i) => n + i.quantity, 0);
            const toggle = () => setOpenId(open ? null : o.id);
            return (
              <li key={o.id}>
                <div className="w-full py-4 flex items-center gap-4">
                  <div onClick={toggle} className="flex -space-x-3 shrink-0 cursor-pointer">
                    {o.items.slice(0, 3).map((i) => (
                      <ProductImage
                        key={i.productId}
                        src={i.photoUrl}
                        alt=""
                        className="w-11 h-11 rounded-lg ring-2 ring-[#FFFDEB]"
                      />
                    ))}
                  </div>
                  <div onClick={toggle} className="flex-1 min-w-0 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#10201F]">{o.orderNumber}</span>
                      <span className={`text-xs font-bold ${STATUS_CLS[o.status] ?? "text-[#07543F]"}`}>
                        ({ORDER_STATUS_LABEL[o.status]})
                      </span>
                    </div>
                    <p className="text-xs text-[#667085] mt-0.5">
                      {fmtDate(o.createdAt)} | {count} {count === 1 ? "item" : "items"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {o.invoiceNumber && (
                      <a
                        href={api.invoiceUrl(o.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${o.totalGst > 0 ? "GST" : "Non-GST"} Invoice ${o.invoiceNumber}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#07543F] hover:text-[#053E2E]"
                      >
                        <ReceiptText className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </a>
                    )}
                    <span onClick={toggle} className="text-sm font-semibold text-[#10201F] cursor-pointer">
                      {inr(o.grandTotal)}
                    </span>
                  </div>
                </div>

                {open && (
                  <div className="pb-4 pl-1 space-y-2">
                    {o.items.map((i) => (
                      <Link
                        key={i.productId}
                        href={`/product/${i.productId}`}
                        className="flex items-center gap-3 text-sm hover:text-[#07543F]"
                      >
                        <ProductImage src={i.photoUrl} alt="" className="w-9 h-9 rounded-md" />
                        <span className="flex-1 truncate text-[#10201F]">{i.name}</span>
                        <span className="text-xs text-[#667085]">× {i.quantity}</span>
                        <span className="w-20 text-right text-[#10201F]">{inr(i.lineTotal)}</span>
                      </Link>
                    ))}
                    <div className="pt-2 text-xs text-[#667085] flex flex-wrap gap-x-6 gap-y-1">
                      {o.address && (
                        <span>
                          Deliver to:{" "}
                          <span className="text-[#10201F]">
                            {o.address.addressLine}, {o.address.city}, {o.address.state} - {o.address.pincode}
                          </span>
                        </span>
                      )}
                      <span>Payment: <span className="text-[#10201F]">Cash on delivery</span></span>
                      {(o as any).deliveryCharge > 0 ? (
                        <span>Delivery: <span className="text-[#10201F]">{inr((o as any).deliveryCharge)}</span></span>
                      ) : (
                        <span>Delivery: <span className="text-[#07543F] font-medium">Free</span></span>
                      )}
                      {o.totalGst > 0 ? (
                        <span>GST included: <span className="text-[#10201F]">{inr(o.totalGst)}</span></span>
                      ) : (
                        <span>Bill: <span className="text-[#10201F]">Non-GST invoice</span></span>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
