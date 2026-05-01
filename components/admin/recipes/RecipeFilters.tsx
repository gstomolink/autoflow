'use client';

export default function RecipeFilters({ filters, setFilters }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-end gap-4">

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          placeholder="Search product..."
          value={filters.search}
          onChange={(e)=>setFilters({...filters, search:e.target.value})}
          className="w-72 border border-gray-300 px-3 py-2 rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Category</label>
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
      </div>

      <div className="ml-auto flex gap-2">
        <button type="button" className="bg-sky-500 text-white px-5 py-2 rounded-lg cursor-pointer">
          Search
        </button>
        <button
          type="button"
          onClick={() =>
            setFilters({ ...(filters ?? {}), search: "", category: "" })
          }
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          Clear
        </button>
      </div>

    </div>
  );
}