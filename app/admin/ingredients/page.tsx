'use client';

import { useState } from "react";
import IngredientsTable from "@/components/admin/ingredients/IngredientsTable";
import NearExpiryTab from "@/components/admin/ingredients/NearExpiryTab";

export default function IngredientsPage() {
  const [tab, setTab] = useState("all");

  return (
    <div className="text-gray-700">

      <h1 className="text-3xl font-bold mb-2">Ingredients</h1>
      <p className="text-gray-500 mb-6">
        Manage ingredients, stock, and expiry tracking
      </p>

      {/* TABS */}
<div className="flex gap-6 mb-6 ">

  <button
    onClick={() => setTab("all")}
    className={`pb-2 text-sm font-medium border-b-2 transition ${
      tab === "all"
        ? "text-sky-600 border-sky-600"
        : "text-gray-700 border-transparent hover:text-sky-500"
    }`}
  >
    All Ingredients
  </button>

  <button
    onClick={() => setTab("expiry")}
    className={`pb-2 text-sm font-medium border-b-2 transition ${
      tab === "expiry"
        ? "text-sky-600 border-sky-600"
        : "text-gray-700 border-transparent hover:text-sky-500"
    }`}
  >
    Near Expiry
  </button>

</div>

      {/* CONTENT */}
      {tab === "all" && <IngredientsTable />}
      {tab === "expiry" && <NearExpiryTab />}

    </div>
  );
}