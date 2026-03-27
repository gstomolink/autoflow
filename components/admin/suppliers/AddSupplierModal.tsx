'use client';

export default function AddSupplierModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Add Supplier</h2>
          <button onClick={onClose} className="cursor-pointer text-black items-center mb-4">⨯</button>
        </div>

        <div className="space-y-3">
          <input placeholder="Supplier ID" className="w-full border p-2 rounded"/>
          <input placeholder="Name" className="w-full border p-2 rounded"/>
          <input placeholder="Contact" className="w-full border p-2 rounded"/>
          <input placeholder="Email" className="w-full border p-2 rounded"/>
          <input placeholder="Address" className="w-full border p-2 rounded"/>
        </div>

        <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
}