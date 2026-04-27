"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";
import { setScopedShopId } from "@/lib/shop-scope";

export default function AddShopModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved?: () => void;
}) {
  const { t } = useAdminI18n();
  const router = useRouter();
  const [shopId, setShopId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const id = shopId.trim();
      const display = name.trim();
      const addr = address.trim();
      const r = await apiFetch("/shops", {
        method: "POST",
        body: JSON.stringify({ shopId: id, name: display, address: addr }),
      });
      if (!r.ok) throw new Error(await r.text());
      setScopedShopId(id);
      onSaved?.();
      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">{t("shopsModalTitle")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="block text-sm text-slate-600 mb-1">{t("shopsFormId")}</label>
            <input
              required
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              placeholder="shop-001"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">{t("shopsFormName")}</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Main store"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">{t("shopsFormAddress")}</label>
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("shopsFormAddressPlaceholder")}
              className="w-full border border-gray-300 p-2 rounded resize-y min-h-[4.5rem]"
            />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-600 bg-slate-200 hover:bg-slate-300 rounded cursor-pointer transition-colors"
            >
              {t("actionCancel")}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-sky-500 text-sky-50 hover:bg-sky-600 rounded cursor-pointer transition-colors disabled:opacity-50"
            >
              {saving ? "…" : t("shopsFormSubmit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
