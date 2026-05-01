'use client';

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function AddOrderModal({ onClose }: { onClose: () => void }) {
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
  const [supplierProducts, setSupplierProducts] = useState<
    { productId: number; name: string; sku: string; unitPrice: string }[]
  >([]);
  const [supplierId, setSupplierId] = useState("");
  const [lines, setLines] = useState<
    { productId: string; quantityOrdered: string; unitCost: string }[]
  >([{ productId: "", quantityOrdered: "1", unitCost: "0" }]);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      const rs = await apiFetch("/suppliers");
      if (rs.ok) setSuppliers(await rs.json());
    })();
  }, []);

  useEffect(() => {
    if (!supplierId) {
      setSupplierProducts([]);
      return;
    }
    void (async () => {
      const res = await apiFetch(`/suppliers/${supplierId}/products`);
      if (!res.ok) {
        setSupplierProducts([]);
        return;
      }
      const rows = (await res.json()) as Array<{
        productId: number;
        name: string;
        sku: string;
        unitPrice: string;
      }>;
      setSupplierProducts(rows);
      setLines([{ productId: "", quantityOrdered: "1", unitCost: "0" }]);
    })();
  }, [supplierId]);

  const addLine = () => {
    setLines((prev) => [
      ...prev,
      { productId: "", quantityOrdered: "1", unitCost: "0" },
    ]);
  };

  const removeLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const updateLine = (
    index: number,
    field: "productId" | "quantityOrdered" | "unitCost",
    value: string,
  ) => {
    setLines((prev) =>
      prev.map((line, i) => {
        if (i !== index) return line;
        if (field === "productId") {
          const match = supplierProducts.find((item) => String(item.productId) === value);
          return {
            ...line,
            productId: value,
            unitCost: match?.unitPrice ?? line.unitCost,
          };
        }
        return { ...line, [field]: value };
      }),
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const sid = Number(supplierId);
      const payloadLines = lines.map((line) => ({
        productId: Number(line.productId),
        quantityOrdered: Number(line.quantityOrdered),
        unitCost: line.unitCost,
      }));
      if (
        !sid ||
        payloadLines.some((line) => !line.productId || !line.quantityOrdered) ||
        !supplierProducts.length
      ) {
        throw new Error("Select supplier and valid line items");
      }
      const r = await apiFetch("/inventory-orders", {
        method: "POST",
        body: JSON.stringify({
          supplierId: sid,
          expectedDeliveryDate: expectedDeliveryDate || undefined,
          lines: payloadLines,
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
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Add Manual Order</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Supplier</label>
            <select
              required
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
            >
              <option value="">Select supplier</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Expected Delivery Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              value={expectedDeliveryDate}
              onChange={(e) => setExpectedDeliveryDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {lines.map((line, index) => (
              <div key={index} className="grid grid-cols-12 gap-2">
                <select
                  required
                  className="col-span-6 border border-gray-300 text-gray-700 p-2 rounded"
                  value={line.productId}
                  onChange={(e) => updateLine(index, "productId", e.target.value)}
                >
                  <option value="">Select product</option>
                  {supplierProducts.map((p) => (
                    <option key={p.productId} value={p.productId}>
                      {p.sku} — {p.name}
                    </option>
                  ))}
                </select>

                <input
                  required
                  type="number"
                  min={1}
                  value={line.quantityOrdered}
                  onChange={(e) => updateLine(index, "quantityOrdered", e.target.value)}
                  placeholder="Qty"
                  className="col-span-2 border border-gray-300 text-gray-700 p-2 rounded"
                />

                <input
                  required
                  value={line.unitCost}
                  onChange={(e) => updateLine(index, "unitCost", e.target.value)}
                  placeholder="Unit cost"
                  className="col-span-3 border border-gray-300 text-gray-700 p-2 rounded"
                />

                <button
                  type="button"
                  onClick={() => removeLine(index)}
                  disabled={lines.length <= 1}
                  className="col-span-1 text-rose-600 disabled:text-slate-300"
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addLine}
            className="px-3 py-1 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
          >
            Add product
          </button>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors"
            >
              Cancel
            </button>
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
