'use client';

import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function Filters() {
  const { t } = useAdminI18n();

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex flex-wrap gap-3 items-center justify-between">

        {/* LEFT */}
        <div className="flex gap-2 flex-wrap">
          <input type="month" className="border border-gray-300 text-gray-700 p-2 rounded" />

          <select className="border border-gray-300 text-gray-700 p-2 rounded">
            <option>All Suppliers</option>
            <option>ABC Traders</option>
          </select>

          <select className="border border-gray-300 text-gray-700 p-2 rounded">
            <option>All Categories</option>
            <option>Electronics</option>
          </select>

          <input
            placeholder="Search product / SKU"
            className="border border-gray-300 text-gray-700 p-2 rounded"
          />
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
            {t("actionSearch") || "Search"}
          </button>
          

        </div>
      </div>
    </div>
  );
}