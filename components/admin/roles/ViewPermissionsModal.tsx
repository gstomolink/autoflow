'use client';

export default function ViewPermissionsModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-gray-700">

        <h2 className="font-bold mb-4">Permissions - {data.name}</h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <h3 className="font-semibold">Products</h3>
            <p>View, Create, Edit, Delete</p>
          </div>

          <div>
            <h3 className="font-semibold">Inventory</h3>
            <p>View, Adjust, Transfer</p>
          </div>

          <div>
            <h3 className="font-semibold">Orders</h3>
            <p>View, Create, Cancel</p>
          </div>

          <div>
            <h3 className="font-semibold">Users</h3>
            <p>Manage Users</p>
          </div>

        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-sky-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}