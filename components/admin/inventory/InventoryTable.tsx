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

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [threshold, setThreshold] = useState(20);
  const [shop, setShop] = useState("");
  const [product, setProduct] = useState("");
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

    if (shop) {
      d = d.filter((i) => i.warehouseName === shop);
    }

    if (product) {
      d = d.filter((i) => i.productName === product);
    }

    return d;
  }, [search, shop, product, threshold, onlyLow, rows]);

  const shops = useMemo(() => {
    const s = new Set(rows.map((r) => r.warehouseName));
    return [...s];
  }, [rows]);

  const products = useMemo(() => {
    const s = new Set(rows.map((r) => r.productName));
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const applyFilters = () => {
    setSearch(searchInput.trim());
  };

  const resetFilters = () => {
    setSearch("");
    setSearchInput("");
    setShop("");
    setProduct("");
    setThreshold(20);
  };

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

    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex items-center gap-3 flex-wrap">
        <input
          placeholder="Search product..."
          value={searchInput}
          className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg w-72"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              applyFilters();
            }
          }}
        />

        <select
          value={product}
          onChange={(e)=>setProduct(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        >
          <option value="">All Products</option>
          {products.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          value={shop}
          onChange={(e)=>setShop(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        >
          <option value="">All Shops</option>
          {shops.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>

        <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg">
          <label className="text-sm text-gray-700">{t("tableLowStockLevel")}</label>
          <input
            type="number"
            value={threshold}
            onChange={(e)=>setThreshold(Number(e.target.value))}
            className="w-20 text-gray-700 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={applyFilters}
          className="ml-auto bg-sky-500 text-sky-50 px-5 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
        >
          {t("actionSearch")}
        </button>

      <button
        type="button"
        onClick={resetFilters}
        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer"
      >
        Reset
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
          {/* <th className="p-3">{t("tableReserved")}</th> */}
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
            {/* <td className="p-3">{i.reservedQuantity}</td> */}
            <td className="p-3">{i.available}</td>
            <td className="p-3">{threshold}</td>
            <td className="p-3 font-bold">
              {i.status === "Low Stock" ? t("statusLowStock") : t("statusInStock")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {showAdd && (
      <AddStockModal
        onClose={() => setShowAdd(false)}
        onSaved={() => void load()}
      />
    )}
    {showAdjust && <StockAdjustmentModal onClose={() => setShowAdjust(false)} />}
    {showTransfer && <StockTransferModal onClose={() => setShowTransfer(false)} />}
  </div>
);
}
