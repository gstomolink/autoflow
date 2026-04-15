'use client';

import { useState } from "react";
import Filters, {
  type InventoryOrdersFilterValues,
} from "@/components/admin/inventory-orders/Filters";
import InventoryOrdersTabs from "@/components/admin/inventory-orders/InventoryOrdersTabs";

const initialFilters: InventoryOrdersFilterValues = {
  status: "",
  month: "",
  supplierId: "",
  productSearch: "",
};

export default function InventoryOrdersPage() {
  const [filters, setFilters] = useState<InventoryOrdersFilterValues>(initialFilters);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-700">
          Inventory Orders
        </h1>
        <p className="text-gray-600">
          Plan and manage upcoming stock orders
        </p>
      </div>

      <Filters values={filters} onChange={setFilters} />
      <InventoryOrdersTabs filters={filters} />
    </div>
  );
}
