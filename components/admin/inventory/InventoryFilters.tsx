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
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-end gap-4">

      {/* Product Search */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Search Product</label>
        <input
          name="product"
          placeholder="Search by product..."
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded w-60 text-gray-700 cursor-pointer"
        />
      </div>

      {/* Warehouse Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Warehouse</label>
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
      </div>

      {/* Status Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded text-gray-700 cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="low">Low Stock</option>
          <option value="ok">In Stock</option>
        </select>
      </div>

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