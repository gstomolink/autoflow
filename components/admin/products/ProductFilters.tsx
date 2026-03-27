'use client';

import { useState } from "react";

type Props = {
  onFilter: (filters: any) => void;
};

export default function ProductFilters({ onFilter }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onFilter({
      name: search,
      category: category,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-lg w-72 text-gray-700"
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
      >
        <option value="">All Categories</option>
        <option>Electronics</option>
        <option>Accessories</option>
        <option>Apparel</option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="ml-auto bg-sky-500 text-sky-50 px-5 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
      >
        Search
      </button>

    </div>
  );
}