'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import CategoryFormModal from "./CategoryFormModal";
import ViewCategoryModal from "./ViewCategoryModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";

type Cat = {
  id: number;
  name: string;
  description: string | null;
  productCount: number;
  createdAt: string;
};

export default function CategoriesTable({ filters }: { filters: Record<string, string> }) {
  const { t } = useAdminI18n();
  const [categories, setCategories] = useState<Cat[]>([]);
  const [editItem, setEditItem] = useState<Cat | null>(null);
  const [viewItem, setViewItem] = useState<Cat | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch("/categories");
      if (!r.ok) throw new Error(await r.text());
      setCategories(await r.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredData = useMemo(() => {
    let data = categories;
    if (filters?.search) {
      const q = String(filters.search).trim().toLowerCase();
      data = data.filter((c) => c.name.toLowerCase().includes(q));
    }
    return data;
  }, [filters, categories]);

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete category?")) return;
    const r = await apiFetch(`/categories/${id}`, { method: "DELETE" });
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
        <table className="w-full">
          <thead className="bg-white text-black text-sm">
            <tr>
              <th className="p-3 text-left">{t("tableCategoryId")}</th>
              <th className="p-3 text-left">{t("tableName")}</th>
              <th className="p-3 text-left">{t("tableDescription")}</th>
              <th className="p-3 text-left">{t("tableProducts")}</th>
              <th className="p-3 text-left">{t("tableCreated")}</th>
              <th className="p-3 text-left">{t("tableActions")}</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr className="border-t">
                <td className="p-6 text-center text-slate-500" colSpan={6}>
                  No data
                </td>
              </tr>
            ) : null}
            {filteredData.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3 text-gray-700">{cat.id}</td>
                <td className="p-3 font-medium text-gray-700">{cat.name}</td>
                <td className="p-3 text-gray-700">{cat.description ?? "—"}</td>
                <td className="p-3 text-gray-700">{cat.productCount}</td>
                <td className="p-3 text-gray-700">
                  {cat.createdAt ? String(cat.createdAt).slice(0, 10) : "—"}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    type="button"
                    onClick={() => setViewItem(cat)}
                    className="px-2 py-1 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 transition-colors cursor-pointer"
                  >
                    {t("actionView")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditItem(cat)}
                    className="px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    {t("actionEdit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCategory(cat.id)}
                    className="px-2 py-1 bg-rose-500 text-rose-50 rounded hover:bg-rose-600 transition-colors cursor-pointer"
                  >
                    {t("actionDelete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && (
        <CategoryFormModal
          mode="edit"
          data={editItem}
          onClose={() => {
            setEditItem(null);
            void load();
          }}
        />
      )}

      {viewItem && (
        <ViewCategoryModal
          data={viewItem}
          onClose={() => setViewItem(null)}
        />
      )}
    </>
  );
}
