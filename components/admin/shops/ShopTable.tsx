"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";
import ViewShopModal from "./ViewShopModal";

type ShopRow = {
  shopId: string;
  name: string;
  address: string | null;
  replenishmentNotifyBufferDays: number | null;
};

export default function ShopTable() {
  const { t } = useAdminI18n();
  const [data, setData] = useState<ShopRow[]>([]);
  const [viewItem, setViewItem] = useState<ShopRow | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch("/shops");
      if (!r.ok) throw new Error(await r.text());
      setData(await r.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <p className="text-slate-500">Loading…</p>;
  }

  return (
    <>
      {error ? <p className="text-rose-600 text-sm mb-2">{error}</p> : null}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-gray-700">
          <thead className="bg-white">
            <tr>
              <th className="p-3 text-left">{t("shopsFormId")}</th>
              <th className="p-3 text-left">{t("tableName")}</th>
              <th className="p-3 text-left">{t("tableAddress")}</th>
              <th className="p-3 text-left">{t("tableActions")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.shopId} className="border-t border-gray-200">
                <td className="p-3 font-mono text-slate-800">{row.shopId}</td>
                <td className="p-3 font-medium">{row.name}</td>
                <td className="p-3 max-w-xs text-slate-600">{row.address ?? "—"}</td>
                <td className="p-3">
                  <button
                    type="button"
                    onClick={() => setViewItem(row)}
                    className="px-2 py-1 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors"
                  >
                    {t("actionView")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewItem ? (
        <ViewShopModal
          data={viewItem}
          onClose={() => setViewItem(null)}
          onSaved={() => void load()}
        />
      ) : null}
    </>
  );
}
