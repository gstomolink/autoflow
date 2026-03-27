'use client';

import { useState } from "react";
import InventoryTable from "./InventoryTable";
import InventoryTransactions from "./InventoryTransactions";

export default function InventoryTabs() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        {["all", "low", "movement", "audit"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 cursor-pointer ${
              activeTab === tab
                ? "border-b-2 border-sky-500 text-sky-600"
                : "text-gray-600"
            }`}
          >
            {tab === "all" && "All Stock"}
            {tab === "low" && "Low Stock"}
            {tab === "movement" && "Stock Movement"}
            {tab === "audit" && "Inventory Audit"}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "all" && <InventoryTable />}
      {activeTab === "low" && <InventoryTable onlyLow />}
      {activeTab === "movement" && <InventoryTransactions type="movement" />}
      {activeTab === "audit" && <InventoryTransactions type="audit" />}
    </div>
  );
}