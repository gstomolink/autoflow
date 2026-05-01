'use client';

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { PAGE_SIZE, readPaginatedJson } from "@/lib/paginated";
import TablePagination from "@/components/admin/common/TablePagination";

type UrgencyStatus = "on_track" | "next_week" | "urgent" | "order_passed";

type Sug = {
  id: number;
  suggestedQty: number;
  stockAtCalc: number;
  reorderPoint: number;
  forecastQty: number;
  leadTimeDays?: number | null;
  notifyBufferDays?: number | null;
  daysCover?: string | null;
  dailyUsageRate?: string | null;
  maxOrderToDeliveryDays?: number | null;
  daysUntilStockout?: string | null;
  urgencyStatus?: UrgencyStatus | null;
  recommendedOrderDate?: string | null;
  aiConfidence?: string | null;
  aiReason?: string | null;
  status?: string;
  product?: { name: string; sku: string };
  supplier?: { name: string };
};

const urgencyStyles: Record<UrgencyStatus, string> = {
  on_track: "bg-emerald-100 text-emerald-700",
  next_week: "bg-amber-100 text-amber-700",
  urgent: "bg-rose-100 text-rose-700",
  order_passed: "bg-red-100 text-red-700",
};

function urgencyLabel(status?: UrgencyStatus | null) {
  if (status === "next_week") return "Next week";
  if (status === "urgent") return "Urgent";
  if (status === "order_passed") return "Order passed";
  return "On track";
}

export default function AutomatedOrdersTable() {
  const [rows, setRows] = useState<Sug[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [creatingOrderId, setCreatingOrderId] = useState<number | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const load = useCallback(async (pageNum: number) => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch(
        `/inventory-suggestions?page=${pageNum}&limit=${PAGE_SIZE}`,
      );
      if (!r.ok) throw new Error(await r.text());
      const body = await readPaginatedJson<Sug>(r);
      setRows(body.items);
      setTotal(body.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(page);
  }, [load, page, refreshToken]);

  const runScan = async () => {
    setRunning(true);
    setError("");
    try {
      const r = await apiFetch("/inventory-suggestions/run-ai", {
        method: "POST",
      });
      if (!r.ok) throw new Error(await r.text());
      setPage(1);
      setRefreshToken((x) => x + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Run failed");
    } finally {
      setRunning(false);
    }
  };

  const createOrder = async (suggestionId: number) => {
    setCreatingOrderId(suggestionId);
    setError("");
    try {
      const r = await apiFetch(`/inventory-suggestions/${suggestionId}/create-order`, {
        method: "POST",
      });
      if (!r.ok) throw new Error(await r.text());
      await load(page);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create order");
    } finally {
      setCreatingOrderId(null);
    }
  };

  if (loading) {
    return <p className="text-slate-500">Loading…</p>;
  }

  return (
    <div>
      <p className="text-sm text-slate-600 mb-3">
        Rule-based replenishment: uses product daily usage (avg daily sales), supplier lead time, and shop
        &quot;early warning&quot; buffer. Runs automatically each day at noon (server time).
      </p>
      <div className="flex justify-end mb-3">
        <button
          type="button"
          disabled={running}
          onClick={() => void runScan()}
          className="bg-violet-600 text-violet-50 hover:bg-violet-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {running ? "Running…" : "Run AI scan"}
        </button>
      </div>
      {error ? <p className="text-rose-600 text-sm mb-2">{error}</p> : null}
      <table className="w-full bg-white rounded shadow text-gray-700 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">SKU</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left">Days cover</th>
            <th className="p-2 text-left">Lead+buf</th>
            <th className="p-2 text-left">Daily use</th>
            <th className="p-2 text-left">Reorder</th>
            <th className="p-2 text-left">Forecast 30d</th>
            <th className="p-2 text-left">Suggested</th>
            <th className="p-2 text-left">Supplier</th>
            <th className="p-2 text-left">AI timing</th>
            <th className="p-2 text-left">Urgency</th>
            <th className="p-2 text-left">Confidence</th>
            <th className="p-2 text-left">Reason</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr className="border-t border-gray-200">
              <td className="p-6 text-center text-slate-500" colSpan={15}>
                No data
              </td>
            </tr>
          ) : null}
          {rows.map((d) => (
            <tr key={d.id} className="border-t border-gray-200">
              <td className="p-2">{d.product?.name ?? "—"}</td>
              <td className="p-2">{d.product?.sku ?? "—"}</td>
              <td className="p-2">{d.stockAtCalc}</td>
              <td className="p-2">{d.daysCover ?? "—"}</td>
              <td className="p-2">
                {d.leadTimeDays != null && d.notifyBufferDays != null
                  ? `${d.leadTimeDays}+${d.notifyBufferDays}`
                  : "—"}
              </td>
              <td className="p-2">{d.dailyUsageRate ?? "—"}</td>
              <td className="p-2">{d.reorderPoint}</td>
              <td className="p-2">{d.forecastQty}</td>
              <td className="p-2">{d.suggestedQty}</td>
              <td className="p-2">{d.supplier?.name ?? "—"}</td>
              <td className="p-2">
                {d.maxOrderToDeliveryDays != null
                  ? `${d.maxOrderToDeliveryDays} days`
                  : "—"}
              </td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyStyles[d.urgencyStatus ?? "on_track"]}`}
                >
                  {urgencyLabel(d.urgencyStatus)}
                </span>
              </td>
              <td className="p-2">
                {d.aiConfidence != null
                  ? `${Math.round(Number(d.aiConfidence) * 100)}%`
                  : "—"}
              </td>
              <td className="p-2 max-w-72 truncate" title={d.aiReason ?? undefined}>
                {d.aiReason ?? "—"}
              </td>
              <td className="p-2">
                <button
                  type="button"
                  onClick={() => void createOrder(d.id)}
                  disabled={creatingOrderId === d.id || d.status === "converted"}
                  className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-3 py-1 rounded disabled:opacity-50"
                >
                  {d.status === "converted"
                    ? "Converted"
                    : creatingOrderId === d.id
                      ? "Creating..."
                      : "Create order"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        page={page}
        total={total}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
}
