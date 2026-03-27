'use client';

export default function ProceedModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        <h2 className="font-bold mb-4">Confirm Order Creation</h2>

        <p><b>Product:</b> {data.product}</p>
        <p><b>Supplier:</b> {data.supplier}</p>
        <p><b>Quantity:</b> {data.ordered}</p>
        <p><b>Delivery:</b> {data.date}</p>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}