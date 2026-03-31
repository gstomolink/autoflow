'use client';

import { useState } from "react";

export default function BulkImportCategoryModal({ onClose }: any) {
  const [importType, setImportType] = useState<"existing" | "manual">("existing");

  const downloadSample = () => {
    const csv = "Category ID,Category Name,Description,Status\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_categories.csv";
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">
            Bulk Import Categories
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Radio Buttons */}
        <div className="mb-6 text-gray-700">
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
            <button
              onClick={downloadSample}
              className="w-64 px-4 py-2 bg-white text-slate-700 border border-slate-400 rounded mb-4 hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              <span className="whitespace-nowrap">Download Sample CSV</span>
            </button>

            <p className="text-sm text-gray-600 mb-4">
              Note: Uploaded file must follow the sample CSV structure.
            </p>

            <label
              htmlFor="categoryCsvFile"
              className="w-64 mb-4 px-4 py-2 text-sky-50 border bg-sky-500 hover:bg-sky-600 rounded cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
                aria-hidden="true"
              >
                
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              <span>Choose File</span>
            </label>
            <input id="categoryCsvFile" type="file" accept=".csv" className="hidden" />
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-600 border border-slate-300 hover:bg-slate-300 rounded transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 transition-colors cursor-pointer"
          >
            {importType === "manual" ? "Upload" : "Import"}
          </button>
        </div>
      </div>
    </div>
  );
}