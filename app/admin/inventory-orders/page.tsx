'use client';

import Filters from "@/components/admin/inventory-orders/Filters";
import InventoryOrdersTabs from "@/components/admin/inventory-orders/InventoryOrdersTabs";

export default function InventoryOrdersPage() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-700">
          Inventory Orders
        </h1>
        <p className="text-gray-600">
          Plan and manage upcoming stock orders
        </p>
      </div>

      <Filters />
      <InventoryOrdersTabs />
    </div>
  );
}