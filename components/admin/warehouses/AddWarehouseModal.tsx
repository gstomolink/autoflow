'use client';

export default function AddWarehouseModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Add New Warehouse
        </h2>

          <button onClick={onClose} className="cursor-pointer text-black items-center">
            ⨯
          </button>
        </div>

        <div className="space-y-3">
          <input placeholder="Warehouse ID" className="w-full border border-gray-300 p-2 rounded"/>
            <input placeholder="Warehouse Name" className="w-full border border-gray-300 p-2 rounded"/>
            <input placeholder="Full Address (e.g. 12/4 Main Street, Colombo)" className="w-full border border-gray-300 p-2 rounded"/>
            <input placeholder="Manager Name" className="w-full border border-gray-300 p-2 rounded"/>
            <input placeholder="Manager Contact Number" className="w-full border border-gray-300 p-2 rounded"/>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 border border-purple-600 text-purple-600 bg-purple-100 hover:bg-purple-200 rounded cursor-pointer">Cancel</button>
          <button className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded cursor-pointer">Save</button>
        </div>
      </div>
    </div>
  );
}