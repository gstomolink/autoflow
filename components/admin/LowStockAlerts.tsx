const items = [
  { name: 'Laptop Stand', stock: 4 },
  { name: 'Mechanical Keyboard', stock: 2 },
  { name: 'USB Hub', stock: 5 },
];

export default function LowStockAlerts() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-rose-100">
      <h2 className="text-lg font-bold text-rose-600 mb-4">Low Stock Alerts</h2>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-rose-50 px-3 py-2 rounded-lg"
          >
            <span className="text-gray-700">{item.name}</span>
            <span className="font-semibold text-rose-600">
              {item.stock} left
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}