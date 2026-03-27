'use client';

import { useState } from "react";
import ManualOrdersTable from "./ManualOrdersTable";
import AutomatedOrdersTable from "./AutomatedOrdersTable";

export default function InventoryOrdersTabs() {
  const [tab, setTab] = useState("manual");

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        <button
          onClick={() => setTab("manual")}
          className={`pb-2 text-gray-600  ${tab === "manual" && "border-b-2 border-sky-600 text-sky-600"}`}
        >
          Manual Orders
        </button>

        <button
          onClick={() => setTab("auto")}
          className={`pb-2 text-gray-600  ${tab === "auto" && "border-b-2 border-sky-600 text-sky-600"}`}
        >
          Automated Orders
        </button>
      </div>

      {tab === "manual" ? <ManualOrdersTable /> : <AutomatedOrdersTable />}
    </div>
  );
}