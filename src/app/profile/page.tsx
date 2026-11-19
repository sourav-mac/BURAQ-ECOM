"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShoppingBag, Store, Camera, ArrowLeft } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { clean, check, validate, fieldErrorCls } from "@/lib/validation";
import { useCart } from "@/context/CartContext";

const inputCls =
  "w-full h-10 px-3.5 rounded-xl border border-[#E2DED5] bg-transparent text-sm text-[#10201F] placeholder:text-[#9AA19C] focus:outline-none focus:border-[#07543F] focus:ring-2 focus:ring-[#07543F]/10 disabled:border-transparent disabled:px-0 disabled:text-[#10201F] transition-all";
const labelCls = "block text-xs font-medium text-[#667085]";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout, updateProfile, updateAvatar } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handlePhoto = async (file: File | null) => {
    setPhotoError(null);
    if (file && file.size > 5 * 1024 * 1024) return setPhotoError("Image must be under 5 MB.");
    setPhotoBusy(true);
    const res = await updateAvatar(file);
    setPhotoBusy(false);
    if (!res.success) setPhotoError(res.message || "Could not update photo");
  };
  const { totalItems, setIsCartOpen } = useCart();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"name" | "phone", string>>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate({ name: check.name(name), phone: check.phone(phone, false) });
    setFieldErrors(errs ?? {});
    if (errs) return;
    const res = await updateProfile({ name: name.trim(), phone });
    if (!res.success) {
      alert(res.message || "Could not save your profile");
      return;
    }
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setName(user.name);
    setPhone(user.phone || "");
    setFieldErrors({});
    setEditing(false);
  };

  const linkCls =
    "w-full flex items-center gap-3 h-10 text-sm text-[#10201F] hover:text-[#07543F] cursor-pointer transition-colors";

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-14">
        {/* Left: identity + actions */}
        <aside>
          <div className="flex items-end gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={photoBusy}
              aria-label="Change profile photo"
              className="relative group rounded-full cursor-pointer disabled:cursor-wait"
            >
              <UserAvatar name={user.name} src={user.avatarUrl} className="w-16 h-16 text-2xl" />
              <span
                className={`absolute inset-0 rounded-full bg-[#10201F]/45 flex items-center justify-center text-white transition-opacity ${
                  photoBusy ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {photoBusy ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </span>
            </button>
            <div className="pb-1 text-xs space-x-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={photoBusy}
                className="font-medium text-[#07543F] hover:text-[#053E2E] cursor-pointer"
              >
                {user.avatarUrl ? "Change photo" : "Add photo"}
              </button>
              {user.avatarUrl && (
                <button
                  type="button"
                  onClick={() => handlePhoto(null)}
                  disabled={photoBusy}
                  className="text-[#667085] hover:text-[#C2410C] cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                handlePhoto(e.target.files?.[0] ?? null);
                e.target.value = "";
              }}
            />
          </div>
          {photoError && <p className="mt-2 text-xs text-[#C2410C]">{photoError}</p>}
          <h1 className="mt-3 text-lg font-bold text-[#10201F] truncate">{user.name}</h1>
          <p className="text-sm text-[#667085] truncate">{user.email}</p>

          <nav className="mt-6 pt-4 border-t border-[#EFECE3]">
            <button onClick={() => setIsCartOpen(true)} className={linkCls}>
              <ShoppingBag className="w-4 h-4 text-[#667085]" />
              My cart
              <span className="ml-auto text-xs text-[#667085]">{totalItems}</span>
            </button>
            <Link href="/products" className={linkCls}>
              <Store className="w-4 h-4 text-[#667085]" />
              Shop products
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center gap-3 h-10 text-sm text-[#C2410C] hover:opacity-80 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </nav>
        </aside>

        {/* Right: details */}
        <section className="md:pl-14 md:border-l border-[#EFECE3]">
          <div className="flex items-center justify-between h-8">
            <h2 className="text-base font-semibold text-[#10201F]">Personal details</h2>
            {saved ? (
              <span className="text-sm font-medium text-[#07543F]">Saved ✓</span>
            ) : (
              !editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm font-medium text-[#07543F] hover:text-[#053E2E] cursor-pointer"
                >
                  Edit
                </button>
              )
            )}
          </div>

          <form onSubmit={handleSave} className="mt-4 divide-y divide-[#EFECE3] border-y border-[#EFECE3]">
            <div className="py-3 grid sm:grid-cols-[140px_1fr] items-center gap-1 sm:gap-4">
              <label className={labelCls}>Full name</label>
              <div>
                <input value={name} onChange={(e) => setName(clean.name(e.target.value))} disabled={!editing} maxLength={60} autoComplete="name" className={inputCls} />
                {fieldErrors.name && <p className={fieldErrorCls}>{fieldErrors.name}</p>}
              </div>
            </div>
            <div className="py-3 grid sm:grid-cols-[140px_1fr] items-center gap-1 sm:gap-4">
              <label className={labelCls}>Email</label>
              <input value={user.email} disabled className={inputCls} />
            </div>
            <div className="py-3 grid sm:grid-cols-[140px_1fr] items-center gap-1 sm:gap-4">
              <label className={labelCls}>Phone</label>
              <div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(clean.phone(e.target.value))}
                  disabled={!editing}
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel-national"
                  placeholder={editing ? "10-digit mobile number" : "Not added"}
                  className={inputCls}
                />
                {fieldErrors.phone && <p className={fieldErrorCls}>{fieldErrors.phone}</p>}
              </div>
            </div>

            {editing && (
              <div className="py-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="h-10 px-4 rounded-xl text-sm font-medium text-[#667085] hover:text-[#10201F] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-white text-sm font-semibold cursor-pointer"
                >
                  Save changes
                </button>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
