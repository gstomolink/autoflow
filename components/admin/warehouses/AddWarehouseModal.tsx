'use client';

export default function AddWarehouseModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Add New Warehouse
        </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
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
          <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-slate-600 bg-slate-200 hover:bg-slate-300 rounded cursor-pointer transition-colors">Cancel</button>
          <button className="px-4 py-2 bg-sky-500 text-sky-50 hover:bg-sky-600 rounded cursor-pointer transition-colors">Save</button>
        </div>
      </div>
    </div>
  );
}