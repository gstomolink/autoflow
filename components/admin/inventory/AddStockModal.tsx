'use client';

import { useState } from "react";

export default function AddStockModal({ onClose }: any) {
  const [form, setForm] = useState({
    product: "",
    warehouse: "",
    quantity: "",
    supplier: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.product || !form.quantity) {
      alert("Please fill required fields");
      return;
    }

    alert("Stock Added Successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add New Stock</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">

          <input
            name="product"
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />

          <select
            name="warehouse"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select Warehouse</option>
            <option>Main Warehouse</option>
            <option>Galle Branch</option>
            <option>Matara Depot</option>
          </select>

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />

          <input
            name="supplier"
            placeholder="Supplier ID"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-600 bg-slate-200 hover:bg-slate-300 rounded cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}