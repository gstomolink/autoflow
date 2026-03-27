'use client';

export default function ViewCategoryModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Category Details
        </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        

        <div className="space-y-2 text-sm ttext-gray-700">
          <p className="text-gray-700"><b>ID:</b> {data.id}</p>
          <p className="text-gray-700"><b>Name:</b> {data.name}</p>
          <p className="text-gray-700"><b>Description:</b> {data.description}</p>
          <p className="text-gray-700"><b>Products:</b> {data.count}</p>
          <p className="text-gray-700"><b>Created:</b> {data.created}</p>
          <p className="text-gray-700"><b>Status:</b> {data.status}</p>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-600 rounded hover:bg-slate-300 transition-colors cursor-pointer border border-slate-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}