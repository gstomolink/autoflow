'use client';

import { useState } from "react";

export default function WarehouseFilters({ onFilter }: any) {
  const [search, setSearch] = useState('');
  const [warehouse, setWarehouse] = useState('');

  const handleSearch = () => {
    onFilter({
      name: warehouse,
      search: search,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
      


      {/* Search Bar  */}
      <input
        type="text"
        placeholder="Search warehouse..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
      >
        Search
      </button>

    </div>
  );
}