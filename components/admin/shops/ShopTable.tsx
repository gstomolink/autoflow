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
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (search?: string) => {
    setError("");
    setLoading(true);
    try {
      const q = search?.trim();
      const path =
        q && q.length > 0
          ? `/shops?search=${encodeURIComponent(q)}`
          : "/shops";
      const r = await apiFetch(path);
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

  const runSearch = () => {
    void load(searchInput);
  };

  if (loading) {
    return <p className="text-slate-500">Loading…</p>;
  }

  return (
    <>
      {error ? <p className="text-rose-600 text-sm mb-2">{error}</p> : null}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-wrap items-end gap-3 justify-between">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="shop-search">
            Search
          </label>
          <input
            id="shop-search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                runSearch();
              }
            }}
            placeholder="Shop ID or name…"
            className="w-72 border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={runSearch}
            className="bg-sky-500 text-sky-50 px-5 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              void load();
            }}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
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
            {data.length === 0 ? (
              <tr className="border-t border-gray-200">
                <td className="p-6 text-center text-slate-500" colSpan={4}>
                  No data
                </td>
              </tr>
            ) : null}
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
          onSaved={() => void load(searchInput)}
        />
      ) : null}
    </>
  );
}
