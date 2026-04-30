'use client';

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

type SupplierProductRow = {
  linkId: number;
  productId: number;
  sku: string;
  name: string;
  categoryName: string;
  basePrice: string;
  unitPrice: string;
  minOrderQty: number;
  leadTimeDays: number | null;
  isPrimarySupplier: boolean;
};

type ProductRow = {
  id: number;
  sku: string;
  name: string;
};

export default function SupplierProductsPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const supplierId = Number(params.id);
  const supplierName = searchParams.get("supplierName") || `Supplier #${params.id}`;

  const [rows, setRows] = useState<SupplierProductRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [addForm, setAddForm] = useState({
    productId: "",
    unitPrice: "0",
    minOrderQty: "1",
    leadTimeDays: "",
    setAsPrimary: true,
  });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [linkedRes, productsRes] = await Promise.all([
        apiFetch(`/suppliers/${supplierId}/products`),
        apiFetch("/products"),
      ]);
      if (!linkedRes.ok) throw new Error(await linkedRes.text());
      if (!productsRes.ok) throw new Error(await productsRes.text());
      setRows((await linkedRes.json()) as SupplierProductRow[]);
      setProducts((await productsRes.json()) as ProductRow[]);
    } catch (e) {
      setRows([]);
      setProducts([]);
      setError(e instanceof Error ? e.message : "Failed to load supplier products");
    } finally {
      setLoading(false);
    }
  }, [supplierId]);

  useEffect(() => {
    void load();
  }, [load]);

  const availableProducts = useMemo(
    () => products.filter((p) => !rows.some((r) => r.productId === p.id)),
    [products, rows],
  );

  const categories = useMemo(() => {
    const values = rows
      .map((row) => row.categoryName)
      .filter((name) => Boolean(name));
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filteredRows = useMemo(() => {
    if (!categoryFilter) return rows;
    return rows.filter((row) => row.categoryName === categoryFilter);
  }, [rows, categoryFilter]);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await apiFetch(`/suppliers/${supplierId}/products`, {
        method: "POST",
        body: JSON.stringify({
          productId: Number(addForm.productId),
          unitPrice: addForm.unitPrice || "0",
          minOrderQty: Number(addForm.minOrderQty || 1),
          leadTimeDays: addForm.leadTimeDays ? Number(addForm.leadTimeDays) : undefined,
          setAsPrimary: addForm.setAsPrimary,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setShowAdd(false);
      setAddForm({
        productId: "",
        unitPrice: "0",
        minOrderQty: "1",
        leadTimeDays: "",
        setAsPrimary: true,
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Manage Supplier Products</h1>
          <p className="text-gray-700">{supplierName}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="bg-sky-500 text-sky-50 px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
          >
            Add Product
          </button>
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-transparent text-slate-600 border border-slate-400 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Create New Product
          </Link>
          <Link
            href="/admin/suppliers"
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
          >
            Back to Suppliers
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex items-center gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {error ? <p className="text-rose-600 text-sm mb-2">{error}</p> : null}
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-gray-700">
            <thead className="bg-white">
              <tr>
                <th className="p-3 text-left">SKU</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Base Price</th>
                <th className="p-3 text-left">Supplier Price</th>
                <th className="p-3 text-left">MOQ</th>
                <th className="p-3 text-left">Lead Days</th>
                <th className="p-3 text-left">Primary</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.linkId} className="border-t border-gray-200">
                  <td className="p-3">{row.sku}</td>
                  <td className="p-3 font-medium">{row.name}</td>
                  <td className="p-3">{row.categoryName || "-"}</td>
                  <td className="p-3">{Number(row.basePrice).toFixed(2)}</td>
                  <td className="p-3">{Number(row.unitPrice).toFixed(2)}</td>
                  <td className="p-3">{row.minOrderQty}</td>
                  <td className="p-3">{row.leadTimeDays ?? "-"}</td>
                  <td className="p-3">{row.isPrimarySupplier ? "Yes" : "No"}</td>
                </tr>
              ))}
              {!filteredRows.length ? (
                <tr>
                  <td className="p-3 text-slate-500" colSpan={8}>
                    No products match this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-black">Add Product to Supplier</h2>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                x
              </button>
            </div>
            <form onSubmit={addProduct} className="space-y-3">
              <select
                required
                value={addForm.productId}
                onChange={(e) => setAddForm((s) => ({ ...s, productId: e.target.value }))}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
              >
                <option value="">Select product</option>
                {availableProducts.map((p) => (
                  <option key={p.id} value={String(p.id)}>
                    {p.sku} - {p.name}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  value={addForm.unitPrice}
                  onChange={(e) => setAddForm((s) => ({ ...s, unitPrice: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
                  placeholder="Supplier price"
                />
                <input
                  type="number"
                  min={1}
                  value={addForm.minOrderQty}
                  onChange={(e) => setAddForm((s) => ({ ...s, minOrderQty: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
                  placeholder="MOQ"
                />
                <input
                  type="number"
                  min={0}
                  value={addForm.leadTimeDays}
                  onChange={(e) => setAddForm((s) => ({ ...s, leadTimeDays: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
                  placeholder="Lead days"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={addForm.setAsPrimary}
                  onChange={(e) =>
                    setAddForm((s) => ({ ...s, setAsPrimary: e.target.checked }))
                  }
                />
                set this supplier as primary for the product
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-sky-500 text-sky-50 hover:bg-sky-600 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
