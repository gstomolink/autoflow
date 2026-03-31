'use client';

import { useState } from "react";
import InventoryTable from "./InventoryTable";
import InventoryTransactions from "./InventoryTransactions";
import NearExpiryTab from "./NearExpiryTab";

export default function InventoryTabs() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = ["all","low","expire","movement","audit"];

  return (
    <div>

      {/* TABS */}
      <div className="flex gap-4 border-b mb-6">
        {tabs.map(tab=>(
          <button
            key={tab}
            onClick={()=>setActiveTab(tab)}
            className={`px-4 py-2 ${
              activeTab===tab ? "border-b-2 border-sky-500 text-sky-600" : "text-gray-600"
            }`}
          >
            {tab==="all" && "All Stock"}
            {tab==="low" && "Low Stock"}
            {tab==="expire" && "Near Expire"}
            {tab==="movement" && "Stock Movement"}
            {tab==="audit" && "Inventory Audit"}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab==="all" && <InventoryTable />}
      {activeTab==="low" && <InventoryTable onlyLow />}
      {activeTab==="expire" && <NearExpiryTab />}
      {activeTab==="movement" && <InventoryTransactions type="movement" />}
      {activeTab==="audit" && <InventoryTransactions type="audit" />}

    </div>
  );
}