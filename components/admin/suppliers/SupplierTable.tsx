'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ViewSupplierModal from "./ViewSupplierModal";
import EditSupplierModal from "./EditSupplierModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";

type Sup = {
  id: number;
  name: string;
  code: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  defaultLeadTimeDays?: number;
};

export default function SupplierTable() {
  const { t } = useAdminI18n();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [viewItem, setViewItem] = useState<Sup | null>(null);
  const [editItem, setEditItem] = useState<Sup | null>(null);
  const [suppliers, setSuppliers] = useState<Sup[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch("/suppliers");
      if (!r.ok) throw new Error(await r.text());
      setSuppliers(await r.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!search) return suppliers;
    return suppliers.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, suppliers]);

  const deleteSupplier = async (id: number) => {
    if (!confirm("Delete supplier?")) return;
    const r = await apiFetch(`/suppliers/${id}`, { method: "DELETE" });
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
      <div className="flex justify-between items-end mb-4 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Search</label>
          <input
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 text-gray-700 px-3 py-2 rounded w-72 cursor-pointer"
          />
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={() => void load()} className="bg-sky-500 text-sky-50 px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer">
            {t("actionSearch")}
          </button>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      <table className="w-full bg-white rounded shadow text-gray-700">
        <thead className="bg-white text-left">
          <tr>
            <th className="p-3">{t("tableSupplierId")}</th>
            <th className="p-3">{t("tableName")}</th>
            <th className="p-3">{t("tableContact")}</th>
            <th className="p-3">{t("tableEmail")}</th>
            <th className="p-3">{t("tableAddress")}</th>
            <th className="p-3">Lead (days)</th>
            <th className="p-3">{t("tableActions")}</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr className="border-t border-gray-300">
              <td className="p-6 text-center text-slate-500" colSpan={7}>
                No data
              </td>
            </tr>
          ) : null}
          {filtered.map((s) => (
            <tr key={s.id} className="border-t border-gray-300">
              <td className="p-3">{s.id}</td>
              <td className="p-3 font-medium">{s.name}</td>
              <td className="p-3">{s.phone ?? "—"}</td>
              <td className="p-3">{s.email ?? "—"}</td>
              <td className="p-3">{s.address ?? "—"}</td>
              <td className="p-3">{s.defaultLeadTimeDays ?? "—"}</td>

              <td className="p-3 space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/admin/suppliers/${s.id}/products?supplierName=${encodeURIComponent(s.name)}`,
                    )
                  }
                  className="px-2 py-1 bg-indigo-500 text-indigo-50 rounded hover:bg-indigo-600 transition-colors cursor-pointer"
                >
                  Manage Products
                </button>

                <button
                  type="button"
                  onClick={() => setViewItem(s)}
                  className="px-2 py-1 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 transition-colors cursor-pointer"
                >
                  {t("actionView")}
                </button>

                <button
                  type="button"
                  onClick={() => setEditItem(s)}
                  className="px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  {t("actionEdit")}
                </button>

                <button
                  type="button"
                  onClick={() => deleteSupplier(s.id)}
                  className="px-2 py-1 bg-rose-500 text-rose-50 rounded hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  {t("actionDelete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewItem && (
        <ViewSupplierModal data={viewItem} onClose={() => setViewItem(null)} />
      )}

      {editItem && (
        <EditSupplierModal
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
