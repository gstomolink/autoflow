'use client';

export default function StockTransferModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Stock Transfer</h2>
          <button onClick={onClose}>⨯</button>
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

        <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded cursor-pointer hover:bg-purple-700">
          Transfer
        </button>
      </div>
    </div>
  );
}