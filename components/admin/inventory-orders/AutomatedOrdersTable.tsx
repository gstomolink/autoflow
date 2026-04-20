'use client';

import { useState, useEffect } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

type ProductItem = {
  name: string;
  quantity: number;
  unit: string;
  cost: number;
};

type Order = {
  orderId: string;
  supplierId: string;
  supplierName: string;
  items: ProductItem[];
  createdDate: string;
};

const initialOrders: Order[] = [
  {
    orderId: "ORD001",
    supplierId: "SUP001",
    supplierName: "ABC Suppliers",
    createdDate: "2026-03-30",
    items: [
      { name: "Flour", quantity: 20, unit: "kg", cost: 250 },
      { name: "Chicken", quantity: 50, unit: "kg", cost: 900 },
    ],
  },
];

export default function AutomatedOrdersTable() {

  const { t } = useAdminI18n();

  const [orders, setOrders] = useState(initialOrders);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [proceedOrder, setProceedOrder] = useState<Order | null>(null);
  const [modalOrder, setModalOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (proceedOrder) {
      setModalOrder(JSON.parse(JSON.stringify(proceedOrder)));
    }
  }, [proceedOrder]);

  const handleAddItem = (item: ProductItem) => {
    if (!modalOrder) return;
    setModalOrder(prev => prev ? { ...prev, items: [...prev.items, item] } : null);
  };

  const handleRemoveItem = (index: number) => {
    if (!modalOrder) return;
    setModalOrder(prev => prev ? {
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    } : null);
  };

  const handleUpdateQuantity = (index: number, qty: number) => {
    if (!modalOrder) return;
    setModalOrder(prev => prev ? {
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, quantity: qty } : item
      )
    } : null);
  };

  const calculateTotal = (items: ProductItem[]) =>
    items.reduce((acc, item) => acc + item.quantity * item.cost, 0);

  const handleProceed = () => {
    if (!modalOrder) return;

    setOrders(prev =>
      prev.map(o => o.orderId === modalOrder.orderId ? modalOrder : o)
    );

    alert(
      `${t("menuSuppliers") || "Supplier"}: ${modalOrder.supplierName}\n`
    );

    setProceedOrder(null);
    setModalOrder(null);
  };

  return (
    <div className="text-gray-700">

      {/* TABLE */}
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">{t("tableAutomateOrderId") || "Automate Order ID"}</th>
            <th className="p-2">{t("tableSupplierId") || "Supplier ID"}</th>
            <th className="p-2">{t("tableNoOfItems") || "No of Items"}</th>
            <th className="p-2">{t("tableOrderCreatedDate") || "Order Created Date"}</th>
            <th className="p-2">{t("tableActions") || "Actions"}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx} className="border-t border-gray-300">
              <td className="p-2 border-t border-gray-300">{order.orderId}</td>
              <td className="p-2 border-t border-gray-300">{order.supplierId}</td>
              <td className="p-2 border-t border-gray-300">{order.items.length}</td>
              <td className="p-2 border-t border-gray-300">{order.createdDate}</td>
              <td className="p-2 border-t border-gray-300 flex gap-2">
                
                <button
                  onClick={() => setViewOrder(order)}
                  className="px-3 py-1 bg-sky-500 text-white hover:bg-sky-600 rounded"
                >
                  {t("actionView") || "View"}
                </button>

                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => setProceedOrder(order)}
                >
                  {t("actionProceed") || "Proceed"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW MODAL */}
{viewOrder && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50">
    <div className="bg-white p-6 rounded shadow-lg relative w-[600px] max-h-[90vh] overflow-y-auto">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-black text-xl font-bold hover:text-gray-700"
        onClick={() => setViewOrder(null)}
      >
        ×
      </button>

      <h2 className="text-xl font-bold mb-4 text-center">Order Details</h2>

      {/* Order Summary Table */}
      <table className="w-full text-gray-700 mb-4 border border-gray-300">
        <tbody>
          <tr>
            <td className="p-2 border border-gray-300 font-semibold">Automate Order ID</td>
            <td className="p-2 border border-gray-300">{viewOrder.orderId}</td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300 font-semibold">Supplier ID</td>
            <td className="p-2 border border-gray-300">{viewOrder.supplierId}</td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300 font-semibold">Supplier Name</td>
            <td className="p-2 border border-gray-300">{viewOrder.supplierName}</td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300 font-semibold">No of Items</td>
            <td className="p-2 border border-gray-300">{viewOrder.items.length}</td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300 font-semibold">Order Created Date</td>
            <td className="p-2 border border-gray-300">{viewOrder.createdDate}</td>
          </tr>
        </tbody>
      </table>

      {/* Item Details */}
      <h3 className="text-lg font-semibold mb-2">Items</h3>
      <table className="w-full text-gray-700 border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300 text-left">Item Name</th>
            <th className="p-2 border border-gray-300 text-left">Quantity</th>
            <th className="p-2 border border-gray-300 text-left">Unit</th>
            <th className="p-2 border border-gray-300 text-left">Cost</th>
          </tr>
        </thead>
        <tbody>
          {viewOrder.items.map((item, i) => (
            <tr key={i} className="border-t border-gray-300">
              <td className="p-2 border border-gray-300">{item.name}</td>
              <td className="p-2 border border-gray-300">{item.quantity}</td>
              <td className="p-2 border border-gray-300">{item.unit}</td>
              <td className="p-2 border border-gray-300">Rs: {item.cost * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Cost */}
      <p className="font-bold mt-4 text-right">
        Total Cost: Rs: {viewOrder.items.reduce((sum, item) => sum + item.quantity * item.cost, 0)}
      </p>
    </div>
  </div>
)}
      {/* PROCEED MODAL */}
      {modalOrder && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-[600px] max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-black text-xl font-bold"
              onClick={() => { setProceedOrder(null); setModalOrder(null); }}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">Proceed Order - {modalOrder.supplierName}</h2>

            {/* Items Table */}
            <table className="w-full text-gray-700 mb-4 border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border border-gray-300">Product</th>
                  <th className="p-2 border border-gray-300">Quantity</th>
                  <th className="p-2 border border-gray-300">Unit</th>
                  <th className="p-2 border border-gray-300">Cost</th>
                  <th className="p-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {modalOrder.items.map((item, i) => (
                  <tr key={i} className="border-t border-gray-300">
                    <td className="p-2 border border-gray-300">{item.name}</td>
                    <td className="p-2 border border-gray-300">
                      <input
                        type="number"
                        value={item.quantity}
                        className="w-16 border border-gray-300 px-1 py-1 rounded"
                        onChange={(e) => handleUpdateQuantity(i, Number(e.target.value))}
                      />
                    </td>
                    <td className="p-2 border border-gray-300">{item.unit}</td>
                    <td className="p-2 border border-gray-300">Rs: {item.cost * item.quantity}</td>
                    <td className="p-2 border border-gray-300">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRemoveItem(i)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add Product Section */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Add Product for {modalOrder.supplierName}</h3>
              <button
                className="bg-sky-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  handleAddItem({ name: "New Ingredient", quantity: 1, unit: "kg", cost: 100 })
                }
              >
                Add Ingredient
              </button>
            </div>

            {/* Needed Date */}
            <div className="mb-4">
              <label className="font-bold mr-2">Needed By:</label>
              <input type="date" className="border border-gray-300 px-2 py-1 rounded" />
            </div>

            {/* Total */}
            <p className="font-bold mb-4">
              Total Items: {modalOrder.items.length}, Total Cost: Rs: {calculateTotal(modalOrder.items)}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => { setProceedOrder(null); setModalOrder(null); }}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}