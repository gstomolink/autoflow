'use client';

export default function AutomatedOrdersTable() {
  const data = [
    {
      product: "Laptop",
      sku: "LAP-01",
      stock: 5,
      reorder: 20,
      sales: 30,
      forecast: 40,
      suggested: 35,
      supplier: "ABC Traders",
    },
    {
      product: "Headphones",
      sku: "HP-01",
      stock: 9,
      reorder: 50,
      sales: 50,
      forecast: 40,
      suggested: 55,
      supplier: "XYZ Supplies",
    },
  ];

  return (
    <table className="w-full bg-white rounded shadow text-gray-700">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Product</th>
          <th className="p-2">SKU</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Reorder</th>
          <th className="p-2">Avg Sales</th>
          <th className="p-2">Forecast</th>
          <th className="p-2">Suggested</th>
          <th className="p-2">Supplier</th>
        </tr>
      </thead>

      <tbody>
        {data.map((d, i) => (
          <tr key={i} className="border-t border-gray-200">
            <td className="p-2">{d.product}</td>
            <td className="p-2">{d.sku}</td>
            <td className="p-2">{d.stock}</td>
            <td className="p-2">{d.reorder}</td>
            <td className="p-2">{d.sales}</td>
            <td className="p-2">{d.forecast}</td>
            <td className="p-2">{d.suggested}</td>
            <td className="p-2">{d.supplier}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}