/**
 * Shared input rules for every shop form.
 * - `clean.*` runs on every keystroke and blocks characters that can never be valid.
 * - `check.*` runs on submit and returns an error message (or null when valid).
 * The backend (/api/v1/shop) enforces the same rules.
 */

export const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const NAME_RE = /^[A-Za-z][A-Za-z .'-]*[A-Za-z.]$/;
const CITY_RE = /^[A-Za-z][A-Za-z .'-]*[A-Za-z.]$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PIN_RE = /^[1-9]\d{5}$/;

export const clean = {
  /** Letters, spaces and . ' - only; single spaces */
  name: (v: string) => v.replace(/[^A-Za-z .'-]/g, "").replace(/\s{2,}/g, " ").slice(0, 60),
  /** 10-digit Indian mobile: digits only, drops a pasted +91 / 0 prefix */
  phone: (v: string) => {
    let d = v.replace(/\D/g, "");
    if (d.length > 10 && d.startsWith("91")) d = d.slice(2);
    if (d.length > 10 && d.startsWith("0")) d = d.slice(1);
    return d.slice(0, 10);
  },
  email: (v: string) => v.replace(/\s/g, "").toLowerCase().slice(0, 100),
  pincode: (v: string) => v.replace(/\D/g, "").slice(0, 6),
  city: (v: string) => v.replace(/[^A-Za-z .'-]/g, "").replace(/\s{2,}/g, " ").slice(0, 50),
  address: (v: string) => v.replace(/\s{2,}/g, " ").slice(0, 200),
  gstin: (v: string) => v.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 15),
};

export const check = {
  name: (v: string) => {
    const t = v.trim();
    if (!t) return "Enter your full name.";
    if (t.length < 2) return "Name is too short.";
    if (!NAME_RE.test(t)) return "Use letters only (e.g. Rajesh Kumar).";
    return null;
  },
  phone: (v: string, required = true) => {
    if (!v) return required ? "Enter your mobile number." : null;
    if (!MOBILE_RE.test(v)) return "Enter a valid 10-digit mobile number (starts with 6–9).";
    return null;
  },
  email: (v: string) => {
    if (!v) return "Enter your email address.";
    if (!EMAIL_RE.test(v)) return "Enter a valid email address (e.g. you@example.com).";
    return null;
  },
  password: (v: string, isSignup: boolean) => {
    if (!v) return "Enter your password.";
    if (!isSignup) return null;
    if (v.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Use at least one letter and one number.";
    return null;
  },
  address: (v: string) => {
    const t = v.trim();
    if (!t) return "Enter your street address.";
    if (t.length < 5) return "Address is too short — add house no. and street.";
    if (!/[A-Za-z]/.test(t)) return "Enter a proper address.";
    return null;
  },
  city: (v: string) => {
    const t = v.trim();
    if (!t) return "Enter your city / town.";
    if (t.length < 2 || !CITY_RE.test(t)) return "Enter a valid city name.";
    return null;
  },
  pincode: (v: string) => {
    if (!v) return "Enter your PIN code.";
    if (!PIN_RE.test(v)) return "Enter a valid 6-digit PIN code.";
    return null;
  },
  gstin: (v: string) => {
    if (!v) return null; // optional
    if (!GSTIN_RE.test(v)) return "Enter a valid 15-character GSTIN, or leave it empty.";
    return null;
  },
};

/** Collect errors; returns null when every field is valid. */
export function validate<T extends string>(rules: Record<T, string | null>): Partial<Record<T, string>> | null {
  const errors: Partial<Record<T, string>> = {};
  for (const [k, v] of Object.entries(rules) as [T, string | null][]) if (v) errors[k] = v;
  return Object.keys(errors).length ? errors : null;
}

/** Small inline error under a field */
export const fieldErrorCls = "mt-1 text-[11px] font-medium text-[#C2410C]";
