'use client';

import { useState } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

import InventoryTable from "./InventoryTable";
import InventoryTransactions from "./InventoryTransactions";
import NearExpiryTab from "./NearExpiryTab";

export default function InventoryTabs() {

  const { t } = useAdminI18n();

  const [activeTab, setActiveTab] = useState<
    "all" | "low" | "expire" | "movement" | "audit"
  >("all");

  const tabs = ["all", "low", "expire", "movement", "audit"] as const;

  return (
    <div>

      {/* TABS */}
      <div className="flex gap-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "border-b-2 border-sky-500 text-sky-600"
                : "text-gray-600"
            }`}
          >
            {tab === "all" && (t("inventoryAllStock") || "All Inventory")}
            {tab === "low" && (t("inventoryLowStock") || "Low Stock")}
            {tab === "expire" && (t("inventoryNearExpire") || "Near Expire")}
            {tab === "movement" && (t("inventoryStockMovement") || "Stock Movement")}
            {tab === "audit" && (t("inventoryAudit") || "Inventory Audit")}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === "all" && <InventoryTable />}
      {activeTab === "low" && <InventoryTable onlyLow />}
      {activeTab === "expire" && <NearExpiryTab />}
      {activeTab === "movement" && <InventoryTransactions type="movement" />}
      {activeTab === "audit" && <InventoryTransactions type="audit" />}

    </div>
  );
}