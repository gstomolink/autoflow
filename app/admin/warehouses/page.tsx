'use client';

import { useState } from "react";
import WarehouseTable from "@/components/admin/warehouses/WarehouseTable";
import WarehouseFilters from "@/components/admin/warehouses/WarehouseFilters";
import AddWarehouseModal from "@/components/admin/warehouses/AddWarehouseModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function WarehousePage() {
  const { t } = useAdminI18n();
  const [filters, setFilters] = useState<any>({});
  const [showAdd, setShowAdd] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">{t("warehousesTitle")}</h1>
          <p className="text-gray-600">
            {t("warehousesSubtitle")}
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-sky-500 text-sky-50 rounded-lg cursor-pointer hover:bg-sky-600 transition-colors"
        >
          {t("addWarehouse")}
        </button>
      </div>

      <WarehouseFilters onFilter={setFilters} />
      <WarehouseTable key={tableKey} filters={filters} />

      {showAdd && (
        <AddWarehouseModal
          onClose={() => setShowAdd(false)}
          onSaved={() => setTableKey((k) => k + 1)}
        />
      )}
    </div>
  );
}