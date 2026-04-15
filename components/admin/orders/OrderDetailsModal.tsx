'use client';

type Line = {
  id: number;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
  product?: { name: string; sku: string };
};

type Order = {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  status: string;
  paymentStatus: string;
  totalAmount: string;
  lines?: Line[];
};

export default function OrderDetailsModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const lines = order.lines ?? [];
  const total = Number(order.totalAmount);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-black mb-4">
          Order Details — {order.orderNumber}
        </h2>

        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <p><b>Customer:</b> {order.customerName}</p>
          <p><b>Email:</b> {order.customerEmail ?? "—"}</p>
          <p><b>Phone:</b> {order.customerPhone ?? "—"}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Payment:</b> {order.paymentStatus}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-black">Order Items</h3>
          <div className="space-y-2">
            {lines.map((item) => (
              <div key={item.id} className="flex justify-between bg-gray-50 p-2 rounded text-gray-700">
                <span>{item.product?.name ?? "Product"} × {item.quantity}</span>
                <span>${Number(item.lineTotal).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-end mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-sky-500 text-sky-50 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
