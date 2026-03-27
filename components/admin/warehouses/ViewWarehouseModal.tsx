'use client';

export default function ViewWarehouseModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
       <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Warehouse Details
        </h2>

          <button onClick={onClose} className="cursor-pointer text-black items-center">
            ⨯
          </button>
        </div>

        <div className="space-y-2">
          <p><b>Name:</b> {data.name}</p>
          <p><b>Address:</b> {data.address}</p>
          <p><b>Manager:</b> {data.manager}</p>
          <p><b>Contact:</b> {data.contact}</p>
          <p><b>Status:</b> {data.status}</p>
          
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 border border-purple-600 text-purple-600 bg-purple-100 hover:bg-purple-200 rounded cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}