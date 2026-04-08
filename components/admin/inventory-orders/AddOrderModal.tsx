'use client';

export default function AddOrderModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-gray-700">

        <div className="flex justify-between mb-4">
          <h2 className="font-bold ">Add Manual Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">

          <select className="w-full border border-gray-300 text-gray-700 p-2 rounded">
            <option>Select Product</option>
          </select>

          <input type="date" className="w-full border border-gray-300 text-gray-700 p-2 rounded" />

          <input placeholder="Ordered Quantity" className="w-full border border-gray-300 text-gray-700 p-2 rounded" />

          <textarea placeholder="Notes" className="w-full border border-gray-300 text-gray-700 p-2 rounded" />
        </div>

        <div className="flex gap-2 mt-4">
          <button className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer">
            Save & Proceed
          </button>
        </div>
      </div>
    </div>
  );
}