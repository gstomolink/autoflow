'use client';

export default function RoleFormModal({ onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl text-gray-700">

        <h2 className="font-bold mb-4">Create Role</h2>

        <input placeholder="Role Name" className="w-full border p-2 rounded mb-2"/>
        <textarea placeholder="Description" className="w-full border p-2 rounded mb-4"/>

        {/* PERMISSIONS */}
        <h3 className="font-semibold mb-2">Permissions</h3>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="font-medium">Products</p>
            <label><input type="checkbox"/> View</label><br/>
            <label><input type="checkbox"/> Create</label><br/>
            <label><input type="checkbox"/> Edit</label><br/>
            <label><input type="checkbox"/> Delete</label>
          </div>

          <div>
            <p className="font-medium">Inventory</p>
            <label><input type="checkbox"/> View</label><br/>
            <label><input type="checkbox"/> Adjust</label><br/>
            <label><input type="checkbox"/> Transfer</label>
          </div>

        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded">Save</button>
        </div>

      </div>
    </div>
  );
}