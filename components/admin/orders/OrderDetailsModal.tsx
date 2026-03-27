'use client';

type Props = {
  order: any;
  onClose: () => void;
};

export default function OrderDetailsModal({ order, onClose }: Props) {
  const items = [
    { name: "Wireless Mouse", qty: 1, price: 40 },
    { name: "Keyboard", qty: 1, price: 80 },
    { name: "Headset", qty: 1, price: 120 },
  ];

  const subtotal = 240;
  const discount = 20;
  const tax = 10;
  const total = subtotal - discount + tax;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-black mb-4">
          Order Details — {order.id}
        </h2>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-black">Order Items</h3>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between bg-gray-50 p-2 rounded text-gray-700">
                <span>{item.name} × {item.qty}</span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-black">Pricing</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span><span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Discount</span><span>-${discount}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax</span><span>${tax}</span>
            </div>
            <div className="flex justify-between font-bold text-black">
              <span>Total</span><span>${total}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-black">Payment Details</h3>
          <p className="text-gray-700">Method: Credit Card</p>
          <p className="text-gray-700">Status: Paid</p>
          <p className="text-gray-700">Transaction ID: TXN123456</p>
        </div>

        {/* Customer */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-black">Customer Info</h3>
          <p className="text-gray-700">Name: {order.customer}</p>
          <p className="text-gray-700">Email: john@example.com</p>
          <p className="text-gray-700">Phone: +1 234 567 890</p>
          <p className="text-gray-700">Address: 123 Main Street, NY</p>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-black">Order Timeline</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Order Placed</li>
            <li>Payment Confirmed</li>
            <li>Processing</li>
            <li>Shipped</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            Refund
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Print Invoice
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-100 text-purple-600 border border-purple-100 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}