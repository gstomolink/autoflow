'use client';
import { Product } from "./ProductTable";

export default function ViewProductModal({ product, onClose }: { product: Product; onClose: ()=>void }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Product Details
        </h2>

          <button onClick={onClose} className="cursor-pointer text-black items-center">
            ⨯
          </button>
        </div>

        <img src={product.image} className="h-32 w-32 object-cover rounded mb-4" />

        <div className="space-y-2">
          <p><b>ID:</b> {product.id}</p>
          <p><b>Name:</b> {product.name}</p>
          <p><b>Category:</b> {product.category}</p>
          <p><b>Price:</b> ${product.price}</p>
          <p><b>Supplier:</b> {product.supplier}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
}