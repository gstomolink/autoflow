'use client';

import { useState } from "react";

export default function EditOrderModal({ data, onClose }: any) {
  const [form, setForm] = useState(data);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalCost = (form.ordered || 0) * (form.unitCost || 0);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 text-gray-700 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Edit Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* BASIC INFO */}
        <div className="mb-5">
          <h3 className="font-semibold mb-2">Basic Info</h3>

          <label className="text-sm">Product</label>
          <input name="product" value={form.product} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mb-2"/>

          <label className="text-sm">Supplier</label>
          <input name="supplier" value={form.supplier} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mb-2"/>

          <label className="text-sm">Expected Delivery Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
        </div>

        {/* STOCK INFO */}
        <div className="mb-5">
          <h3 className="font-semibold mb-2">Stock Info</h3>

          <label className="text-sm">Current Stock</label>
          <input value={form.stock} disabled className="w-full border border-gray-300 p-2 rounded bg-gray-100 mb-2"/>

          <label className="text-sm">Reorder Level</label>
          <input value={form.reorder} disabled className="w-full border border-gray-300 p-2 rounded bg-gray-100"/>
        </div>

        {/* ORDER INFO */}
        <div className="mb-5">
          <h3 className="font-semibold mb-2">Order Info</h3>

          <label className="text-sm">Suggested Quantity</label>
          <input value={form.suggested} disabled className="w-full border border-gray-300 p-2 rounded bg-gray-100 mb-2"/>

          <label className="text-sm">Ordered Quantity</label>
          <input name="ordered" type="number" value={form.ordered} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mb-2"/>

          <label className="text-sm">Unit Cost</label>
          <input name="unitCost" type="number" value={form.unitCost || 0} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded mb-2"/>

          <label className="text-sm">Total Cost</label>
          <input value={totalCost} disabled className="w-full border border-gray-300 p-2 rounded bg-gray-100"/>
        </div>

        {/* NOTES */}
        <div className="mb-5">
          <label className="text-sm">Notes</label>
          <textarea name="notes" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border border-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
          <button className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer">Save</button>
        </div>

      </div>
    </div>
  );
}