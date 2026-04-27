'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import StockAdjustmentModal from "./StockAdjustmentModal";
import StockTransferModal from "./StockTransferModal";
import AddStockModal from "./AddStockModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";

type Row = {
  id: number;
  productName: string;
  warehouseName: string;
  quantityOnHand: number;
  reservedQuantity: number;
  available: number;
  reorderPoint: number;
  status: string;
};

export default function InventoryTable({ onlyLow }: { onlyLow?: boolean }) {
  const { t } = useAdminI18n();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [threshold, setThreshold] = useState(20);
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAdjust, setShowAdjust] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch("/inventory-stock");
      if (!r.ok) throw new Error(await r.text());
      setRows(await r.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    let d = rows.map((item) => ({
      ...item,
      status:
        item.quantityOnHand < threshold ? "Low Stock" : "In Stock",
    }));

    if (onlyLow) {
      d = d.filter((i) => i.quantityOnHand < threshold);
    }

    if (search) {
      d = d.filter((i) =>
        i.productName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (warehouse) {
      d = d.filter((i) => i.warehouseName === warehouse);
    }

    return d;
  }, [search, warehouse, threshold, onlyLow, rows]);

  const warehouses = useMemo(() => {
    const s = new Set(rows.map((r) => r.warehouseName));
    return [...s];
  }, [rows]);

  if (loading) {
    return <p className="text-slate-500">Loading…</p>;
  }

  return (
  <div>
    {error ? <p className="text-rose-600 text-sm mb-2">{error}</p> : null}
    <div className="flex justify-end mb-4 gap-2">
      <button
        type="button"
        onClick={() => setShowAdd(true)}
        className="w-44 bg-sky-500 text-sky-50 px-4 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors"
      >
        {t("actionAddStock")}
      </button>

      <button
        type="button"
        onClick={() => setShowAdjust(true)}
        className="w-44 bg-slate-200 text-slate-700 px-4 py-2 rounded cursor-pointer hover:bg-slate-300 transition-colors"
      >
        {t("actionAdjust")}
      </button>

      <button
        type="button"
        onClick={() => setShowTransfer(true)}
        className="w-44 bg-sky-500 text-sky-50 px-4 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors"
      >
        {t("actionTransfer")}
      </button>
    </div>

    <div className="flex justify-between items-center mb-4 flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm">
      <div className="flex gap-2 flex-wrap">
        <input
          placeholder="Search product..."
          className="border border-gray-300 text-gray-700 px-3 py-2 rounded cursor-pointer"
          onChange={(e) => setSearchInput(e.target.value)}
          onBlur={() => setSearch(searchInput)}
        />

        <select
          onChange={(e) => setWarehouse(e.target.value)}
          className="border border-gray-300 text-gray-700 px-3 py-2 rounded cursor-pointer"
        >
          <option value="">All Warehouses</option>
          {warehouses.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>

        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="border border-gray-300 text-gray-700 px-2 py-2 rounded w-28 cursor-pointer"
          title="Low stock threshold"
        />
      </div>

      <button type="button" onClick={() => void load()} className="w-44 bg-sky-500 text-sky-50 px-5 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors">
        {t("actionSearch")}
      </button>
    </div>

    <div className="mb-4">
      <button type="button" className="px-4 py-2 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors">
        {t("actionExportCsv")}
      </button>
    </div>

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
        {filtered.map((i) => (
          <tr
            key={i.id}
            className={`border-t border-gray-300 ${
              i.status === "Low Stock" ? "bg-red-100" : ""
            }`}
          >
            <td className="p-3">{i.productName}</td>
            <td className="p-3">{i.warehouseName}</td>
            <td className="p-3">{i.quantityOnHand}</td>
            <td className="p-3">{i.reservedQuantity}</td>
            <td className="p-3">{i.available}</td>
            <td className="p-3">{threshold}</td>
            <td className="p-3 font-bold">
              {i.status === "Low Stock" ? t("statusLowStock") : t("statusInStock")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {showAdd && <AddStockModal onClose={() => { setShowAdd(false); void load(); }} />}
    {showAdjust && <StockAdjustmentModal onClose={() => setShowAdjust(false)} />}
    {showTransfer && <StockTransferModal onClose={() => setShowTransfer(false)} />}
  </div>
);
}
