export default function RecentOrders() {
  const orders = [
    { id: "#1024", date: "2026-03-10", amount: "$120", status: "Delivered" },
    { id: "#1025", date: "2026-03-11", amount: "$80", status: "Shipped" },
    { id: "#1026", date: "2026-03-12", amount: "$45", status: "Pending" },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <h3 className="font-semibold mb-4 text-black">Recent Orders</h3>
      <table className="w-full text-sm text-black">
        <thead className="text-black">
          <tr>
            <th className="text-left py-2 ">Order ID</th>
            <th className="text-left">Date</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="py-2">{o.id}</td>
              <td>{o.date}</td>
              <td>{o.amount}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}