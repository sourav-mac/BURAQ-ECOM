"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api, formatAddressLine, ShopAddress } from "@/lib/api";
import { clean } from "@/lib/validation";
import { AddressForm, AddressFormValue, AddressErrors, emptyAddress, validateAddress } from "@/components/AddressForm";

const inputCls =
  "w-full h-10 px-3.5 rounded-xl border border-[#E2DED5] bg-white text-sm text-[#10201F] placeholder:text-[#9AA19C] focus:outline-none focus:border-[#07543F] focus:ring-2 focus:ring-[#07543F]/10";
const labelCls = "block text-xs font-medium text-[#667085] mb-1";

/** My Addresses — saved delivery addresses used at checkout. */
export default function AddressesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [addresses, setAddresses] = useState<ShopAddress[] | null>(null);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<ShopAddress | null>(null);
  const [draft, setDraft] = useState<AddressFormValue>(emptyAddress());
  const [errors, setErrors] = useState<AddressErrors>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = () => api.addresses().then(setAddresses).catch((e) => setMessage(e.message));

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/signin?next=/addresses");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  if (!user) return null;

  const startNew = () => {
    setDraft(emptyAddress(clean.name(user.name), clean.phone(user.phone || "")));
    setErrors({});
    setEditingId("new");
  };

  const startEdit = (a: ShopAddress) => {
    setDraft({ label: a.label, fullName: a.fullName, phone: a.phone, addressLine: a.addressLine, city: a.city, state: a.state, pincode: a.pincode });
    setErrors({});
    setEditingId(a.id);
  };

  const save = async () => {
    const errs = validateAddress(draft);
    setErrors(errs ?? {});
    if (errs) return;
    setBusy(true);
    setMessage(null);
    try {
      if (editingId === "new") await api.addAddress(draft);
      else if (editingId) await api.updateAddress(editingId, draft);
      setEditingId(null);
      await load();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!addressToDelete) return;
    setBusy(true);
    try {
      await api.deleteAddress(addressToDelete.id);
      setAddressToDelete(null);
      await load();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = (a: ShopAddress) => {
    setAddressToDelete(a);
  };

  const makeDefault = async (a: ShopAddress) => {
    setBusy(true);
    try {
      await api.updateAddress(a.id, { isDefault: true });
      await load();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const editor = (
    <div className="py-4">
      <AddressForm
        value={draft}
        onChange={(v) => {
          setDraft(v);
          if (Object.keys(errors).length) setErrors({});
        }}
        errors={errors}
        inputCls={inputCls}
        labelCls={labelCls}
      />
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={() => setEditingId(null)} className="h-10 px-4 rounded-xl text-sm font-medium text-[#667085] hover:text-[#10201F] cursor-pointer">
          Cancel
        </button>
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="h-10 px-5 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-white text-sm font-semibold disabled:opacity-60 cursor-pointer"
        >
          {busy ? "Saving…" : "Save address"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#10201F]">My addresses</h1>
          <p className="text-sm text-[#667085] mt-0.5">Saved delivery addresses for faster checkout.</p>
        </div>
        {editingId !== "new" && (
          <button
            type="button"
            onClick={startNew}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#07543F] hover:bg-[#053E2E] text-white text-sm font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add address
          </button>
        )}
      </div>

      {message && <p className="mt-4 text-sm text-[#C2410C]">{message}</p>}

      <div className="mt-6 divide-y divide-[#EFECE3] border-y border-[#EFECE3]">
        {editingId === "new" && editor}

        {addresses === null ? (
          <div className="py-6 space-y-3 animate-pulse">
            <div className="h-14 rounded-xl bg-[#E2DED5]/30" />
            <div className="h-14 rounded-xl bg-[#E2DED5]/30" />
          </div>
        ) : addresses.length === 0 && editingId !== "new" ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F2F7F4] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#07543F]" />
            </div>
            <p className="mt-4 font-semibold text-[#10201F]">No saved addresses yet</p>
            <p className="text-sm text-[#667085] mt-1">Add one now, or it will be saved automatically at checkout.</p>
          </div>
        ) : (
          addresses.map((a) =>
            editingId === a.id ? (
              <div key={a.id}>{editor}</div>
            ) : (
              <div key={a.id} className="py-4 flex items-start justify-between gap-4">
                <div className="min-w-0 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#10201F]">{a.fullName}</span>
                    <span className="text-xs font-medium text-[#667085]">({a.label})</span>
                    {a.isDefault && <span className="text-[11px] font-semibold text-[#07543F]">Default</span>}
                  </div>
                  <p className="text-[#445048] mt-0.5">{formatAddressLine(a)}</p>
                  <p className="text-[#667085] text-xs mt-0.5">Mobile: {a.phone}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs font-semibold">
                  {!a.isDefault && (
                    <button type="button" onClick={() => makeDefault(a)} disabled={busy} className="text-[#667085] hover:text-[#07543F] no-underline cursor-pointer">
                      Set default
                    </button>
                  )}
                  <button type="button" onClick={() => startEdit(a)} className="text-[#07543F] hover:text-[#053E2E] no-underline cursor-pointer">
                    Edit
                  </button>
                  <button type="button" onClick={() => remove(a)} disabled={busy} className="text-[#C2410C] hover:text-[#9A3412] no-underline cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* Clean, Minimal & Professional Delete Confirmation Modal */}
      {addressToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => !busy && setAddressToDelete(null)}
            className="absolute inset-0 bg-[#10201F]/40 backdrop-blur-[2px] transition-opacity"
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-[#EFECE3] z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#10201F]">Delete address</h3>
              <button
                type="button"
                onClick={() => !busy && setAddressToDelete(null)}
                aria-label="Close"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#667085] hover:bg-[#F7F4EE] hover:text-[#10201F] transition-colors cursor-pointer -mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-2 text-xs text-[#667085] leading-relaxed">
              Are you sure you want to remove your <span className="font-semibold text-[#10201F]">&quot;{addressToDelete.label}&quot;</span> address ({formatAddressLine(addressToDelete)})?
            </p>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setAddressToDelete(null)}
                disabled={busy}
                className="h-9 px-4 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#10201F] hover:bg-[#F7F4EE] transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={busy}
                className="h-9 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold transition-colors disabled:opacity-60 cursor-pointer shadow-sm"
              >
                {busy ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
