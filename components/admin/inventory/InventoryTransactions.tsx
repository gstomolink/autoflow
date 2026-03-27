'use client';

import { useState, useMemo } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

type Props = {
  type: "movement" | "audit";
};

type MovementItem = {
  product: string;
  warehouse: string;
  type: string;
  qty: number;
  from: string;
  to: string;
  date: string;
};

type AuditItem = {
  product: string;
  warehouse: string;
  type: string;
  qty: number;
  before: number;
  after: number;
  ref: string;
  date: string;
};

const movementData: MovementItem[] = [
  {
    product: "Laptop",
    warehouse: "Main Warehouse",
    type: "Transfer",
    qty: -5,
    from: "Main Warehouse",
    to: "Galle Branch",
    date: "2026-03-26",
  },
  {
    product: "Headphones",
    warehouse: "Galle Branch",
    type: "Adjustment",
    qty: +3,
    from: "-",
    to: "-",
    date: "2026-03-25",
  },
];

const auditData: AuditItem[] = [
  {
    product: "Laptop",
    warehouse: "Main Warehouse",
    type: "Sale",
    qty: -2,
    before: 50,
    after: 48,
    ref: "ORD-001",
    date: "2026-03-25",
  },
  {
    product: "Mouse",
    warehouse: "Galle Branch",
    type: "Purchase",
    qty: +10,
    before: 20,
    after: 30,
    ref: "PUR-002",
    date: "2026-03-24",
  },
];

export default function InventoryTransactions({ type }: Props) {
  const { t } = useAdminI18n();
  const [warehouse, setWarehouse] = useState("");
  const [search, setSearch] = useState("");

  const data = type === "movement" ? movementData : auditData;

  const filtered = useMemo(() => {
    let d: (MovementItem | AuditItem)[] = data;

    if (warehouse) {
      d = d.filter((i) => i.warehouse === warehouse);
    }

    if (search) {
      d = d.filter((i) =>
        i.product.toLowerCase().includes(search.toLowerCase())
      );
    }

    return d;
  }, [warehouse, search, data]);

  return (
    <div>
      {/* FILTER LINE */}
      <div className="flex items-center justify-between mb-4 gap-3 text-gray-700">
  
  {/* Left side (Search + Dropdown) */}
  <div className="flex gap-2 flex-1">
    <input
      placeholder="Search product..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    className="w-72 border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
    />

    <select
      value={warehouse}
      onChange={(e) => setWarehouse(e.target.value)}
      className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700 cursor-pointer"
    >
      <option value="">All Warehouses</option>
      <option>Main Warehouse</option>
      <option>Galle Branch</option>
      <option>Matara Depot</option>
    </select>
  </div>

  {/* Right side button */}
  <button
    className="bg-sky-500 text-sky-50 px-4 py-2 rounded cursor-pointer whitespace-nowrap hover:bg-sky-600 transition-colors"
  >
    {t("actionSearch")}
  </button>

</div>

      {/* TABLE */}
      <table className="w-full bg-white rounded shadow text-gray-700 text-left">
        <thead className="bg-white">
          <tr>
            <th className="p-3">{t("tableProduct")}</th>
            <th className="p-3">{t("tableWarehouse")}</th>
            <th className="p-3">{t("tableType")}</th>
            <th className="p-3">{t("tableQty")}</th>

            {type === "movement" && (
              <>
                <th className="p-3">{t("tableFrom")}</th>
                <th className="p-3">{t("tableTo")}</th>
              </>
            )}

            {type === "audit" && (
              <>
                <th className="p-3">{t("tableBefore")}</th>
                <th className="p-3">{t("tableAfter")}</th>
                <th className="p-3">{t("tableReference")}</th>
              </>
            )}

            <th className="p-3">{t("tableDate")}</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item, i) => (
            <tr key={i} className="border-t border-gray-300">
              <td className="p-3">{item.product}</td>
              <td className="p-3">{item.warehouse}</td>
              <td className="p-3">{item.type}</td>

              {/* Quantity Color */}
              <td
                className={`p-3 font-bold ${
                  item.qty > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.qty > 0 ? `+${item.qty}` : item.qty}
              </td>

              {/* MOVEMENT */}
              {type === "movement" && (
                <>
                  <td className="p-3">{(item as any).from}</td>
                  <td className="p-3">{(item as any).to}</td>
                </>
              )}

              {/* AUDIT */}
              {type === "audit" && (
                <>
                  <td className="p-3">{(item as any).before}</td>
                  <td className="p-3">{(item as any).after}</td>
                  <td className="p-3">{(item as any).ref}</td>
                </>
              )}

              <td className="p-3">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}