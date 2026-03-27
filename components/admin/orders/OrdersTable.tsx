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
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 text-black text-sm">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Items</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Actions</th>
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
                  {o.status}
                </span>
              </td>

              <td className="p-3 text-gray-700">{o.payment}</td>

              <td className="p-3 space-x-2 text-gray-700">
                <button
                  onClick={() => onView(o)}
                  className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                >
                  View
                </button>

                {o.status === "Pending" && (
                  <button className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer">
                    Cancel
                  </button>
                )}

                <button className="px-3 py-1 bg-purple-600 text-white rounded cursor-pointer">
                  Refund
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}