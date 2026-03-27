export default function OrderFilters() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">
      
      {/* Left side filters */}
      <div className="flex flex-wrap gap-4 flex-1">
        <input
          type="date"
          className="border px-3 py-2 rounded-lg border-gray-300 text-gray-700"
        />
        <input
          type="date"
          className="border px-3 py-2 rounded-lg border-gray-300 text-gray-700"
        />

        <select className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700">
          <option>Status</option>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <select className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700">
          <option>Payment Type</option>
          <option>Card</option>
          <option>UPI</option>
          <option>COD</option>
          <option>Wallet</option>
        </select>
      </div>

      {/* Right side button */}
      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer whitespace-nowrap">
        Apply Filters
      </button>

    </div>
  );
}