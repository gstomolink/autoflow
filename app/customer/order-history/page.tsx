"use client";

import { useMemo, useState } from "react";

type OrderStatus = "Pending" | "Shipping" | "Delivered" | "Cancelled" | "Failed";

type Order = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
};

const initialOrders: Order[] = [
  { id: "ORD-1001", date: "2026-03-10", items: 3, total: 240, status: "Pending" },
  { id: "ORD-1002", date: "2026-03-09", items: 1, total: 80, status: "Shipping" },
  { id: "ORD-1003", date: "2026-03-07", items: 5, total: 510, status: "Delivered" },
  { id: "ORD-1004", date: "2026-03-05", items: 2, total: 120, status: "Cancelled" },
  { id: "ORD-1005", date: "2026-03-02", items: 1, total: 60, status: "Failed" },
  { id: "ORD-1006", date: "2026-03-01", items: 4, total: 300, status: "Delivered" },
  { id: "ORD-1007", date: "2026-02-28", items: 2, total: 150, status: "Pending" },
];

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "All">("All");

  const cancelOrder = (id: string) => {
    setOrders(orders.map(o =>
      o.id === id ? { ...o, status: "Cancelled" } : o
    ));
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ? true : order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  const statusStyles: Record<OrderStatus, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shipping: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-gray-200 text-gray-700",
    Failed: "bg-red-100 text-red-700",
  };

  return (
    <main className="flex-1 p-6 bg-white">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          📦 Order History
        </h1>
        <p className="text-gray-500 mt-1">
          Track your purchases, monitor deliveries, and manage your orders easily.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border rounded-xl p-4 shadow-sm mb-6 flex flex-col lg:flex-row gap-4 lg:items-end lg:justify-between">
        
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium text-gray-700">Search Order</label>
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Filter Status</label>
          <div className="flex flex-wrap gap-2">
            {["All", "Pending", "Shipping", "Delivered", "Cancelled", "Failed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium border transition
                  ${filter === s
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No orders found.
          </div>
        )}

        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Left Info */}
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                {order.id}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Order Date: {order.date}
              </p>
              <p className="text-sm text-gray-500">
                Items: {order.items}
              </p>
            </div>

            {/* Middle */}
            <div className="flex flex-col items-start md:items-center">
              <span className="text-sm text-gray-500">Total Amount</span>
              <span className="text-lg font-bold text-purple-700">
                ${order.total.toFixed(2)}
              </span>
            </div>

            {/* Status */}
            <div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}>
                {order.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              
              <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}