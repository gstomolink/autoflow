'use client';

import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";

export default function UserDashboardPage() {

  // 🔥 MOCK USER DATA (replace with API later)
  const user = {
    name: "Kasun Perera",
    role: "Cashier",
    branch: "Matara Branch",
    shop: "Matara City Outlet",
    address: "No 45, Main Street, Matara",
    contact: "077 123 4567",
  };

  return (
    <div className="text-gray-700">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600">
          {user.role} Dashboard - {user.branch}
        </p>
      </div>

      {/* 🔹 BRANCH INFO CARD */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6">

        <h2 className="font-semibold text-gray-800 mb-3">
          Branch Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">

          <div>
            <p className="text-gray-500">Branch Name</p>
            <p className="font-medium">{user.branch}</p>
          </div>

          <div>
            <p className="text-gray-500">Shop Name</p>
            <p className="font-medium">{user.shop}</p>
          </div>

          <div>
            <p className="text-gray-500">Address</p>
            <p className="font-medium">{user.address}</p>
          </div>

          <div>
            <p className="text-gray-500">Contact</p>
            <p className="font-medium">{user.contact}</p>
          </div>

        </div>

      </div>

      {/* 🔹 QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <StatCard
          title="Orders Today"
          value="86"
          change="+5 from yesterday"
        />

        <StatCard
          title="Cash Sales"
          value="LKR 45,000"
        />

        <StatCard
          title="Pending Orders"
          value="6"
        />

      </div>

      {/* 🔹 SALES CHART */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">
          Today’s Sales Overview
        </h2>

        <RevenueChart />
      </div>

      {/* 🔹 RECENT ACTIVITY */}
<div className="bg-white p-5 rounded-xl shadow-sm">

  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-gray-800">
      Recent Activity
    </h2>

    <button className="text-sm text-sky-600 hover:underline">
      View All
    </button>
  </div>

  <ul className="divide-y divide-gray-200 text-sm">

    {/* ITEM */}
    <li className="py-3 flex justify-between items-start">
      <div>
        <p className="font-medium text-gray-800">
          Order #1023 completed
        </p>
        <p className="text-gray-500 text-xs">
          Order processed successfully
        </p>
      </div>
      <span className="text-xs text-gray-400">
        2 mins ago
      </span>
    </li>

    {/* ITEM */}
    <li className="py-3 flex justify-between items-start">
      <div>
        <p className="font-medium text-gray-800">
          New order created
        </p>
        <p className="text-gray-500 text-xs">
          Product: Chicken Pizza
        </p>
      </div>
      <span className="text-xs text-gray-400">
        10 mins ago
      </span>
    </li>

    {/* ITEM */}
    <li className="py-3 flex justify-between items-start">
      <div>
        <p className="font-medium text-gray-800">
          Payment received
        </p>
        <p className="text-gray-500 text-xs">
          Method: Card
        </p>
      </div>
      <span className="text-xs text-gray-400">
        25 mins ago
      </span>
    </li>

    {/* ITEM */}
    <li className="py-3 flex justify-between items-start">
      <div>
        <p className="font-medium text-gray-800">
          Invoice generated
        </p>
        <p className="text-gray-500 text-xs">
          Invoice ID: INV-5542
        </p>
      </div>
      <span className="text-xs text-gray-400">
        40 mins ago
      </span>
    </li>

    {/* ITEM (ALERT STYLE) */}
    <li className="py-3 flex justify-between items-start">
      <div>
        <p className="font-medium text-red-600">
          Low stock detected
        </p>
        <p className="text-gray-500 text-xs">
          Item: Cheese (Below threshold)
        </p>
      </div>
      <span className="text-xs text-gray-400">
        1 hour ago
      </span>
    </li>

  </ul>

</div>

    </div>
  );
}