'use client';

import { useState } from "react";
import SupplierTable from "@/components/admin/suppliers/SupplierTable";
import AddSupplierModal from "@/components/admin/suppliers/AddSupplierModal";

export default function SupplierPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">
          Supplier Management
        </h1>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-sky-500 text-sky-50 px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
        >
          + Add New Supplier
        </button>
      </div>

      <SupplierTable />

      {showAdd && <AddSupplierModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}