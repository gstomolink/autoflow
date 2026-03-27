'use client';

export default function Filters() {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex flex-wrap gap-3 items-center justify-between">

        {/* LEFT */}
        <div className="flex gap-2 flex-wrap">
          <input type="month" className="border border-gray-300 text-gray-700 p-2 rounded" />

          <select className="border border-gray-300 text-gray-700 p-2 rounded">
            <option>All Suppliers</option>
            <option>ABC Traders</option>
          </select>

          <select className="border border-gray-300 text-gray-700 p-2 rounded">
            <option>All Categories</option>
            <option>Electronics</option>
          </select>

          <input
            placeholder="Search product / SKU"
            className="border border-gray-300 text-gray-700 p-2 rounded"
          />
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">
          <button className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer">
             Search
          </button>

        </div>
      </div>
    </div>
  );
}