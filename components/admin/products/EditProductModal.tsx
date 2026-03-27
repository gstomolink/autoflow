'use client';

import { useState } from "react";
import { Product } from "./ProductTable";

type Props = { product: Product; onClose: () => void; };

export default function EditProductModal({ product, onClose }: Props) {
  const [form, setForm] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Product updated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Edit Product
        </h2>

          <button onClick={onClose} className="cursor-pointer text-black items-center">
            ⨯
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"/>
          </div>

          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700">
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Apparel</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Price ($)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"/>
          </div>

          <div>
            <label className="text-sm text-gray-600">Supplier</label>
            <input name="supplier" value={form.supplier} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"/>
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white border border-purple-600 hover:bg-purple-100 text-purple-600">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Save</button>
        </div>
      </div>
    </div>
  );
}