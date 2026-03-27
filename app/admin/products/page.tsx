'use client';

import { useState } from "react";
import ProductTable from "@/components/admin/products/ProductTable";
import ProductFilters from "@/components/admin/products/ProductFilters";
import AddProductModal from "@/components/admin/products/AddProductModal";
import BulkImportProductModal from "@/components/admin/products/BulkImportProductModal";

export default function AdminProductsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [filters, setFilters] = useState<any>({});

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Product Management</h1>
          <p className="text-gray-700">Manage all products in your store</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
          >
            + Add New Product
          </button>

          <button
            onClick={() => setShowBulk(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer"
          >
            Bulk Import CSV
          </button>
        </div>
      </div>

      <ProductFilters onFilter={setFilters} />
      <ProductTable filters={filters} />

      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} />}
      {showBulk && <BulkImportProductModal onClose={() => setShowBulk(false)} />}
    </div>
  );
}