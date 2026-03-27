'use client';

import { useState } from "react";
import InventoryTabs from "@/components/admin/inventory/InventoryTabs";

export default function InventoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Inventory Management
      </h1>

      <InventoryTabs />
    </div>
  );
}