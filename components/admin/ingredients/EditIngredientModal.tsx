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
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Edit Ingredient</h2>
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

        {/* ================= BASIC INFO ================= */}
        <h3 className="font-semibold mb-2">Basic Info</h3>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Ingredient Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">SKU / Code *</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* ================= UNIT ================= */}
        <h3 className="font-semibold mb-2">Unit & Measurement</h3>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Unit Type</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            >
              <option value="kg">Weight (kg)</option>
              <option value="g">Weight (g)</option>
              <option value="liter">Volume (liter)</option>
              <option value="ml">Volume (ml)</option>
              <option value="pcs">Quantity (pcs)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Base Unit</label>
            <input
              name="baseUnit"
              placeholder="e.g. grams"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ================= INVENTORY ================= */}
        <h3 className="font-semibold mb-2">Inventory Settings</h3>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Current Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Reorder Level</label>
            <input
              name="reorder"
              type="number"
              value={form.reorder}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Safety Stock</label>
            <input
              name="safety"
              type="number"
              value={form.safety}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* ================= PRICING ================= */}
        <h3 className="font-semibold mb-2">Pricing</h3>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Cost Price</label>
            <input
              name="cost"
              type="number"
              value={form.cost}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* ================= SUPPLIER ================= */}
        <h3 className="font-semibold mb-2">Supplier Info</h3>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Supplier</label>
            <input
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Lead Time (days)</label>
            <input
              name="leadTime"
              type="number"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ================= EXPIRY ================= */}
        <h3 className="font-semibold mb-2">Expiry Settings</h3>

        <div className="space-y-3 mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            <input type="checkbox" className="mr-2" />
            Enable Expiry Tracking
          </label>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Shelf Life (days)</label>
            <input
              placeholder="Shelf Life (days)"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Alert Before Expiry (days)</label>
            <input
              placeholder="Alert Before Expiry (days)"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors"
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