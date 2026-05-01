'use client';

import InventoryTabs from "@/components/admin/inventory/InventoryTabs";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function InventoryPage() {
  const { t } = useAdminI18n();
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        {t("inventoryTitle")}
      </h1>

      <InventoryTabs />
    </div>
  );
}