'use client';

import { useState } from "react";

export default function BulkImportProductModal({ onClose }: { onClose: ()=>void }) {
  const [importType, setImportType] = useState<"existing" | "manual">("existing");

  const downloadSample = () => {
    const csv = "Product ID,Name,Category,Price,Supplier ID\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_products.csv";
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg text-gray-700">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Bulk Import Products</h2>
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

        {/* Radio Buttons */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Select Import Type:</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="importType"
                value="existing"
                checked={importType === "existing"}
                onChange={() => setImportType("existing")}
                className="cursor-pointer"
              />
              Existing System
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="importType"
                value="manual"
                checked={importType === "manual"}
                onChange={() => setImportType("manual")}
                className="cursor-pointer"
              />
              Manual Import
            </label>
          </div>
        </div>

        {/* Manual Import Section */}
        {importType === "manual" && (
          <>
            <p className="mb-3">Download sample CSV file structure:</p>
            <button
              onClick={downloadSample}
              className="w-64 px-4 py-2 bg-white text-slate-700 border border-slate-400 rounded mb-4 hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              Download Sample CSV
            </button>

            <p className="text-sm text-gray-600 mb-2">
              Note: Uploaded file must follow sample CSV structure.
            </p>

            <input
              type="file"
              accept=".csv"
              className="w-64 mb-4 p-2 text-sky-50 border bg-sky-500 hover:bg-sky-600 rounded cursor-pointer transition-colors"
            />
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-sky-500 text-sky-50 rounded-lg hover:bg-sky-600 cursor-pointer transition-colors"
          >
            {importType === "manual" ? "Upload" : "Import"}
          </button>
        </div>
      </div>
    </div>
  );
}