'use client';

export default function RecipeFilters({ filters, setFilters }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">

      <input
        type="text"
        placeholder="Search product..."
        value={filters.search}
        onChange={(e)=>setFilters({...filters, search:e.target.value})}
        className="w-72 border border-gray-300 px-3 py-2 rounded-lg"
      />

      <select
        value={filters.category}
        onChange={(e)=>setFilters({...filters, category:e.target.value})}
        className="border border-gray-300 px-3 py-2 rounded-lg"
      >
        <option value="">All Categories</option>
        <option>Burger</option>
        <option>Pizza</option>
        <option>Rice</option>
        <option>Pasta</option>
      </select>

      <button className="ml-auto bg-sky-500 text-white px-5 py-2 rounded-lg">
        Search
      </button>

    </div>
  );
}