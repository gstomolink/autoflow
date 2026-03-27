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

          <button onClick={onClose} className="cursor-pointer text-black items-center">
            ⨯
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
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700">
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
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"
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
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"
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
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"
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
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-700"
              placeholder="Product description"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Product Image
            </label>

            <div className="flex items-center gap-4">
              <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
              className="px-4 py-2 rounded-lg bg-white border border-purple-600 hover:bg-purple-100 text-purple-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}