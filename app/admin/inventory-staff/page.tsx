'use client';

import StatCard from "@/components/admin/StatCard";
import LowStockAlerts from "@/components/admin/LowStockAlerts";

export default function InventoryStaffDashboardPage() {
  return (
    <div className="text-gray-700">
      
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Inventory & Warehouse
          </h1>
          <p className="text-gray-600 mt-1">
            Task queue, stock movements, and quality control
          </p>
        </div>
        
      </div>

      {/* INVENTORY KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Incoming Deliveries"
          value="4 Pending"
          change="2 trucks arriving today"
        />
        <StatCard
          title="Outbound Transfers"
          value="8 Requests"
          change="Branches awaiting stock"
        />
        <StatCard
          title="Critical Shortages"
          value="12 Items"
          change="Below minimum threshold"
        />
        <StatCard
          title="Expiring Soon"
          value="5 Batches"
          change="Needs attention this week"
        />
      </div>

      {/* WAREHOUSE TASK QUEUE & ALERTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* Active Task Queue */}
        <div className="xl:col-span-2 bg-white p-5 rounded-xl shadow-sm h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Active Task Queue</h2>
            <div className="text-sm text-gray-500">
              Filter: <span className="text-sky-600 cursor-pointer font-medium">All</span> | <span className="cursor-pointer hover:text-gray-800 transition-colors">Inbound</span> | <span className="cursor-pointer hover:text-gray-800 transition-colors">Outbound</span>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 bg-gray-50">
                  <th className="p-2 font-medium rounded-tl-lg">Task ID</th>
                  <th className="p-2 font-medium">Type</th>
                  <th className="p-2 font-medium">Details</th>
                  <th className="p-2 font-medium">Status</th>
                  <th className="p-2 font-medium rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-2 py-3 font-medium">PO-1029</td>
                  <td className="p-2"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">INBOUND</span></td>
                  <td className="p-2">Oceanic Meats - Frozen Goods</td>
                  <td className="p-2"><span className="text-yellow-600 font-medium bg-yellow-50 px-2 py-0.5 rounded">Awaiting Truck</span></td>
                  <td className="p-2"><button className="text-sky-600 hover:underline font-medium">Receive</button></td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-2 py-3 font-medium">TR-8832</td>
                  <td className="p-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">OUTBOUND</span></td>
                  <td className="p-2">Colombo Main - Weekly Restock</td>
                  <td className="p-2"><span className="text-sky-600 font-medium bg-sky-50 px-2 py-0.5 rounded">Picking</span></td>
                  <td className="p-2"><button className="text-sky-600 hover:underline font-medium">Continue</button></td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-2 py-3 font-medium">TR-8833</td>
                  <td className="p-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">OUTBOUND</span></td>
                  <td className="p-2">Kandy Branch - Packaging Supply</td>
                  <td className="p-2"><span className="text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded">Stock Issue</span></td>
                  <td className="p-2"><button className="text-sky-600 hover:underline font-medium">Review</button></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 py-3 font-medium">ST-045</td>
                  <td className="p-2"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-bold">AUDIT</span></td>
                  <td className="p-2">Aisle 4 - Dry Ingredients</td>
                  <td className="p-2"><span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">In Progress</span></td>
                  <td className="p-2"><button className="text-sky-600 hover:underline font-medium">Open Log</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="h-full">
           <LowStockAlerts />
        </div>

      </div>

      {/* RECENT MOVEMENTS & QUALITY CONTROL */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        
        {/* Recent Movements Log */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
             <h2 className="font-semibold text-gray-800">Recent Stock Movements</h2>
             <button className="text-sm text-sky-600 hover:underline font-medium">Export Log</button>
          </div>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 border-b border-gray-100 pb-3">
              <div className="bg-green-100 text-green-700 p-2 rounded-full shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Received 500kg Wheat Flour</p>
                <p className="text-gray-500 mt-0.5">PO-1028 processed by John Doe. Assigned to Zone A2.</p>
                <p className="text-xs text-gray-400 mt-1">10 mins ago</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3 border-b border-gray-100 pb-3">
              <div className="bg-sky-100 text-sky-700 p-2 rounded-full shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Dispatched TR-8830 to Galle Fort</p>
                <p className="text-gray-500 mt-0.5">2 pallets loaded onto Truck #4. Driver: Kamal.</p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="bg-red-100 text-red-700 p-2 rounded-full shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Wastage Logged: 5kg Tomatoes</p>
                <p className="text-gray-500 mt-0.5">Quality check failed during receiving. Vendor notified.</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Expiry Management (Quality Control) */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Quality Control (Expiring Soon)</h2>
            <button className="text-sm text-sky-600 hover:underline font-medium">View Full Report</button>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead>
                 <tr className="border-b border-gray-200 text-gray-500 bg-gray-50">
                   <th className="p-2 font-medium rounded-tl-lg">Ingredient / Batch</th>
                   <th className="p-2 font-medium">Quantity</th>
                   <th className="p-2 font-medium">Expiry Date</th>
                   <th className="p-2 font-medium rounded-tr-lg">Status</th>
                 </tr>
               </thead>
               <tbody className="text-gray-700">
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="p-2 py-3">
                     <p className="font-medium text-gray-800">Fresh Milk 1L</p>
                     <p className="text-xs text-gray-500">Batch #MK-992</p>
                   </td>
                   <td className="p-2 py-3 font-medium">24 Cartons</td>
                   <td className="p-2 py-3 font-medium text-red-600">Tomorrow</td>
                   <td className="p-2 py-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">Critical</span></td>
                 </tr>
                 <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                   <td className="p-2 py-3">
                     <p className="font-medium text-gray-800">Burger Buns</p>
                     <p className="text-xs text-gray-500">Batch #BN-104</p>
                   </td>
                   <td className="p-2 py-3 font-medium">150 Packs</td>
                   <td className="p-2 py-3">In 3 Days</td>
                   <td className="p-2 py-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">Warning</span></td>
                 </tr>
                 <tr className="hover:bg-gray-50 transition-colors">
                   <td className="p-2 py-3">
                     <p className="font-medium text-gray-800">Lettuce (Iceberg)</p>
                     <p className="text-xs text-gray-500">Batch #VG-402</p>
                   </td>
                   <td className="p-2 py-3 font-medium">15 kg</td>
                   <td className="p-2 py-3">In 4 Days</td>
                   <td className="p-2 py-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">Warning</span></td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>

      </div>

    </div>
  );
}
