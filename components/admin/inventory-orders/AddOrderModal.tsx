'use client';

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function AddOrderModal({ onClose }: { onClose: () => void }) {
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
  const [products, setProducts] = useState<{ id: number; name: string; sku: string }[]>([]);
  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("1");
  const [unitCost, setUnitCost] = useState("0");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      const [rs, rp] = await Promise.all([
        apiFetch("/suppliers"),
        apiFetch("/products"),
      ]);
      if (rs.ok) setSuppliers(await rs.json());
      if (rp.ok) setProducts(await rp.json());
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const sid = Number(supplierId);
      const pid = Number(productId);
      const q = Number(qty);
      if (!sid || !pid || !q) {
        throw new Error("Select supplier, product, and quantity");
      }
      const r = await apiFetch("/inventory-orders", {
        method: "POST",
        body: JSON.stringify({
          supplierId: sid,
          expectedDeliveryDate: expectedDeliveryDate || undefined,
          lines: [
            {
              productId: pid,
              quantityOrdered: q,
              unitCost,
            },
          ],
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-gray-700">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Add Manual Order</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form className="space-y-3" onSubmit={submit}>
          <select
            required
            className="w-full border border-gray-300 text-gray-700 p-2 rounded"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
          >
            <option value="">Select supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            required
            className="w-full border border-gray-300 text-gray-700 p-2 rounded"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.sku} — {p.name}</option>
            ))}
          </select>

          <input
            type="date"
            className="w-full border border-gray-300 text-gray-700 p-2 rounded"
            value={expectedDeliveryDate}
            onChange={(e) => setExpectedDeliveryDate(e.target.value)}
          />

          <input
            required
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Quantity"
            className="w-full border border-gray-300 text-gray-700 p-2 rounded"
          />

          <input
            required
            value={unitCost}
            onChange={(e) => setUnitCost(e.target.value)}
            placeholder="Unit cost"
            className="w-full border border-gray-300 text-gray-700 p-2 rounded"
          />

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
