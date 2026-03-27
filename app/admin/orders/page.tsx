'use client';

import { useState } from "react";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrderDetailsModal from "@/components/admin/orders/OrderDetailsModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function OrdersPage() {
  const { t } = useAdminI18n();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-6">
        {t("ordersTitle")}
      </h1>

      <OrderFilters />

      <OrdersTable onView={(order) => setSelectedOrder(order)} />

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}