'use client';

export default function ViewUserModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        <h2 className="font-bold mb-4">User Details</h2>

        <p><b>Name:</b> {data.name}</p>
        <p><b>Email:</b> {data.email}</p>
        <p><b>Phone:</b> {data.phone}</p>
        <p><b>Role:</b> {data.role}</p>
        <p><b>Warehouse:</b> {data.warehouse}</p>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-sky-500 text-white px-4 py-2 rounded">Close</button>
        </div>

      </div>
    </div>
  );
}