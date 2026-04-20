'use client';

import { useState } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

import ManualOrdersTable from "./ManualOrdersTable";
import AutomatedOrdersTable from "./AutomatedOrdersTable";

export default function InventoryOrdersTabs() {

  const { t } = useAdminI18n();
  const [tab, setTab] = useState("manual");

  return (
    <div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        
        <button
          onClick={() => setTab("manual")}
          className={`pb-2 text-gray-600 ${
            tab === "manual" ? "border-b-2 border-sky-600 text-sky-600" : ""
          }`}
        >
          {t("inventoryManualOrders") || "Manual Orders"}
        </button>

        <button
          onClick={() => setTab("auto")}
          className={`pb-2 text-gray-600 ${
            tab === "auto" ? "border-b-2 border-sky-600 text-sky-600" : ""
          }`}
        >
          {t("inventoryAutomatedOrders") || "Automated Orders"}
        </button>

      </div>

      {/* Content */}
      {tab === "manual" ? <ManualOrdersTable /> : <AutomatedOrdersTable />}

    </div>
  );
}