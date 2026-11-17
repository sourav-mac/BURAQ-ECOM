/** BURAQ shop API client — talks to buraq-backend /api/v1/shop */

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1").replace(/\/$/, "");
const TOKEN_KEY = "buraq_shop_token";

export interface Category {
  id: string;
  name: string;
  productCount: number;
}

export interface Product {
  id: string;
  materialCode: string;
  name: string;
  brand: string | null;
  photoUrl: string | null;
  unit: string;
  description: string | null;
  gstPercent: number;
  price: number; // MRP, GST-inclusive
  inStock: boolean;
  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  category: { id: string; name: string };
}

export interface ProductDetail extends Product {
  related: Product[];
}

export interface ShopUser {
  id: string;
  avatarUrl: string | null;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  gstin: string | null;
}

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "PROCESSING"
  | "READY_FOR_DISPATCH"
  | "DISPATCHED"
  | "DELIVERED"
  | "REJECTED"
  | "CANCELLED";

export interface ShopOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
  subtotal: number;
  totalGst: number;
  grandTotal: number;
  invoiceNumber: string | null;
  address: {
    contactName?: string;
    phone?: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  } | null;
  items: {
    productId: string;
    name: string;
    brand: string | null;
    photoUrl: string | null;
    quantity: number;
    lineTotal: number;
  }[];
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export const tokenStore = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (t: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, t);
    } catch {}
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
  },
};

async function request<T>(path: string, init: RequestInit = {}): Promise<{ data: T; meta?: any }> {
  const token = tokenStore.get();
  let res: Response;
  try {
    res = await fetch(`${API_URL}/shop${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });
  } catch {
    throw new ApiError("Cannot reach the BURAQ server. Please try again.", 0);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    throw new ApiError(body.message || `Request failed (${res.status})`, res.status);
  }
  return { data: body.data as T, meta: body.meta };
}

export const api = {
  categories: () => request<Category[]>("/categories").then((r) => r.data),

  products: (q: { search?: string; categoryId?: string; sort?: string; page?: number; limit?: number } = {}) => {
    const params = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => v !== undefined && v !== "" && params.set(k, String(v)));
    return request<Product[]>(`/products?${params}`).then((r) => ({ products: r.data, total: r.meta?.total ?? r.data.length }));
  },

  product: (id: string) => request<ProductDetail>(`/products/${encodeURIComponent(id)}`).then((r) => r.data),

  register: (body: { name: string; email: string; phone?: string; password: string }) =>
    request<{ token: string; user: ShopUser }>("/auth/register", { method: "POST", body: JSON.stringify(body) }).then((r) => r.data),

  login: (email: string, password: string) =>
    request<{ token: string; user: ShopUser }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }).then((r) => r.data),

  googleLogin: (idToken: string) =>
    request<{ token: string; user: ShopUser }>("/auth/google", { method: "POST", body: JSON.stringify({ idToken }) }).then((r) => r.data),

  me: () => request<ShopUser>("/me").then((r) => r.data),

  updateMe: (body: Partial<Omit<ShopUser, "id" | "email">>) =>
    request<ShopUser>("/me", { method: "PATCH", body: JSON.stringify(body) }).then((r) => r.data),

  uploadAvatar: async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const token = tokenStore.get();
    let res: Response;
    try {
      res = await fetch(`${API_URL}/shop/me/avatar`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
    } catch {
      throw new ApiError("Cannot reach the BURAQ server. Please try again.", 0);
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.success === false) throw new ApiError(body.message || "Upload failed", res.status);
    return body.data as ShopUser;
  },

  removeAvatar: () => request<ShopUser>("/me/avatar", { method: "DELETE" }).then((r) => r.data),

  orders: () => request<ShopOrder[]>("/orders").then((r) => r.data),

  placeOrder: (body: {
    items: { productId: string; quantity: number }[];
    address: { fullName: string; phone: string; addressLine: string; city: string; state: string; pincode: string };
    gstin?: string;
    idempotencyKey?: string;
  }) => request<{ id: string; orderNumber: string; grandTotal: number }>("/orders", { method: "POST", body: JSON.stringify(body) }).then((r) => r.data),

  invoiceUrl: (orderId: string) => `${API_URL}/shop/orders/${orderId}/invoice?token=${encodeURIComponent(tokenStore.get() || "")}`,
};

export const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Placed",
  ACCEPTED: "Confirmed",
  PROCESSING: "Processing",
  READY_FOR_DISPATCH: "Packed",
  DISPATCHED: "Shipped",
  DELIVERED: "Delivered",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
};
