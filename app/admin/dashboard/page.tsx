'use client';

import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";
import TopProducts from "@/components/admin/TopProducts";
import LowStockAlerts from "@/components/admin/LowStockAlerts";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function SuperAdminDashboardPage() {
  const { t } = useAdminI18n();

  return (
    <div className="text-gray-700">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {t("superAdminDashboardTitle" as any) || "Super Admin Dashboard"}
        </h1>
        <p className="text-gray-600">
          {t("superAdminDashboardSubtitle" as any) || "Global overview of all stores, sales and operations"}
        </p>
      </div>

      {/*  GLOBAL STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-6">

        <StatCard
          title="Total Branches"
          value="8"
          change="Across all locations"
        />

        <StatCard
          title="Total Users"
          value="152"
          change="Staff + Admins"
        />

        <StatCard
          title="Total Menu Items"
          value="96"
          change="Burgers, Pizza, Drinks"
        />

        <StatCard
          title="Orders Today"
          value="420"
          change="+8% from yesterday"
        />

        <StatCard
          title="Total Revenue"
          value="LKR 845,000"
        />

      </div>

      {/* SALES + ALERTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <LowStockAlerts />

      </div>

      {/*  SECOND ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

        {/* TOP SELLING ITEMS */}
        <div className="xl:col-span-2">
          <TopProducts />
        </div>

        {/* QUICK SYSTEM INFO */}
        <div className="bg-white p-5 rounded-xl shadow-sm">

          <h2 className="font-semibold mb-4 text-gray-800">
            System Overview
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Total Ingredients</span>
              <span className="font-medium">210</span>
            </div>

            <div className="flex justify-between">
              <span>Active Suppliers</span>
              <span className="font-medium">18</span>
            </div>

            <div className="flex justify-between">
              <span>Pending Orders</span>
              <span className="font-medium">12</span>
            </div>

            <div className="flex justify-between">
              <span>Completed Orders</span>
              <span className="font-medium">1,240</span>
            </div>

            <div className="flex justify-between">
              <span>Cancelled Orders</span>
              <span className="font-medium">32</span>
            </div>

          </div>

        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-5 rounded-xl shadow-sm">

        <h2 className="font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>

        <ul className="space-y-2 text-sm">

          <li className="border-b pb-2">
            🍔 New order placed - Chicken Burger (Branch: Colombo)
          </li>

          <li className="border-b pb-2">
            🍕 Pizza stock updated (Main Warehouse)
          </li>

          <li className="border-b pb-2">
            👤 New staff added (Kandy Branch)
          </li>

          <li className="border-b pb-2">
            📦 Supplier delivery received
          </li>

          <li>
            ⚠️ Low stock alert for Cheese & Buns
          </li>

        </ul>

      </div>

    </div>
  );
}