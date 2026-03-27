'use client';

import { useState, useMemo } from "react";
import StockAdjustmentModal from "./StockAdjustmentModal";
import StockTransferModal from "./StockTransferModal";
import AddStockModal from "./AddStockModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

const data = [
  {
    product: "Laptop",
    warehouse: "Main Warehouse",
    stock: 50,
    reserved: 10,
    reorder: 20,
  },
  {
    product: "Headphones",
    warehouse: "Galle Branch",
    stock: 15,
    reserved: 5,
    reorder: 20,
  },
];

export default function InventoryTable({ onlyLow }: any) {
  const { t } = useAdminI18n();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [threshold, setThreshold] = useState(20);

  const [showAdjust, setShowAdjust] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    let d = data.map((item) => ({
      ...item,
      available: item.stock - item.reserved,
      status: item.stock < threshold ? "Low Stock" : "In Stock",
    }));

    if (onlyLow) {
      d = d.filter((i) => i.stock < threshold);
    }

    if (search) {
      d = d.filter((i) =>
        i.product.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (warehouse) {
      d = d.filter((i) => i.warehouse === warehouse);
    }

    return d;
  }, [search, warehouse, threshold, onlyLow]);

  return (
  <div>
    {/* ACTION BUTTONS */}
    <div className="flex justify-end mb-4 gap-2">
      <button
        onClick={() => setShowAdd(true)}
        className="w-44 bg-sky-500 text-sky-50 px-4 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors"
      >
        {t("actionAddStock")}
      </button>

      <button
        onClick={() => setShowAdjust(true)}
        className="w-44 bg-slate-200 text-slate-700 px-4 py-2 rounded cursor-pointer hover:bg-slate-300 transition-colors"
      >
        {t("actionAdjust")}
      </button>

      <button
        onClick={() => setShowTransfer(true)}
        className="w-44 bg-sky-500 text-sky-50 px-4 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors"
      >
        {t("actionTransfer")}
      </button>
    </div>

    {/* SEARCH + FILTERS + SEARCH BUTTON */}
    <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
      {/* LEFT SIDE */}
      <div className="flex gap-2 flex-wrap">
        <input
          placeholder="Search product..."
          className="border border-gray-300 text-gray-700 px-3 py-2 rounded cursor-pointer"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          onChange={(e) => setWarehouse(e.target.value)}
          className="border border-gray-300 text-gray-700 px-3 py-2 rounded cursor-pointer"
        >
          <option value="">All Warehouses</option>
          <option>Main Warehouse</option>
          <option>Galle Branch</option>
        </select>

        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="border border-gray-300 text-gray-700 px-2 py-2 rounded w-28 cursor-pointer"
          title="Low stock threshold"
        />
      </div>

      {/* SEARCH BUTTON */}
      <button className="w-44 bg-sky-500 text-sky-50 px-5 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors">
        {t("actionSearch")}
      </button>
    </div>

    {/* EXPORT */}
    <div className="mb-4">
      <button className="px-4 py-2 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors">
        {t("actionExportCsv")}
      </button>
    </div>

    {/* TABLE */}
    <table className="w-full bg-white rounded shadow text-gray-700 text-left">
      <thead className="bg-white">
        <tr>
          <th className="p-3">{t("tableProduct")}</th>
          <th className="p-3">{t("tableWarehouse")}</th>
          <th className="p-3">{t("tableStock")}</th>
          <th className="p-3">{t("tableReserved")}</th>
          <th className="p-3">{t("tableAvailable")}</th>
          <th className="p-3">{t("tableLowStockLevel")}</th>
          <th className="p-3">{t("tableStatus")}</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((i, idx) => (
          <tr
            key={idx}
            className={`border-t border-gray-300 ${
              i.status === "Low Stock" ? "bg-red-100" : ""
            }`}
          >
            <td className="p-3">{i.product}</td>
            <td className="p-3">{i.warehouse}</td>
            <td className="p-3">{i.stock}</td>
            <td className="p-3">{i.reserved}</td>
            <td className="p-3">{i.available}</td>
            <td className="p-3">{threshold}</td>
            <td className="p-3 font-bold">
              {i.status === "Low Stock" ? t("statusLowStock") : t("statusInStock")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* MODALS */}
    {showAdd && <AddStockModal onClose={() => setShowAdd(false)} />}
    {showAdjust && <StockAdjustmentModal onClose={() => setShowAdjust(false)} />}
    {showTransfer && <StockTransferModal onClose={() => setShowTransfer(false)} />}
  </div>
);
}