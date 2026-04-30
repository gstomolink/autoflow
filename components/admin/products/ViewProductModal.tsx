'use client';

type Row = {
  id: number;
  sku: string;
  name: string;
  imageUrl: string | null;
  basePrice: string;
  categoryName: string;
  supplierCode: string;
};

export default function ViewProductModal({
  product,
  onClose,
}: {
  product: Row;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Product Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <img
          src={product.imageUrl || "/products/p1.jpg"}
          alt=""
          className="h-32 w-32 object-cover rounded mb-4"
        />

        <div className="space-y-2">
          <p><b>SKU:</b> {product.sku}</p>
          <p><b>Name:</b> {product.name}</p>
          <p><b>Category:</b> {product.categoryName}</p>
          <p><b>Price:</b> ${Number(product.basePrice).toFixed(2)}</p>
          <p><b>Supplier:</b> {product.supplierCode || "—"}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-300 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}
