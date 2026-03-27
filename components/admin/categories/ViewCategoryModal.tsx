'use client';

export default function ViewCategoryModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Category Details
        </h2>

          <button onClick={onClose} className="cursor-pointer text-black items-center mb-4">
            ⨯
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
          <button onClick={onClose} className="px-4 py-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 cursor-pointer border border-purple-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}