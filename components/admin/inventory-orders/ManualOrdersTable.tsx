'use client';

import { useState } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

import AddOrderModal from "./AddOrderModal";
import EditOrderModal from "./EditOrderModal";
import ViewOrderModal from "./ViewOrderModal";
import ProceedModal from "./ProceedModal";

const data = [
  {
    id: "ORD-001",
    product: "Laptop",
    sku: "LAP-01",
    stock: 10,
    reorder: 20,
    suggested: 15,
    ordered: 10,
    supplier: "ABC Traders",
    date: "2026-04-01",
    status: "Draft",
  },
];

export default function ManualOrdersTable() {

  const { t } = useAdminI18n();

  const [add, setAdd] = useState(false);
  const [view, setView] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);
  const [proceed, setProceed] = useState<any>(null);

  return (
    <div>

      {/* Add Button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setAdd(true)}
          className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded"
        >
          {t("inventoryAddNewOrder") || "+ Add New Order"}
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded text-gray-700">
        <thead className="bg-white text-left">
          <tr>
            <th className="p-2">{t("tableOrderId") || "Order ID"}</th>
            <th className="p-2">{t("tableProduct") || "Product"}</th>
            <th className="p-2">{t("tableSku") || "SKU"}</th>
            <th className="p-2">{t("tableStock") || "Stock"}</th>
            <th className="p-2">{t("tableReorder") || "Reorder"}</th>
            <th className="p-2">{t("tableSuggested") || "Suggested"}</th>
            <th className="p-2">{t("tableOrdered") || "Ordered"}</th>
            <th className="p-2">{t("menuSuppliers") || "Supplier"}</th>
            <th className="p-2">{t("tableDelivery") || "Delivery"}</th>
            <th className="p-2">{t("tableActions") || "Actions"}</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="p-2">{d.id}</td>
              <td className="p-2">{d.product}</td>
              <td className="p-2">{d.sku}</td>
              <td className="p-2">{d.stock}</td>
              <td className="p-2">{d.reorder}</td>
              <td className="p-2">{d.suggested}</td>
              <td className="p-2">{d.ordered}</td>
              <td className="p-2">{d.supplier}</td>
              <td className="p-2">{d.date}</td>

              <td className="p-2">
                <div className="flex flex-wrap gap-2">

                  {/* VIEW */}
                  <button
                    onClick={() => setView(d)}
                    className="px-3 py-1 bg-sky-500 text-white hover:bg-sky-600 rounded"
                  >
                    {t("actionView") || "View"}
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={() => setEdit(d)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded"
                  >
                    {t("actionEdit") || "Edit"}
                  </button>

                  {/* DELETE */}
                  <button
                    className="px-3 py-1 bg-rose-500 text-white hover:bg-rose-600 rounded"
                  >
                    {t("actionDelete") || "Delete"}
                  </button>

                  {/* PROCEED */}
                  <button
                    onClick={() => setProceed(d)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    {t("actionProceed") || "Proceed"}
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODALS */}
      {add && <AddOrderModal onClose={() => setAdd(false)} />}
      {view && <ViewOrderModal data={view} onClose={() => setView(null)} />}
      {edit && <EditOrderModal data={edit} onClose={() => setEdit(null)} />}
      {proceed && <ProceedModal data={proceed} onClose={() => setProceed(null)} />}

    </div>
  );
}