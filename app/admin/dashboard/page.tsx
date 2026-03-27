
'use client';

import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";
import TopProducts from "@/components/admin/TopProducts";
import LowStockAlerts from "@/components/admin/LowStockAlerts";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function AdminDashboardPage() {
  const { t } = useAdminI18n();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("dashboardTitle")}</h1>
        <p className="text-gray-600">{t("dashboardSubtitle")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          title={t("statTotalSalesToday")}
          value="$12,540"
          change={t("statSalesFromYesterday")}
        />
        <StatCard
          title={t("statOrdersCount")}
          value="326"
          change={t("statOrdersGrowth")}
        />
        <StatCard
          title={t("statTotalRevenue")}
          value="$320,845"
        />
        <StatCard
          title={t("statActiveCustomers")}
          value="1,240"
        />
      </div>

      {/* Charts & Side Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <LowStockAlerts />
      </div>

      {/* Bottom Section */}
      <TopProducts />
    </div>
  );
}