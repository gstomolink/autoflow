'use client';

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

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
  product?: { name: string; sku: string };
  supplier?: { name: string };
};

export default function AutomatedOrdersTable() {
  const [rows, setRows] = useState<Sug[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch("/inventory-suggestions");
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

  const runScan = async () => {
    setRunning(true);
    setError("");
    try {
      const r = await apiFetch("/inventory-suggestions/run-replenishment", {
        method: "POST",
      });
      if (!r.ok) throw new Error(await r.text());
      setRows(await r.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Run failed");
    } finally {
      setRunning(false);
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
          {running ? "Running…" : "Run replenishment scan"}
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
          </tr>
        </thead>

        <tbody>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
