'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import EditProductModal from "./EditProductModal";
import ViewProductModal from "./ViewProductModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";

type ProductRow = {
  id: number;
  sku: string;
  name: string;
  imageUrl: string | null;
  basePrice: string;
  categoryName: string;
  supplierCode: string;
};

export default function ProductTable({ filters }: { filters: Record<string, string> }) {
  const { t } = useAdminI18n();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [editItem, setEditItem] = useState<ProductRow | null>(null);
  const [viewItem, setViewItem] = useState<ProductRow | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch("/products");
      if (!r.ok) throw new Error(await r.text());
      setProducts(await r.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    let data = products;
    if (filters?.name) {
      const q = String(filters.name).toLowerCase();
      data = data.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (filters?.category) {
      data = data.filter((p) => p.categoryName === filters.category);
    }
    return data;
  }, [filters, products]);

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    const r = await apiFetch(`/products/${id}`, { method: "DELETE" });
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
        <table className="w-full text-black">
          <thead className="bg-white">
            <tr>
              <th className="p-3 text-left">{t("tableProductId")}</th>
              <th className="p-3 text-left">{t("tableImage")}</th>
              <th className="p-3 text-left">{t("tableName")}</th>
              <th className="p-3 text-left">{t("tableCategory")}</th>
              <th className="p-3 text-left">{t("tablePrice")}</th>
              <th className="p-3 text-left">{t("tableSupplierId")}</th>
              <th className="p-3 text-left">{t("tableActions")}</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-gray-200">
                <td className="p-3">{p.sku}</td>
                <td className="p-3">
                  <img
                    src={p.imageUrl || "/products/p1.jpg"}
                    alt=""
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.categoryName}</td>
                <td className="p-3">${Number(p.basePrice).toFixed(2)}</td>
                <td className="p-3">{p.supplierCode || "—"}</td>
                <td className="p-3 space-x-2">
                  <button type="button" onClick={() => setViewItem(p)} className="px-2 py-1 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 transition-colors cursor-pointer">{t("actionView")}</button>
                  <button type="button" onClick={() => setEditItem(p)} className="px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors cursor-pointer">{t("actionEdit")}</button>
                  <button type="button" onClick={() => deleteProduct(p.id)} className="px-2 py-1 bg-rose-500 text-rose-50 hover:bg-rose-600 rounded  transition-colors cursor-pointer">{t("actionDelete")}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && <EditProductModal product={editItem} onClose={() => { setEditItem(null); void load(); }} />}
      {viewItem && <ViewProductModal product={viewItem} onClose={() => setViewItem(null)} />}
    </>
  );
}
