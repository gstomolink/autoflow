'use client';

type Step = {
  id: number;
  label: string;
  completed: boolean;
};

const steps: Step[] = [
  { id: 1, label: 'Order Placed', completed: true },
  { id: 2, label: 'Packed', completed: true },
  { id: 3, label: 'Shipped', completed: true },
  { id: 4, label: 'Out for Delivery', completed: false },
  { id: 5, label: 'Delivered', completed: false },
];

export default function OrderTrackingPage() {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Track Your Order</h1>
        <p className="text-gray-500 mt-1">
          Stay updated with real-time delivery progress and location 🚚
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white border rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-8">Delivery Progress</h2>

        <div className="flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" />

          {/* Active Progress Line */}
          <div
            className="absolute top-5 left-0 h-1 bg-purple-600 transition-all"
            style={{
              width: `${(steps.filter((s) => s.completed).length - 1) * (100 / (steps.length - 1))}%`,
            }}
          />

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center w-full">
              {/* Circle */}
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border-2
                  ${
                    step.completed
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
              >
                {step.id}
              </div>

              {/* Label */}
              <p
                className={`mt-2 text-sm font-medium text-center
                  ${step.completed ? 'text-purple-700' : 'text-gray-400'}`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div> <br />

      {/* Map + Order Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Map */}
        <div className="lg:col-span-2 bg-gray-100 rounded-xl overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps?q=New+York&output=embed"
            width="100%"
            height="350"
            loading="lazy"
          />
        </div>

        {/* Order Details */}
        <div className="bg-white border rounded-xl shadow p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Details</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID</span>
              <span className="font-medium">#ORD-2026-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customer</span>
              <span className="font-medium">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Items</span>
              <span className="font-medium">3 Products</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-medium text-purple-600">$250.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment</span>
              <span className="font-medium text-green-600">Paid</span>
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="font-semibold text-gray-800">
              28 March 2026 • 04:30 PM
            </p>
          </div>
        </div>
      </div>

      

      {/* Order Items */}
      <div className="bg-white border rounded-xl shadow p-6 mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Items in This Order</h2>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 border rounded-lg p-3">
              <img
                src="/logo.png"
                alt="Product"
                className="h-16 w-16 object-contain bg-gray-50 rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Product Name {item}</p>
                <p className="text-sm text-gray-500">Qty: 1</p>
              </div>
              <p className="font-semibold text-purple-600">$80.00</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}