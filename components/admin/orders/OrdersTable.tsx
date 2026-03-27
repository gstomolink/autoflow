import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

type Props = {
  onView: (order: any) => void;
};

const orders = [
  {
    id: "ORD-1001",
    date: "2026-03-20",
    customer: "John Doe",
    items: 3,
    total: 240,
    status: "Pending",
    payment: "Paid",
  },
  {
    id: "ORD-1002",
    date: "2026-03-21",
    customer: "Alice",
    items: 2,
    total: 120,
    status: "Delivered",
    payment: "Paid",
  },
];

export default function OrdersTable({ onView }: Props) {
  const { t } = useAdminI18n();
  return (
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
          {orders.map((o, i) => (
            <tr key={i} className="border-t">
              <td className="p-3 font-medium text-gray-700">{o.id}</td>
              <td className="p-3 text-gray-700">{o.date}</td>
              <td className="p-3 text-gray-700">{o.customer}</td>
              <td className="p-3 text-gray-700">{o.items}</td>
              <td className="p-3 font-semibold text-gray-700">${o.total}</td>

              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  o.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : o.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {o.status === "Pending" ? t("statusPending") : o.status === "Delivered" ? t("statusDelivered") : o.status}
                </span>
              </td>

              <td className="p-3 text-gray-700">{o.payment}</td>

              <td className="p-3 space-x-2 text-gray-700">
                <button
                  onClick={() => onView(o)}
                  className="px-3 py-1 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors"
                >
                  {t("actionView")}
                </button>

                {o.status === "Pending" && (
                  <button className="px-3 py-1 bg-rose-500 text-rose-50 rounded cursor-pointer hover:bg-rose-600 transition-colors">
                    {t("actionCancel")}
                  </button>
                )}

                <button className="px-3 py-1 bg-slate-200 text-slate-700 rounded cursor-pointer hover:bg-slate-300 transition-colors">
                  {t("actionRefund")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}