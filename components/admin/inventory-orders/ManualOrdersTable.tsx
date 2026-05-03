'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import AddOrderModal from "./AddOrderModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import EditOrderModal from "./EditOrderModal";
import ViewOrderModal from "./ViewOrderModal";
import ProceedModal from "./ProceedModal";
import type { InventoryOrdersFilterValues } from "./Filters";
import { apiFetch } from "@/lib/api";
import {
  LIST_FETCH_LIMIT,
  PAGE_SIZE,
  readPaginatedJson,
  slicePage,
} from "@/lib/paginated";
import { SHOP_SCOPE_CHANGE_EVENT } from "@/lib/shop-scope";
import TablePagination from "@/components/admin/common/TablePagination";
import { inventoryOrderStatusLabel } from "@/lib/inventory-order-statuses";

type Line = {
  id: number;
  productId: number;
  quantityOrdered: number;
  unitCost: string;
  product?: { name: string; sku: string };
};

type InvOrder = {
  id: number;
  orderNumber: string;
  status: string;
  source?: string;
  expectedDeliveryDate: string | null;
  createdAt?: string;
  supplier?: { id: number; name: string };
  lines?: Line[];
};

function monthKeyFromDate(value: string | null | undefined): string {
  if (!value) return "";
  const s = String(value);
  if (s.length >= 7) return s.slice(0, 7);
  return "";
}

export default function ManualOrdersTable({
  filters,
}: {
  filters: InventoryOrdersFilterValues;
}) {
  const t = useAdminI18n();
  const [add, setAdd] = useState(false);
  const [view, setView] = useState<InvOrder | null>(null);
  const [edit, setEdit] = useState<InvOrder | null>(null);
  const [proceed, setProceed] = useState<InvOrder | null>(null);
  const [rows, setRows] = useState<InvOrder[]>([]);
  const [listPage, setListPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const params = new URLSearchParams({
        source: "manual",
        page: "1",
        limit: String(LIST_FETCH_LIMIT),
      });
      if (filters.status.trim()) params.set("status", filters.status.trim());
      if (filters.month.trim()) params.set("month", filters.month.trim());
      if (filters.supplierId.trim()) params.set("supplierId", filters.supplierId.trim());
      if (filters.productSearch.trim()) {
        params.set("productSearch", filters.productSearch.trim());
      }
      const r = await apiFetch(
        `/inventory-orders?${params.toString()}`,
      );
      if (!r.ok) throw new Error(await r.text());
      const body = await readPaginatedJson<InvOrder>(r);
      setRows(body.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const handleShopScopeChange = () => {
      void load();
    };
    window.addEventListener(SHOP_SCOPE_CHANGE_EVENT, handleShopScopeChange);
    return () => {
      window.removeEventListener(SHOP_SCOPE_CHANGE_EVENT, handleShopScopeChange);
    };
  }, [load]);

  const pagedRows = useMemo(
    () => slicePage(rows, listPage, PAGE_SIZE),
    [rows, listPage],
  );

  useEffect(() => {
    setListPage(1);
  }, [filters]);

  const hasActiveFilters =
    Boolean(filters.status.trim()) ||
    Boolean(filters.month.trim()) ||
    Boolean(filters.supplierId.trim()) ||
    Boolean(filters.productSearch.trim());

  if (loading) {
    return <p className="text-slate-500">Loading…</p>;
  }

  return (
    <div>
      {error ? <p className="text-rose-600 text-sm mb-2">{error}</p> : null}
      <div className="flex justify-end mb-3">
        <button
          type="button"
          onClick={() => setAdd(true)}
          className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded"
        >
          Add New Order
        </button>
      </div>

      <table className="w-full bg-white shadow rounded text-gray-700">
        <thead className="bg-white text-left border-b border-gray-200">
          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">Source</th>
            <th className="p-2">Supplier</th>
            <th className="p-2">Products</th>
            <th className="p-2">Delivery</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="p-4 text-slate-500 text-center" colSpan={7}>
                {hasActiveFilters
                  ? "No orders match the current filters."
                  : "No orders yet."}
              </td>
            </tr>
          ) : null}
          {pagedRows.map((d) => (
            <tr key={d.id} className="border-t border-gray-200">
              <td className="p-2">{d.orderNumber}</td>
              <td className="p-2 capitalize">{d.source ?? "—"}</td>
              <td className="p-2">{d.supplier?.name ?? "—"}</td>
              <td className="p-2">{d.lines?.length ?? 0}</td>
              <td className="p-2">
                {d.expectedDeliveryDate
                  ? String(d.expectedDeliveryDate).slice(0, 10)
                  : "—"}
              </td>
              <td className="p-2">{inventoryOrderStatusLabel(d.status)}</td>

              <td className="p-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setView(d)}
                    className="px-3 py-1 bg-sky-500 text-sky-50 hover:bg-sky-600 rounded cursor-pointer"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => setEdit(d)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm("Delete order?")) return;
                      const r = await apiFetch(`/inventory-orders/${d.id}`, {
                        method: "DELETE",
                      });
                      if (!r.ok) alert(await r.text());
                      else void load();
                    }}
                    className="px-3 py-1 bg-rose-500 text-rose-50 hover:bg-rose-600 rounded cursor-pointer"
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => setProceed(d)}
                    className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
                  >
                    Proceed
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        page={listPage}
        total={rows.length}
        pageSize={PAGE_SIZE}
        onPageChange={setListPage}
      />

      {add && <AddOrderModal onClose={() => { setAdd(false); void load(); }} />}
      {view && <ViewOrderModal data={view} onClose={() => setView(null)} />}
      {edit && <EditOrderModal data={edit} onClose={() => { setEdit(null); void load(); }} />}
      {proceed && <ProceedModal data={proceed} onClose={() => setProceed(null)} />}
    </div>
  );
}
