'use client';

import { useState } from "react";
import type { InventoryOrdersFilterValues } from "./Filters";
import ManualOrdersTable from "./ManualOrdersTable";
import AutomatedOrdersTable from "./AutomatedOrdersTable";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function InventoryOrdersTabs({
  filters,
}: {
  filters: InventoryOrdersFilterValues;
}) {
  const [tab, setTab] = useState<"all" | "auto">("all");
  const { t } = useAdminI18n();

  return (
    <div>
      <div className="flex gap-4 border-b mb-4">
        
        <button
          type="button"
          onClick={() => setTab("all")}
          className={`pb-2 text-gray-600 ${
            tab === "all" ? "border-b-2 border-sky-600 text-sky-600" : ""
          }`}
        >
          All Orders
        </button>

        <button
          type="button"
          onClick={() => setTab("auto")}
          className={`pb-2 text-gray-600 ${
            tab === "auto" ? "border-b-2 border-sky-600 text-sky-600" : ""
          }`}
        >
          Automated Orders
        </button>

      </div>

      {tab === "all" ? (
        <ManualOrdersTable filters={filters} />
      ) : (
        <AutomatedOrdersTable />
      )}
    </div>
  );
}