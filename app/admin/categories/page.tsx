'use client';

import { useState } from "react";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import CategoryFormModal from "@/components/admin/categories/CategoryFormModal";
import BulkImportCategoryModal from "@/components/admin/categories/BulkImportCategoryModal";
import CategoryFilters from "@/components/admin/categories/CategoryFilters";

export default function CategoriesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [filters, setFilters] = useState<any>({});

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8 ">
        <div>
          <h1 className="text-3xl font-bold text-black">Categories</h1>
          <p className="text-gray-600">
            Manage product categories across the store
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            + Add New Category
          </button>

          <button
            onClick={() => setShowBulk(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Bulk Import CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <CategoryFilters onFilter={(f) => setFilters(f)} />

      <CategoriesTable filters={filters} />

      {showAdd && (
        <CategoryFormModal
          mode="add"
          onClose={() => setShowAdd(false)}
        />
      )}

      {showBulk && (
        <BulkImportCategoryModal
          onClose={() => setShowBulk(false)}
        />
      )}
    </div>
  );
}