'use client';


type Props = { product: any; onClose: () => void; };

export default function ViewProductModal({ product, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Product Details</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Supplier:</strong> {product.supplier}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}