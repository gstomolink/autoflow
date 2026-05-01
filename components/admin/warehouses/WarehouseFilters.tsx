'use client';

import { useState } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function WarehouseFilters({ onFilter }: any) {
  const { t } = useAdminI18n();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onFilter({
      search: search.trim(),
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-end gap-4">
      
      {/* Search Bar */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          placeholder="Search warehouse..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="w-72 border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="ml-auto bg-sky-500 text-sky-50 px-5 py-2 rounded-lg hover:bg-sky-600 transition-colors whitespace-nowrap shrink-0"
      >
        {t("actionSearch")}
      </button>

    </div>
  );
}