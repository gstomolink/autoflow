'use client';

export default function AdjustStockModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        <h2 className="font-bold mb-4">Adjust Stock</h2>

        <p><b>{data.name}</b></p>

        <select className="w-full border p-2 rounded my-2">
          <option>Increase</option>
          <option>Decrease</option>
        </select>

        <input placeholder="Quantity" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="Reason" className="w-full border p-2 rounded mb-3"/>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded">Save</button>
        </div>

      </div>
    </div>
  );
}