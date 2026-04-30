'use client';

import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function AddProductModal({ onClose }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Product Added Successfully!");
    onClose();
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
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500">
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Apparel</option>
              <option>Home & Living</option>
            </select>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                required
                type="number"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                required
                type="number"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Supplier
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              placeholder="Supplier name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              placeholder="Product description"
            />
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

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

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
              className="px-4 py-2 rounded-lg bg-sky-500 text-sky-50 hover:bg-sky-600 transition-colors"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}