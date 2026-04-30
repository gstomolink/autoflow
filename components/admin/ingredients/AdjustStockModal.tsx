'use client';

export default function AdjustStockModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        <h2 className="font-bold mb-4">Adjust Stock</h2>

        <p><b>{data.name}</b></p>

        <select className="w-full p-2 rounded my-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500">
          <option>Increase</option>
          <option>Decrease</option>
        </select>

        <input placeholder="Quantity" className="w-full p-2 rounded mb-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        <input placeholder="Reason" className="w-full p-2 rounded mb-3 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">Cancel</button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded">Save</button>
        </div>

      </div>
    </div>
  );
}