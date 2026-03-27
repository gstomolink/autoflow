'use client';

import { useState } from 'react';
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

type Props = {
  onFilter: (filters: any) => void;
};

export default function CategoryFilters({ onFilter }: Props) {
  const { t } = useAdminI18n();
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onFilter({ search });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">
      <div className="flex items-center gap-4">
        {/* Category Filter */}
        <select
          onChange={(e) => onFilter({ category: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="ml-auto bg-sky-500 text-sky-50 px-5 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
      >
        {t("actionSearch")}
      </button>

    </div>
  );
}