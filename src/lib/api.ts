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
  photos?: string[];
  images?: Array<{ id: string; publicUrl: string; imageType?: string }>;
  unit: string;
  description: string | null;
  extraDetails?: string | null;
  gstPercent: number;
  price: number; // BURAQ selling price, GST-inclusive
  /** Real MRP printed on the package (Worklane) — only set when higher than `price` */
  printedMrp: number | null;
  /** % below the printed MRP (0 when there is no printed MRP above the price) */
  discountPercent: number;
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
  constructor(
    message: string,
    public status: number,
    public retryAfter?: number
  ) {
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
    throw new ApiError(MSG_OFFLINE, 0);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    const retryHeader = res.headers.get("retry-after");
    const parsedRetry = retryHeader ? parseInt(retryHeader, 10) : undefined;
    const retryAfter = body.retryAfter ?? (Number.isFinite(parsedRetry) ? parsedRetry : undefined);

    if (res.status === 429) {
      const waitSec = retryAfter || 60;
      throw new ApiError(
        body.message || `Too many failed attempts. Please wait ${waitSec} seconds before trying again.`,
        res.status,
        waitSec
      );
    }
    throw new ApiError(friendlyMessage(body.message, res.status), res.status, retryAfter);
  }
  return { data: body.data as T, meta: body.meta };
}

// ─── Customer-friendly error messages ────────────────────────────────────────
const MSG_OFFLINE = "Can't connect right now. Please check your internet and try again.";
const MSG_SERVER = "We're having trouble right now. Please try again in a moment.";
const MSG_SESSION = "Your session has expired. Please log in again.";

/** Never show raw server / database / stack text; tidy validation messages. */
function friendlyMessage(raw: unknown, status: number): string {
  const text = typeof raw === "string" ? raw.trim() : "";
  const technical =
    /prisma|invocation|database|ECONN|ETIMEDOUT|ENOTFOUND|stack|undefined|null|TypeError|SyntaxError|Internal server error|Route [A-Z]+ /i;
  if (status >= 500 || !text || technical.test(text)) return status === 401 ? MSG_SESSION : MSG_SERVER;
  if (status === 401 && /token|jwt|expired|unauthori/i.test(text)) return MSG_SESSION;

  // Validation lists like "phone: enter a valid…, email: enter a valid…" → first message, sentence-cased
  const first = text.split(/,\s*(?=[a-zA-Z.]+: )/)[0];
  const cleaned = first.replace(/^[a-zA-Z.]+:\s*/, "");
  const sentence = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

export const api = {
  categories: () => request<Category[]>("/categories").then((r) => r.data),

  products: (q: { search?: string; categoryId?: string; sort?: string; page?: number; limit?: number } = {}) => {
    const params = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => v !== undefined && v !== "" && params.set(k, String(v)));
    return request<Product[]>(`/products?${params}`).then((r) => ({ products: r.data, total: r.meta?.total ?? r.data.length }));
  },

  product: (id: string) => request<ProductDetail>(`/products/${encodeURIComponent(id)}`).then((r) => r.data),

  /** Step 1 of Create Account: emails a 6-digit verification code */
  register: (body: { name: string; email: string; phone?: string; password: string }) =>
    request<{ email: string; expiresInSeconds: number; resendInSeconds: number }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }).then((r) => r.data),

  /** Forgot password step 1: email a reset code (same reply whether or not the email exists) */
  forgotPassword: (email: string) =>
    request<{ sent: boolean; resendInSeconds: number }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then((r) => r.data),

  /** Forgot password step 2: code + new password → password changed and logged in */
  resetPassword: (email: string, otp: string, password: string) =>
    request<{ token: string; user: ShopUser }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, otp, password }),
    }).then((r) => r.data),

  /** Step 2: verify the code → account is created and logged in */
  verifyRegister: (email: string, otp: string) =>
    request<{ token: string; user: ShopUser }>("/auth/register/verify", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }).then((r) => r.data),

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
