'use client';

export default function DisableUserModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm text-gray-700">

        <h2 className="font-bold mb-4">Confirm Action</h2>

        <p>Are you sure you want to disable this user?</p>
        <p className="mt-2"><b>{data.name}</b></p>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">Cancel</button>
          <button className="bg-rose-500 text-white px-4 py-2 rounded">Disable</button>
        </div>

      </div>
    </div>
  );
}