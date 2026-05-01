'use client';

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { LIST_FETCH_LIMIT, readPaginatedJson } from "@/lib/paginated";

type Props = {
  onClose: () => void;
  onSaved?: () => void;
};

type CategoryRow = {
  id: number;
  name: string;
};

export default function AddProductModal({ onClose, onSaved }: Props) {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [reorderPoint, setReorderPoint] = useState("0");
  const [safetyStock, setSafetyStock] = useState("0");
  const [avgDailySales, setAvgDailySales] = useState("0");
  const [imageUrl, setImageUrl] = useState("");

  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [loadingMasterData, setLoadingMasterData] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadMasterData = async () => {
      setLoadingMasterData(true);
      setError("");
      try {
        const categoryRes = await apiFetch(
          `/categories?page=1&limit=${LIST_FETCH_LIMIT}`,
        );
        if (!categoryRes.ok) throw new Error(await categoryRes.text());
        const categoryBody = await readPaginatedJson<CategoryRow>(categoryRes);
        setCategories(categoryBody.items);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load form data");
      } finally {
        setLoadingMasterData(false);
      }
    };
    void loadMasterData();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(String(reader.result ?? ""));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        sku: sku.trim(),
        name: name.trim(),
        categoryId: categoryId ? Number(categoryId) : undefined,
        imageUrl: imageUrl.trim() || undefined,
        basePrice: basePrice.trim() || "0",
        reorderPoint: Number(reorderPoint || 0),
        safetyStock: Number(safetyStock || 0),
        avgDailySales: avgDailySales.trim() || "0",
      };
      const r = await apiFetch("/products", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(await r.text());
      onSaved?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Add New Product
        </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Product Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-700"
              placeholder="Enter product name"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              SKU
            </label>
            <input
              required
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-700"
              placeholder="Unique SKU"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-700"
              disabled={loadingMasterData}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing and planning */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Base Price
              </label>
              <input
                required
                type="text"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-700"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Avg Daily Sales
              </label>
              <input
                type="text"
                value={avgDailySales}
                onChange={(e) => setAvgDailySales(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-700"
                placeholder="0"
              />
            </div>
          </div>

          {/* Inventory thresholds */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Reorder Point
              </label>
              <input
                type="number"
                min={0}
                value={reorderPoint}
                onChange={(e) => setReorderPoint(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-700"
                placeholder="0"
              />
              <p className="mt-1 text-xs text-slate-500">
                stock at or below this number is treated as low and needs reorder
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Safety Stock
              </label>
              <input
                type="number"
                min={0}
                value={safetyStock}
                onChange={(e) => setSafetyStock(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-700"
                placeholder="0"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Product Image
            </label>

            <div className="flex items-center gap-4">
              <label className="block text-sm text-gray-700 mb-1">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <img
                src={imageUrl || "/product-placeholder.svg"}
                alt="Preview"
                onError={(e) => {
                  e.currentTarget.src = "/product-placeholder.svg";
                }}
                className="h-20 w-20 object-cover rounded-lg border"
              />
            </div>
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || loadingMasterData}
              className="px-4 py-2 rounded-lg bg-sky-500 text-sky-50 hover:bg-sky-600 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}