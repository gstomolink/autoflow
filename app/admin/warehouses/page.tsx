'use client';

import { useState } from "react";
import WarehouseTable from "@/components/admin/warehouses/WarehouseTable";
import WarehouseFilters from "@/components/admin/warehouses/WarehouseFilters";
import AddWarehouseModal from "@/components/admin/warehouses/AddWarehouseModal";

export default function WarehousePage() {
  const [filters, setFilters] = useState<any>({});
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">
            Warehouse Management
          </h1>
          <p className="text-gray-600">
            Manage branches and storage locations
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700"
        >
          + Add Warehouse
        </button>
      </div>

      <WarehouseFilters onFilter={setFilters} />
      <WarehouseTable filters={filters} />

      {showAdd && (
        <AddWarehouseModal onClose={() => setShowAdd(false)} />
      )}
    </div>
  );
}