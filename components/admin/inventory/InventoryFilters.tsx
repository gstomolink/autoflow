'use client';

import { useState } from "react";

export default function InventoryFilters({ onFilter }: any) {
  const [filters, setFilters] = useState({
    product: "",
    warehouse: "",
    status: "",
  });

  const handleChange = (e: any) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    onFilter(updated);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex flex-wrap gap-4">

      {/* Product Search */}
      <input
        name="product"
        placeholder="Search by product..."
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded w-60 text-gray-700 cursor-pointer"
      />

      {/* Warehouse Filter */}
      <select
        name="warehouse"
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded text-gray-700 cursor-pointer"
      >
        <option value="">All Warehouses</option>
        <option>Main Warehouse</option>
        <option>Galle Branch</option>
        <option>Matara Depot</option>
        <option>Kandy Storage</option>
      </select>

      {/* Status Filter */}
      <select
        name="status"
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded text-gray-700 cursor-pointer"
      >
        <option value="">All Status</option>
        <option value="low">Low Stock</option>
        <option value="ok">In Stock</option>
      </select>

      {/* Reset Button */}
      <button
        onClick={() => {
          setFilters({ product: "", warehouse: "", status: "" });
          onFilter({});
        }}
        className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
}