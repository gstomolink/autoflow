'use client';

import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";

export default function SuperAdminDashboardPage() {
  return (
    <div className="text-gray-700">
      
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Global overview of all branches, financials, and system operations
          </p>
        </div>
        
        {/* GLOBAL DATE FILTER */}
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Date Range</label>
          <select className="border border-gray-300 px-4 py-2 rounded-lg bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500">
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>Year to Date</option>
            <option>Custom Range...</option>
          </select>
        </div>
      </div>

      {/* PROFITABILITY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-6">
        <StatCard
          title="Gross Profit"
          value="LKR 345,000"
          change="+12% vs last period"
        />
        <StatCard
          title="Total Revenue"
          value="LKR 845,000"
          change="+8% vs last period"
        />
        <StatCard
          title="Total Costs"
          value="LKR 500,000"
          change="-2% vs last period"
        />
        <StatCard
          title="Avg Order Value"
          value="LKR 2,100"
          change="+5% vs last period"
        />
        <StatCard
          title="Active Branches"
          value="8 / 8"
          change="All systems online"
        />
      </div>

      {/* SALES & BRANCH PERFORMANCE */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        {/* Top Performing Branches */}
        <div className="bg-white p-5 rounded-xl shadow-sm h-full flex flex-col">
          <h2 className="font-semibold mb-4 text-gray-800">
            Top Performing Branches
          </h2>
          <div className="flex flex-col gap-4 flex-1 text-sm">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div>
                <p className="font-semibold text-gray-800">1. Colombo Main</p>
                <p className="text-xs text-gray-500 mt-0.5">1,240 orders</p>
              </div>
              <p className="font-bold text-sky-600">LKR 450K</p>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div>
                <p className="font-semibold text-gray-800">2. Kandy Branch</p>
                <p className="text-xs text-gray-500 mt-0.5">850 orders</p>
              </div>
              <p className="font-bold text-sky-600">LKR 210K</p>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div>
                <p className="font-semibold text-gray-800">3. Galle Fort</p>
                <p className="text-xs text-gray-500 mt-0.5">420 orders</p>
              </div>
              <p className="font-bold text-sky-600">LKR 115K</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">4. Negombo Beach</p>
                <p className="text-xs text-gray-500 mt-0.5">290 orders</p>
              </div>
              <p className="font-bold text-sky-600">LKR 70K</p>
            </div>

          </div>
        </div>
      </div>

      {/* SECOND ROW: ACTIONABLE SYSTEM INFO & PENDING APPROVALS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* Pending Purchase Orders / Transfers */}
        <div className="xl:col-span-2 bg-white p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Pending Purchase Approvals</h2>
            <button className="text-sm text-sky-600 hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="pb-2 font-medium">PO Number</th>
                  <th className="pb-2 font-medium">Location</th>
                  <th className="pb-2 font-medium">Supplier</th>
                  <th className="pb-2 font-medium">Total Value</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-3 font-medium">PO-10294</td>
                  <td className="py-3">Main Warehouse</td>
                  <td className="py-3">ABC Fresh Suppliers</td>
                  <td className="py-3">LKR 120,000</td>
                  <td className="py-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                      Pending Admin
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 font-medium">TR-8832</td>
                  <td className="py-3">Colombo Main → Kandy</td>
                  <td className="py-3">Internal Transfer</td>
                  <td className="py-3">LKR 45,000</td>
                  <td className="py-3">
                    <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded text-xs font-medium">
                      In Transit
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">PO-10295</td>
                  <td className="py-3">Galle Fort</td>
                  <td className="py-3">Oceanic Meats</td>
                  <td className="py-3">LKR 85,500</td>
                  <td className="py-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                      Pending Admin
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actionable System Info */}
        <div className="bg-white p-5 rounded-xl shadow-sm h-full flex flex-col">
          <h2 className="font-semibold mb-4 text-gray-800">System Overview</h2>
          <div className="space-y-4 text-sm text-gray-700 flex-1">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span>Global Food Cost %</span>
              <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">28.4%</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span>Total Wastage Cost</span>
              <span className="font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded">LKR 45,200</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span>Active Users</span>
              <span className="font-medium">152 Users</span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span>POS Terminals</span>
              <span className="font-medium">12 / 12 Online</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>System Health</span>
              <span className="font-medium text-green-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                Operational
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* ADMINISTRATIVE AUDIT LOG */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h2 className="font-semibold mb-4 text-gray-800">
          Administrative Audit Log
        </h2>

        <ul className="space-y-3 text-sm">
          <li className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">Pricing</span>
              <span className="font-medium text-gray-800 w-32 shrink-0">10 mins ago</span>
            </div>
            <span className="text-gray-600">Store Admin updated prices for the "Pizza" category across all branches.</span>
          </li>

          <li className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">Entity</span>
              <span className="font-medium text-gray-800 w-32 shrink-0">2 hours ago</span>
            </div>
            <span className="text-gray-600">Super Admin created a new branch for "Negombo Beach".</span>
          </li>

          <li className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
             <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded font-medium">System</span>
              <span className="font-medium text-gray-800 w-32 shrink-0">4 hours ago</span>
            </div>
            <span className="text-gray-600">Automated database and file storage backup completed.</span>
          </li>
          
          <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded font-medium">Integration</span>
              <span className="font-medium text-gray-800 w-32 shrink-0">Yesterday</span>
            </div>
            <span className="text-gray-600">UberEats API connection re-established for Kandy Branch.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
