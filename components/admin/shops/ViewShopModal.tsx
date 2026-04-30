"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";
import { setScopedShopId } from "@/lib/shop-scope";

type Row = {
  shopId: string;
  name: string;
  address: string | null;
  replenishmentNotifyBufferDays: number | null;
};

export default function ViewShopModal({
  data,
  onClose,
  onSaved,
}: {
  data: Row;
  onClose: () => void;
  onSaved?: () => void;
}) {
  const { t } = useAdminI18n();
  const router = useRouter();
  const [bufferDays, setBufferDays] = useState(
    data.replenishmentNotifyBufferDays ?? 1,
  );
  const [saving, setSaving] = useState(false);
  const [bufferError, setBufferError] = useState("");

  const registered = data.replenishmentNotifyBufferDays !== null;

  const useAsActive = () => {
    setScopedShopId(data.shopId);
    router.refresh();
    onClose();
  };

  const saveBuffer = async () => {
    if (!registered) return;
    setBufferError("");
    setSaving(true);
    try {
      const r = await apiFetch(
        `/shops/${encodeURIComponent(data.shopId)}/replenishment`,
        {
          method: "PATCH",
          body: JSON.stringify({ notifyBufferDays: bufferDays }),
        },
      );
      if (!r.ok) throw new Error(await r.text());
      onSaved?.();
    } catch (e) {
      setBufferError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">{t("shopsViewTitle")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
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

        <div className="space-y-2 text-sm">
          <p>
            <b>{t("shopsFormId")}:</b> <span className="font-mono">{data.shopId}</span>
          </p>
          <p>
            <b>{t("shopsFormName")}:</b> {data.name}
          </p>
          <p className="whitespace-pre-wrap">
            <b>{t("shopsFormAddress")}:</b> {data.address ?? "—"}
          </p>
        </div>

        {registered ? (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
            <label className="block text-sm text-gray-700 mb-1">
              {t("shopsNotifyBufferLabel")}
            </label>
            <p className="text-xs text-slate-600 mt-1 mb-2">{t("shopsNotifyBufferHint")}</p>
            <input
              id="shop-buffer"
              type="number"
              min={0}
              max={90}
              value={bufferDays}
              onChange={(e) => setBufferDays(Number(e.target.value))}
              className="w-full rounded px-2 py-1.5 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
            {bufferError ? <p className="text-rose-600 text-xs mt-2">{bufferError}</p> : null}
            <button
              type="button"
              disabled={saving}
              onClick={() => void saveBuffer()}
              className="mt-2 text-sm font-medium text-sky-600 hover:underline disabled:opacity-50"
            >
              {saving ? "…" : t("shopsSaveBuffer")}
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">
            Register this shop here to set replenishment early-warning days.
          </p>
        )}

        <div className="flex justify-end mt-4 gap-2 flex-wrap">
          <button
            type="button"
            onClick={useAsActive}
            className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded cursor-pointer transition-colors"
          >
            {t("shopsUseAsActive")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 cursor-pointer transition-colors"
          >
            {t("shopsClose")}
          </button>
        </div>
      </div>
    </div>
  );
}
