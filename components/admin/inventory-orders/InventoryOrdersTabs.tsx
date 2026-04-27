'use client';

import { useState } from "react";
import type { InventoryOrdersFilterValues } from "./Filters";
import ManualOrdersTable from "./ManualOrdersTable";
import AutomatedOrdersTable from "./AutomatedOrdersTable";

export default function InventoryOrdersTabs({
  filters,
}: {
  filters: InventoryOrdersFilterValues;
}) {
  const [tab, setTab] = useState<"all" | "auto">("all");

  return (
    <div>
      <div className="flex gap-4 border-b mb-4">
        
        <button
          type="button"
          onClick={() => setTab("all")}
          className={`pb-2 text-gray-600  ${tab === "all" && "border-b-2 border-sky-600 text-sky-600"}`}
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
          {t("inventoryAutomatedOrders") || "Automated Orders"}
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