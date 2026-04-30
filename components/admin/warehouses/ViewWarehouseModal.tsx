'use client';

type Row = {
  id: number;
  name: string;
  code: string;
  address: string | null;
  managerName: string | null;
  contactPhone: string | null;
};

export default function ViewWarehouseModal({
  data,
  onClose,
}: {
  data: Row;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Warehouse Details</h2>
          <button type="button" onClick={onClose} className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <p><b>ID:</b> {data.id}</p>
          <p><b>Code:</b> {data.code}</p>
          <p><b>Name:</b> {data.name}</p>
          <p><b>Address:</b> {data.address ?? "—"}</p>
          <p><b>Manager:</b> {data.managerName ?? "—"}</p>
          <p><b>Contact:</b> {data.contactPhone ?? "—"}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-sky-500 text-sky-50 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}
