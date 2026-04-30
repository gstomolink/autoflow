'use client';

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type OrderLine = {
  productId: number;
  quantityOrdered: number;
  unitCost: string;
  product?: { name?: string; sku?: string };
};

type InvOrder = {
  id: number;
  supplier?: { id: number; name: string };
  expectedDeliveryDate: string | null;
  lines?: OrderLine[];
};

export default function EditOrderModal({
  data,
  onClose,
}: {
  data: InvOrder;
  onClose: () => void;
}) {
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
  const [supplierProducts, setSupplierProducts] = useState<
    { productId: number; name: string; sku: string; unitPrice: string }[]
  >([]);
  const [supplierId, setSupplierId] = useState(String(data.supplier?.id ?? ""));
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(
    data.expectedDeliveryDate ? String(data.expectedDeliveryDate).slice(0, 10) : "",
  );
  const [lines, setLines] = useState<
    { productId: string; quantityOrdered: string; unitCost: string }[]
  >(
    (data.lines ?? []).map((line) => ({
      productId: String(line.productId),
      quantityOrdered: String(line.quantityOrdered),
      unitCost: String(line.unitCost ?? "0"),
    })),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
    })();
  }, [supplierId]);

  const addLine = () => {
    setLines((prev) => [...prev, { productId: "", quantityOrdered: "1", unitCost: "0" }]);
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
      if (!sid || payloadLines.some((line) => !line.productId || !line.quantityOrdered)) {
        throw new Error("Please select supplier and valid line items");
      }
      const r = await apiFetch(`/inventory-orders/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          supplierId: sid,
          expectedDeliveryDate: expectedDeliveryDate || null,
          lines: payloadLines,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl text-gray-700">
        <h2 className="font-bold mb-3 text-black">Edit order</h2>

        <form className="space-y-3" onSubmit={submit}>
          <select
            required
            className="w-full border border-gray-300 text-gray-700 p-2 rounded"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
          >
            <option value="">Select supplier</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full border border-gray-300 text-gray-700 p-2 rounded"
            value={expectedDeliveryDate}
            onChange={(e) => setExpectedDeliveryDate(e.target.value)}
          />

          <div className="space-y-2">
            {lines.map((line, index) => (
              <div key={index} className="grid grid-cols-12 gap-2">
                <select
                  required
                  value={line.productId}
                  onChange={(e) => updateLine(index, "productId", e.target.value)}
                  className="col-span-6 border border-gray-300 text-gray-700 p-2 rounded"
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
                  className="col-span-2 border border-gray-300 text-gray-700 p-2 rounded"
                  placeholder="Qty"
                />
                <input
                  required
                  value={line.unitCost}
                  onChange={(e) => updateLine(index, "unitCost", e.target.value)}
                  className="col-span-3 border border-gray-300 text-gray-700 p-2 rounded"
                  placeholder="Unit cost"
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

          <div className="flex gap-2 mt-4 justify-end">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-sky-500 text-sky-50 px-4 py-2 rounded disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
