'use client';

export default function ViewOrderModal({ data, onClose }: any) {
  const totalCost = (data.ordered || 0) * (data.unitCost || 0);

  const Row = ({ label, value }: any) => (
    <div className="flex justify-between border-b py-1">
      <span className="font-medium text-gray-600">{label}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 text-gray-700">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* DETAILS */}
        <p><b>Order ID:</b> {data.id}</p>
        <p><b>Product:</b> {data.product}</p>
        <p><b>SKU:</b> {data.sku}</p>
        <p><b>Supplier:</b> {data.supplier}</p>
        <p><b>Current Stock:</b> {data.stock}</p>
        <p><b>Reorder Level:</b> {data.reorder}</p>
        <p><b>Suggested Quantity:</b> {data.suggested}</p>
        <p><b>Ordered Quantity:</b> {data.ordered}</p>
        <p><b>Unit Cost:</b> ${data.unitCost || 0}</p>
        <p><b>Total Cost:</b> ${totalCost}</p>
        <p><b>Expected Delivery:</b> {data.date}</p>
        <p><b>Status:</b> {data.status}</p>

        {/* OPTIONAL NOTES */}
        {data.notes && (
          <p><b>Notes:</b> {data.notes}</p>
        )}

        {/* ACTION */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}