'use client';

import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";
import TopProducts from "@/components/admin/TopProducts";
import LowStockAlerts from "@/components/admin/LowStockAlerts";

export default function StoreAdminDashboardPage() {
  return (
    <div className="text-gray-700">

      {/* HEADER & FILTERS */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Store Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Day-to-day operations and live metrics for Colombo Main Branch
          </p>
        </div>
        
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">View Date</label>
          <input 
            type="date" 
            className="border border-gray-300 px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500" 
            defaultValue={new Date().toISOString().split('T')[0]} 
          />
        </div>
      </div>

      {/* DAILY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-6">
        <StatCard
          title="Orders Today"
          value="142"
          change="+15% vs yesterday"
        />
        <StatCard
          title="Revenue Today"
          value="LKR 125,000"
          change="+8% vs yesterday"
        />
        <StatCard
          title="Avg Prep Time"
          value="12 mins"
          change="Optimal"
        />
        <StatCard
          title="Staff on Shift"
          value="8 / 10"
          change="2 on break"
        />
        <StatCard
          title="Pending Orders"
          value="15"
          change="5 kitchen, 10 delivery"
        />
      </div>

      {/* SALES TRENDS & ALERTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* Hourly/Daily Revenue Chart */}
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        {/* Low Stock Alerts Component */}
        <LowStockAlerts />

      </div>

      {/* STORE LEVEL ACTIVITY & TOP ITEMS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* Top Selling Products Component */}
        <div className="xl:col-span-2">
          <TopProducts />
        </div>

        {/* Live Order Activity Feed */}
        <div className="bg-white p-5 rounded-xl shadow-sm h-full flex flex-col">
          <h2 className="font-semibold mb-4 text-gray-800">Live Order Activity</h2>
          
          <ul className="space-y-4 text-sm flex-1">
            <li className="border-b border-gray-100 pb-3">
              <p className="font-semibold text-gray-800">Order #1024 - <span className="text-green-600">Completed</span></p>
              <p className="text-gray-500 mt-0.5">2x Spicy Chicken Burger, 1x Coke</p>
              <p className="text-xs text-gray-400 mt-1">Just now</p>
            </li>

            <li className="border-b border-gray-100 pb-3">
              <p className="font-semibold text-gray-800">Order #1025 - <span className="text-yellow-600">Preparing</span></p>
              <p className="text-gray-500 mt-0.5">1x Large Pepperoni Pizza</p>
              <p className="text-xs text-gray-400 mt-1">2 mins ago</p>
            </li>

            <li className="border-b border-gray-100 pb-3">
              <p className="font-semibold text-gray-800">Delivery Update</p>
              <p className="text-gray-500 mt-0.5">Driver assigned for Order #1020</p>
              <p className="text-xs text-gray-400 mt-1">5 mins ago</p>
            </li>

            <li className="border-b border-gray-100 pb-3">
              <p className="font-semibold text-gray-800">Order #1026 - <span className="text-blue-600">New</span></p>
              <p className="text-gray-500 mt-0.5">UberEats - 1x Veggie Wrap</p>
              <p className="text-xs text-gray-400 mt-1">8 mins ago</p>
            </li>
          </ul>
        </div>

      </div>

      {/* SHIFT & INVENTORY OVERVIEW */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h2 className="font-semibold mb-4 text-gray-800">Shift & Operations Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          
          <div className="space-y-3">
            <h3 className="font-medium text-gray-500 mb-2 border-b border-gray-100 pb-2">Cash Drawer</h3>
            <div className="flex justify-between">
              <span>Opening Balance</span>
              <span className="font-medium text-gray-800">LKR 15,000</span>
            </div>
            <div className="flex justify-between">
              <span>Cash Sales</span>
              <span className="font-medium text-gray-800">LKR 32,500</span>
            </div>
            <div className="flex justify-between">
              <span>Card / Online</span>
              <span className="font-medium text-gray-800">LKR 92,500</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-500 mb-2 border-b border-gray-100 pb-2">Inventory Actions</h3>
            <div className="flex justify-between items-center">
              <span>Pending Deliveries</span>
              <span className="font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">2 Expected</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Wastage Logged</span>
              <span className="font-medium text-red-500">LKR 1,200</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Stock Takes Due</span>
              <span className="font-medium text-sky-600 hover:underline cursor-pointer">Buns & Patties</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-500 mb-2 border-b border-gray-100 pb-2">Staffing</h3>
            <div className="flex justify-between">
              <span>Manager on Duty</span>
              <span className="font-medium text-gray-800">Kamal P.</span>
            </div>
            <div className="flex justify-between">
              <span>Kitchen Staff</span>
              <span className="font-medium text-gray-800">4 Active</span>
            </div>
            <div className="flex justify-between">
              <span>Cashiers</span>
              <span className="font-medium text-gray-800">2 Active</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
