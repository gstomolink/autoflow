'use client';

import { useState } from "react";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import CategoryFormModal from "@/components/admin/categories/CategoryFormModal";
import BulkImportCategoryModal from "@/components/admin/categories/BulkImportCategoryModal";
import CategoryFilters from "@/components/admin/categories/CategoryFilters";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function CategoriesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [tableKey, setTableKey] = useState(0);
  const { t } = useAdminI18n();

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-nowrap shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-black">{t("categoriesTitle")}</h1>
          <p className="text-gray-600">
            {t("categoriesSubtitle")}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-sky-500 text-sky-50 rounded-lg hover:bg-sky-600 transition-colors"
          >
            {t("addNewCategory")}
          </button>

          <button
            onClick={() => setShowBulk(true)}
            className="px-4 py-2 bg-transparent text-slate-600 border border-slate-400 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            <span>{t("bulkImportCsv")}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <CategoryFilters onFilter={(f) => setFilters(f)} />

      <CategoriesTable key={tableKey} filters={filters} />

      {showAdd && (
        <CategoryFormModal
          mode="add"
          onClose={() => setShowAdd(false)}
          onSaved={() => setTableKey((k) => k + 1)}
        />
      )}

      {showBulk && (
        <BulkImportCategoryModal
          onClose={() => setShowBulk(false)}
          onSaved={() => setTableKey((k) => k + 1)}
        />
      )}
    </div>
  );
}