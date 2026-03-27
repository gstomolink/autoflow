const products = [
  { name: 'Wireless Headphones', sales: 320 },
  { name: 'Smart Watch', sales: 250 },
  { name: 'Gaming Mouse', sales: 210 },
  { name: 'Bluetooth Speaker', sales: 180 },
];

export default function TopProducts() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Top Products</h2>

      <div className="space-y-3">
        {products.map((p, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-gray-700">{p.name}</span>
            <span className="font-semibold text-purple-600">
              {p.sales} sales
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}