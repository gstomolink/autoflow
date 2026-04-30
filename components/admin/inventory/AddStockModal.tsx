'use client';

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

type Props = {
  onClose: () => void;
  onSaved?: () => void;
};

type ProductRow = {
  id: number;
  sku: string;
  name: string;
};

export default function AddStockModal({ onClose, onSaved }: Props) {
  const [productId, setProductId] = useState("");
  const [initialQty, setInitialQty] = useState("0");
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMasterData = async () => {
      setLoading(true);
      setError("");
      try {
        const productRes = await apiFetch("/products");
        if (!productRes.ok) throw new Error(await productRes.text());
        setProducts((await productRes.json()) as ProductRow[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load form data");
      } finally {
        setLoading(false);
      }
    };
    void loadMasterData();
  }, []);

  const canSave = useMemo(
    () => Boolean(productId && Number(initialQty) >= 0),
    [productId, initialQty],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    setError("");
    try {
      const ensureRes = await apiFetch(
        `/inventory-stock/ensure?productId=${encodeURIComponent(productId)}`,
        { method: "POST" },
      );
      if (!ensureRes.ok) throw new Error(await ensureRes.text());
      const row = (await ensureRes.json()) as { id: number };
      const qty = Number(initialQty || 0);
      if (qty > 0) {
        const adjustRes = await apiFetch(`/inventory-stock/${row.id}/adjust`, {
          method: "PATCH",
          body: JSON.stringify({ delta: qty }),
        });
        if (!adjustRes.ok) throw new Error(await adjustRes.text());
      }
      onSaved?.();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add stock row");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl text-gray-700 overflow-y-auto max-h-[90vh]">

        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-black">Add Product to Inventory</h2>
          <button type="button" onClick={onClose}>✕</button>
        </div>

        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="text-sm mb-1 block">Product</label>
            <select
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              disabled={loading}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.sku} - {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm mb-1 block">Initial Quantity</label>
            <input
              type="number"
              min={0}
              value={initialQty}
              onChange={(e) => setInitialQty(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="0"
            />
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm text-slate-600">
            this adds stock at shop level inventory, then applies initial quantity
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSave || saving || loading}
              className="bg-sky-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}