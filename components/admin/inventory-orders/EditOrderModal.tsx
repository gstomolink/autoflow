'use client';

export default function EditOrderModal({
  onClose,
}: {
  data: unknown;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md text-gray-700">
        <h2 className="font-bold mb-2">Edit order</h2>
        <p className="text-sm text-slate-600">Line-item editing is not exposed in the API yet. Delete and recreate the order if needed.</p>
        <button type="button" onClick={onClose} className="mt-4 bg-sky-500 text-sky-50 px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
