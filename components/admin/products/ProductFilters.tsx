'use client';

import { useEffect, useState } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";

type Props = {
  onFilter: (filters: any) => void;
};

export default function ProductFilters({ onFilter }: Props) {
  const { t } = useAdminI18n();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await apiFetch("/categories");
        if (!res.ok) return;
        const rows = (await res.json()) as Array<{ name: string }>;
        const names = rows
          .map((row) => row.name?.trim())
          .filter((name): name is string => Boolean(name));
        setCategories([...new Set(names)]);
      } catch {
        setCategories([]);
      }
    };
    void loadCategories();
  }, []);

  const handleSearch = () => {
    onFilter({
      name: search,
      category: category,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-end gap-4">
      
      {/* Search Input */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-72 text-gray-700"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
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
            setCategory("");
            onFilter({ name: "", category: "" });
          }}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Clear
        </button>
      </div>

    </div>
  );
}