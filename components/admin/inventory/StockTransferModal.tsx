'use client';

export default function StockTransferModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Stock Transfer</h2>
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

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">From Warehouse</label>
            <select className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500">
              <option>Main Warehouse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">To Branch</label>
            <select className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500">
              <option>Galle Branch</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Product</label>
            <input placeholder="Product" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Quantity</label>
            <input type="number" placeholder="Quantity" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors">
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}