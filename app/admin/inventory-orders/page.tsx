'use client';

import Filters from "@/components/admin/inventory-orders/Filters";
import InventoryOrdersTabs from "@/components/admin/inventory-orders/InventoryOrdersTabs";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function InventoryOrdersPage() {
  const { t } = useAdminI18n();


  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-700">
          {t("inventoryOrdersTitle") || "Inventory Orders"}
        </h1>
        <p className="text-gray-500">
          {t("inventoryOrdersSubtitle") ||
            "View and manage all inventory orders, both manual and automated"}
        </p>
      </div>

      <Filters />
      <InventoryOrdersTabs />
    </div>
  );
}