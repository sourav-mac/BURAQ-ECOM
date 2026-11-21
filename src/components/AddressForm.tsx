"use client";

import React from "react";
import type { AddressInput } from "@/lib/api";
import { INDIAN_STATES } from "@/lib/states";
import { clean, check, validate, fieldErrorCls } from "@/lib/validation";

/** Form values (all strings, so inputs stay controlled) */
export type AddressFormValue = Required<Pick<AddressInput, "fullName" | "phone" | "addressLine" | "city" | "state" | "pincode">> & {
  label: string;
};

export const emptyAddress = (fullName = "", phone = ""): AddressFormValue => ({
  label: "Home",
  fullName,
  phone,
  addressLine: "",
  city: "",
  state: "West Bengal",
  pincode: "",
});

export type AddressErrors = Partial<Record<keyof AddressFormValue, string>>;

/** Validate with the shop's shared rules; null when valid. */
export function validateAddress(v: AddressFormValue): AddressErrors | null {
  return validate({
    fullName: check.name(v.fullName),
    phone: check.phone(v.phone),
    addressLine: check.address(v.addressLine),
    city: check.city(v.city),
    pincode: check.pincode(v.pincode),
    state: v.state ? null : "Choose your state.",
    label: null,
  });
}

const CLEANERS: Partial<Record<keyof AddressFormValue, (v: string) => string>> = {
  fullName: clean.name,
  phone: clean.phone,
  addressLine: clean.address,
  city: clean.city,
  pincode: clean.pincode,
};

const LABELS = ["Home", "Work", "Other"];

const defaultInputCls =
  "w-full h-9 px-3 rounded-lg border border-[#E2DED5] bg-transparent text-xs text-[#10201F] placeholder:text-[#9AA19C] focus:outline-none focus:border-[#07543F] focus:ring-1 focus:ring-[#07543F]/20";
const defaultLabelCls = "block text-[11px] font-bold text-[#445048] mb-1";

/** Delivery address fields: label chips, recipient, mobile, street, city, state, PIN. */
export function AddressForm({
  value,
  onChange,
  errors = {},
  inputCls = defaultInputCls,
  labelCls = defaultLabelCls,
}: {
  value: AddressFormValue;
  onChange: (next: AddressFormValue) => void;
  errors?: AddressErrors;
  inputCls?: string;
  labelCls?: string;
}) {
  const set = (k: keyof AddressFormValue) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const raw = e.target.value;
    onChange({ ...value, [k]: CLEANERS[k] ? CLEANERS[k]!(raw) : raw });
  };
  const err = (k: keyof AddressFormValue) => (errors[k] ? <p className={fieldErrorCls}>{errors[k]}</p> : null);

  return (
    <div className="space-y-2.5">
      {/* Save as */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-bold text-[#445048] mr-1">Save as</span>
        {LABELS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => onChange({ ...value, label: l })}
            className={`h-7 px-3 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer ${
              value.label === l ? "bg-[#07543F] border-[#07543F] text-white" : "border-[#E2DED5] text-[#445048] hover:border-[#07543F]"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input value={value.fullName} onChange={set("fullName")} placeholder="Rajesh Kumar" autoComplete="name" maxLength={60} className={inputCls} />
          {err("fullName")}
        </div>
        <div>
          <label className={labelCls}>Mobile Number *</label>
          <input
            type="tel"
            inputMode="numeric"
            value={value.phone}
            onChange={set("phone")}
            placeholder="9830000000"
            autoComplete="tel-national"
            maxLength={10}
            className={inputCls}
          />
          {err("phone")}
        </div>
      </div>

      <div>
        <label className={labelCls}>Street Address / House No. *</label>
        <input
          value={value.addressLine}
          onChange={set("addressLine")}
          placeholder="House no, street, landmark"
          autoComplete="street-address"
          maxLength={200}
          className={inputCls}
        />
        {err("addressLine")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
        <div className="sm:col-span-2">
          <label className={labelCls}>City / Town *</label>
          <input value={value.city} onChange={set("city")} placeholder="Kolkata" autoComplete="address-level2" maxLength={50} className={inputCls} />
          {err("city")}
        </div>
        <div>
          <label className={labelCls}>State *</label>
          <select value={value.state} onChange={set("state")} className={`${inputCls} cursor-pointer`}>
            {INDIAN_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {err("state")}
        </div>
        <div>
          <label className={labelCls}>PIN Code *</label>
          <input
            inputMode="numeric"
            maxLength={6}
            value={value.pincode}
            onChange={set("pincode")}
            placeholder="700001"
            autoComplete="postal-code"
            className={inputCls}
          />
          {err("pincode")}
        </div>
      </div>
    </div>
  );
}
