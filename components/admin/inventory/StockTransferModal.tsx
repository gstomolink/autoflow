'use client';

export default function StockTransferModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Stock Transfer</h2>
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

        <div className="space-y-3">
          <select className="border border-gray-300 p-2 w-full rounded">
            <option>Main Warehouse</option>
          </select>
          <select className="border border-gray-300 p-2 w-full rounded">
            <option>Galle Branch</option>
          </select>
          <input placeholder="Product" className="border border-gray-300 p-2 w-full rounded"/>
          <input type="number" placeholder="Quantity" className="border border-gray-300 p-2 w-full rounded"/>
        </div>

        <button className="mt-4 w-full bg-sky-500 text-sky-50 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors">
          Transfer
        </button>
      </div>
    </div>
  );
}