'use client';

import { useState } from 'react';
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { requestShopScopeApply } from "@/lib/shop-scope";
import PageShopScopeFilter from "@/components/layout/PageShopScopeFilter";

type Props = {
  onFilter: (filters: any) => void;
};

export default function CategoryFilters({ onFilter }: Props) {
  const { t } = useAdminI18n();
  const user = getStoredUser();
  const isStoreAdmin = user?.role === USER_ROLES.STORE_ADMIN;
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    requestShopScopeApply();
    onFilter({ search });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-end gap-4">
      {isStoreAdmin ? null : <PageShopScopeFilter mode="master" />}
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

      <div className="ml-auto flex gap-2">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-sky-500 text-sky-50 px-5 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
        >
          {t("actionSearch")}
        </button>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            onFilter({ search: "" });
          }}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}