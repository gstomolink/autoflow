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
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-end gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Search</label>
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