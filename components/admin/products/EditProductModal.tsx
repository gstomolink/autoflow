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
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Edit Product</h2>
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
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">SKU</label>
            <input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              placeholder="SKU"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Base Price</label>
            <input
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              placeholder="Base price"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Image URL</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              placeholder="Image URL"
            />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </div>
        <div className="flex justify-end gap-3 pt-4 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">Cancel</button>
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
