'use client';

export default function EditUserModal({
  onClose,
}: {
  data: unknown;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <h2 className="font-bold mb-2">Edit user</h2>
        <p className="text-sm text-slate-600">
          Role and permission editing is fixed at the database level (role ids 1–3). Use the API or database for changes beyond this UI.
        </p>
        <div className="flex justify-end mt-4">
          <button type="button" onClick={onClose} className="bg-sky-500 text-sky-50 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
