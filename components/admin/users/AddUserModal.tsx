'use client';

export default function AddUserModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-gray-700">

        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Add User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {/* BASIC */}
        <input placeholder="Full Name *" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="Email *" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="Phone" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="Username" className="w-full border p-2 rounded mb-2"/>

        {/* PASSWORD */}
        <input placeholder="Password *" type="password" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="Confirm Password" type="password" className="w-full border p-2 rounded mb-2"/>

        {/* ROLE */}
        <select className="w-full border p-2 rounded mb-2">
          <option>Admin</option>
          <option>Manager</option>
        </select>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="border border-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
          <button className="bg-sky-500 text-sky-50 px-4 py-2 rounded">Save</button>
        </div>

      </div>
    </div>
  );
}