'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import EditProductModal from "./EditProductModal";
import ViewProductModal from "./ViewProductModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";
import {
  LIST_FETCH_LIMIT,
  PAGE_SIZE,
  readPaginatedJson,
  slicePage,
} from "@/lib/paginated";
import { SHOP_SCOPE_CHANGE_EVENT } from "@/lib/shop-scope";
import TablePagination from "@/components/admin/common/TablePagination";

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
  const [listPage, setListPage] = useState(1);
  const [editItem, setEditItem] = useState<ProductRow | null>(null);
  const [viewItem, setViewItem] = useState<ProductRow | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: String(LIST_FETCH_LIMIT),
      });
      const q = String(filters?.name ?? "").trim();
      if (q) params.set("search", q);
      const category = String(filters?.category ?? "").trim();
      if (category) params.set("category", category);
      const r = await apiFetch(
        `/products?${params.toString()}`,
      );
      if (!r.ok) throw new Error(await r.text());
      const body = await readPaginatedJson<ProductRow>(r);
      setProducts(body.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const handleShopScopeChange = () => {
      void load();
    };
    window.addEventListener(SHOP_SCOPE_CHANGE_EVENT, handleShopScopeChange);
    return () => {
      window.removeEventListener(SHOP_SCOPE_CHANGE_EVENT, handleShopScopeChange);
    };
  }, [load]);

  const pagedRows = useMemo(
    () => slicePage(products, listPage, PAGE_SIZE),
    [products, listPage],
  );

  useEffect(() => {
    setListPage(1);
  }, [filters]);

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
              <th className="p-3 text-left">{t("tableActions")}</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr className="border-t border-gray-200">
                <td className="p-6 text-center text-slate-500" colSpan={6}>
                  No data
                </td>
              </tr>
            ) : null}
            {pagedRows.map((p) => (
              <tr key={p.id} className="border-t border-gray-200">
                <td className="p-3">{p.sku}</td>
                <td className="p-3">
                  <img
                    src={p.imageUrl || "/product-placeholder.svg"}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.src = "/product-placeholder.svg";
                    }}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.categoryName}</td>
                <td className="p-3">${Number(p.basePrice).toFixed(2)}</td>
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
        <TablePagination
          page={listPage}
          total={products.length}
          pageSize={PAGE_SIZE}
          onPageChange={setListPage}
        />

      {editItem && <EditProductModal product={editItem} onClose={() => { setEditItem(null); void load(); }} />}
      {viewItem && <ViewProductModal product={viewItem} onClose={() => setViewItem(null)} />}
    </>
  );
}
