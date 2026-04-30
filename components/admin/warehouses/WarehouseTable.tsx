'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import ViewWarehouseModal from "./ViewWarehouseModal";
import EditWarehouseModal from "./EditWarehouseModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";

type Wh = {
  id: number;
  name: string;
  code: string;
  address: string | null;
  managerName: string | null;
  contactPhone: string | null;
};

export default function WarehouseTable({ filters }: { filters: Record<string, string> }) {
  const { t } = useAdminI18n();
  const [data, setData] = useState<Wh[]>([]);
  const [viewItem, setViewItem] = useState<Wh | null>(null);
  const [editItem, setEditItem] = useState<Wh | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch("/warehouses");
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

  const filtered = useMemo(() => {
    const q = String(filters?.search ?? "").trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.code.toLowerCase().includes(q) ||
        (w.address?.toLowerCase().includes(q) ?? false),
    );
  }, [filters, data]);

  const deleteWarehouse = async (id: number) => {
    if (!confirm("Delete warehouse?")) return;
    const r = await apiFetch(`/warehouses/${id}`, { method: "DELETE" });
    if (!r.ok) {
      alert(await r.text());
      return;
    }
    void load();
  };

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
              <th className="p-3 text-left">{t("tableWarehouseId")}</th>
              <th className="p-3 text-left">{t("tableName")}</th>
              <th className="p-3 text-left">{t("tableAddress")}</th>
              <th className="p-3 text-left">{t("tableManager")}</th>
              <th className="p-3 text-left">{t("tableContactNo")}</th>
              <th className="p-3 text-left">{t("tableActions")}</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr className="border-t border-gray-200">
                <td className="p-6 text-center text-slate-500" colSpan={6}>
                  No data
                </td>
              </tr>
            ) : null}
            {filtered.map((w) => (
              <tr key={w.id} className="border-t border-gray-200">
                <td className="p-3">{w.id}</td>
                <td className="p-3 font-medium">{w.name}</td>
                <td className="p-3">{w.address ?? "—"}</td>
                <td className="p-3">{w.managerName ?? "—"}</td>
                <td className="p-3">{w.contactPhone ?? "—"}</td>

                <td className="p-3 space-x-2">
                  <button
                    type="button"
                    onClick={() => setViewItem(w)}
                    className="px-2 py-1 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors"
                  >
                    {t("actionView")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditItem(w)}
                    className="px-2 py-1 bg-slate-200 text-slate-700 rounded cursor-pointer hover:bg-slate-300 transition-colors"
                  >
                    {t("actionEdit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteWarehouse(w.id)}
                    className="px-2 py-1 bg-rose-500 text-rose-50 rounded cursor-pointer hover:bg-rose-600 transition-colors"
                  >
                    {t("actionDelete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewItem && (
        <ViewWarehouseModal
          data={viewItem}
          onClose={() => setViewItem(null)}
        />
      )}

      {editItem && (
        <EditWarehouseModal
          data={editItem}
          onClose={() => {
            setEditItem(null);
            void load();
          }}
        />
      )}
    </>
  );
}
