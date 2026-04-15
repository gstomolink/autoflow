'use client';

import { useCallback, useEffect, useState } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";

type Props = {
  onView: (order: unknown) => void;
};

type Co = {
  id: number;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  lines?: { id: number }[];
  totalAmount: string;
  status: string;
  paymentStatus: string;
};

export default function OrdersTable({ onView }: Props) {
  const { t } = useAdminI18n();
  const [orders, setOrders] = useState<Co[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const r = await apiFetch("/customer-orders");
      if (!r.ok) throw new Error(await r.text());
      setOrders(await r.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <p className="text-slate-500 p-4">Loading…</p>;
  }

  return (
    <div>
      {error ? <p className="text-rose-600 text-sm mb-2">{error}</p> : null}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-white text-black text-sm">
            <tr>
              <th className="p-3 text-left">{t("tableOrderId")}</th>
              <th className="p-3 text-left">{t("tableDate")}</th>
              <th className="p-3 text-left">{t("tableCustomer")}</th>
              <th className="p-3 text-left">{t("tableItems")}</th>
              <th className="p-3 text-left">{t("tableTotal")}</th>
              <th className="p-3 text-left">{t("tableStatus")}</th>
              <th className="p-3 text-left">{t("tablePayment")}</th>
              <th className="p-3 text-left">{t("tableActions")}</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3 font-medium text-gray-700">{o.orderNumber}</td>
                <td className="p-3 text-gray-700">{String(o.createdAt).slice(0, 10)}</td>
                <td className="p-3 text-gray-700">{o.customerName}</td>
                <td className="p-3 text-gray-700">{o.lines?.length ?? 0}</td>
                <td className="p-3 font-semibold text-gray-700">${Number(o.totalAmount).toFixed(2)}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    o.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : o.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {o.status}
                  </span>
                </td>

                <td className="p-3 text-gray-700">{o.paymentStatus}</td>

                <td className="p-3 space-x-2 text-gray-700">
                  <button
                    type="button"
                    onClick={() => onView(o)}
                    className="px-3 py-1 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors"
                  >
                    {t("actionView")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
