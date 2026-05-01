'use client';

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { INVENTORY_ORDER_STATUS_OPTIONS } from "@/lib/inventory-order-statuses";

type SupplierOpt = { id: number; name: string };

export type InventoryOrdersFilterValues = {
  status: string;
  month: string;
  supplierId: string;
  productSearch: string;
};

type Props = {
  values: InventoryOrdersFilterValues;
  onChange: (next: InventoryOrdersFilterValues) => void;
};

export default function Filters({ values, onChange }: Props) {
  const [suppliers, setSuppliers] = useState<SupplierOpt[]>([]);

  const patch = useCallback(
    (partial: Partial<InventoryOrdersFilterValues>) => {
      onChange({ ...values, ...partial });
    },
    [onChange, values],
  );

  useEffect(() => {
    void (async () => {
      const r = await apiFetch("/suppliers");
      if (!r.ok) return;
      const data = (await r.json()) as { id: number; name: string }[];
      setSuppliers(data);
    })();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600" htmlFor="inv-order-month">
            Month
          </label>
          <input
            id="inv-order-month"
            type="month"
            value={values.month}
            onChange={(e) => patch({ month: e.target.value })}
            className="border border-gray-300 text-gray-700 p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600" htmlFor="inv-order-supplier">
            Supplier
          </label>
          <select
            id="inv-order-supplier"
            value={values.supplierId}
            onChange={(e) => patch({ supplierId: e.target.value })}
            className="border border-gray-300 text-gray-700 p-2 rounded min-w-[12rem]"
          >
            <option value="">All suppliers</option>
            {suppliers.map((s) => (
              <option key={s.id} value={String(s.id)}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600" htmlFor="inv-order-status">
            Status
          </label>
          <select
            id="inv-order-status"
            value={values.status}
            onChange={(e) => patch({ status: e.target.value })}
            className="border border-gray-300 text-gray-700 p-2 rounded min-w-[14rem]"
          >
            <option value="">All statuses</option>
            {INVENTORY_ORDER_STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-[12rem]">
          <label className="text-sm text-slate-600" htmlFor="inv-order-search">
            Product / SKU / order #
          </label>
          <input
            id="inv-order-search"
            type="search"
            value={values.productSearch}
            onChange={(e) => patch({ productSearch: e.target.value })}
            placeholder="Search…"
            className="border border-gray-300 text-gray-700 p-2 rounded w-full max-w-md"
          />
        </div>

        <div className="flex gap-2 items-end shrink-0">
          <button
            type="button"
            onClick={() => patch({ productSearch: "" })}
            className="border border-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-50 cursor-pointer"
          >
            Clear
          </button>
         
        </div>
      </div>
    </div>
  );
}
