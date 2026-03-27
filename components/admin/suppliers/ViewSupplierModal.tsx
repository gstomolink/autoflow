'use client';

export default function ViewSupplierModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-gray-700">

        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Supplier Details</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Supplier Info */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Supplier Info</h3>
          <p><b>Name:</b> {data.name}</p>
          <p><b>Contact:</b> {data.contact}</p>
          <p><b>Email:</b> {data.email}</p>
          <p><b>Address:</b> {data.address}</p>
        </div>

        {/* Purchase History */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Purchase History</h3>
          <p>No purchases yet</p>
        </div>

        {/* Outstanding */}
        <div>
          <h3 className="font-semibold mb-2">Outstanding Payments</h3>
          <p>$0.00</p>
        </div>

      </div>
    </div>
  );
}