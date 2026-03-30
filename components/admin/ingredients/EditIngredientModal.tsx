'use client';

import { useState } from "react";

export default function EditIngredientModal({ data, onClose }: any) {
  const [form, setForm] = useState(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-xl w-full max-w-2xl text-gray-700 overflow-y-auto max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Edit Ingredient</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* ================= BASIC INFO ================= */}
        <h3 className="font-semibold mb-2">Basic Info</h3>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-sm">Ingredient Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">SKU / Code *</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* ================= UNIT ================= */}
        <h3 className="font-semibold mb-2">Unit & Measurement</h3>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-sm">Unit Type</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="kg">Weight (kg)</option>
              <option value="g">Weight (g)</option>
              <option value="liter">Volume (liter)</option>
              <option value="ml">Volume (ml)</option>
              <option value="pcs">Quantity (pcs)</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Base Unit</label>
            <input
              name="baseUnit"
              placeholder="e.g. grams"
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ================= INVENTORY ================= */}
        <h3 className="font-semibold mb-2">Inventory Settings</h3>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="text-sm">Current Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">Reorder Level</label>
            <input
              name="reorder"
              type="number"
              value={form.reorder}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">Safety Stock</label>
            <input
              name="safety"
              type="number"
              value={form.safety}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* ================= PRICING ================= */}
        <h3 className="font-semibold mb-2">Pricing</h3>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-sm">Cost Price</label>
            <input
              name="cost"
              type="number"
              value={form.cost}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* ================= SUPPLIER ================= */}
        <h3 className="font-semibold mb-2">Supplier Info</h3>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-sm">Supplier</label>
            <input
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm">Lead Time (days)</label>
            <input
              name="leadTime"
              type="number"
              className="w-full border px-3 py-2 rounded"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ================= EXPIRY ================= */}
        <h3 className="font-semibold mb-2">Expiry Settings</h3>

        <div className="space-y-2 mb-4">
          <label className="flex gap-2 items-center">
            <input type="checkbox" />
            Enable Expiry Tracking
          </label>

          <input
            placeholder="Shelf Life (days)"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            placeholder="Alert Before Expiry (days)"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}