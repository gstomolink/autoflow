'use client';

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type Row = {
  id: number;
  sku: string;
  name: string;
  imageUrl: string | null;
  basePrice: string;
  categoryName: string;
  supplierCode: string;
};

export default function EditProductModal({
  product,
  onClose,
}: {
  product: Row;
  onClose: () => void;
}) {
  const [name, setName] = useState(product.name);
  const [sku, setSku] = useState(product.sku);
  const [basePrice, setBasePrice] = useState(product.basePrice);
  const [imageUrl, setImageUrl] = useState(product.imageUrl ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const r = await apiFetch(`/products/${product.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          sku,
          basePrice,
          imageUrl: imageUrl || null,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold text-black mb-4">Edit Product</h2>
        <div className="space-y-3">
          <input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="SKU"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Name"
          />
          <input
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Base price"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Image URL"
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void handleSave()}
            className="px-4 py-2 bg-sky-500 text-sky-50 rounded-lg disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
