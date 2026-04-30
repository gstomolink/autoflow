'use client';

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function BulkImportCategoryModal({ onClose, onSaved }: { onClose: () => void, onSaved?: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  const headers = ["Category ID", "Category Name", "Description", "Status"];

  const downloadSample = () => {
    const csv = headers.join(",") + "\n" + "C001,Electronics,Electronic items,Active";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "sample_categories.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError("");
    setIsUploaded(false);
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected");
      return;
    }
    
    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const r = await apiFetch("/categories/bulk-upload", {
        method: "POST",
        body: formData,
      });

      if (!r.ok) {
        throw new Error("Upload failed on the server");
      }

      const responseData = await r.json();
      
      if (responseData.successCount === 0) {
        setError("Failed to upload any records. Ensure the CSV format is correct.");
        return;
      }
      
      setSuccessCount(responseData.successCount);
      setIsUploaded(true);
      if (onSaved) onSaved();
    } catch (err) {
      setError("Upload failed");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4 text-gray-700">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl flex flex-col max-h-[90vh] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-black mb-1">
              Bulk Import Categories
            </h2>
            {isUploaded && (
              <p className="text-emerald-600 font-medium flex items-center gap-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                Successfully uploaded {successCount} records
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
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

        {!isUploaded && (
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              <span className="whitespace-nowrap">Download Sample CSV</span>
            </button>

            <p className="text-sm text-gray-600 mb-4">
              Note: Uploaded file must follow the sample CSV structure.
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <label className="block text-sm text-gray-700 mb-1">
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
                <span className="truncate max-w-[200px]">{file ? file.name : "Choose File"}</span>
              </label>
              <input id="categoryCsvFile" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
              {error && <p className="text-rose-500 text-sm font-semibold">{error}</p>}
            </div>
          </>
        )}

        )

        <div className="flex justify-end gap-3 mt-auto pt-2 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-600 border border-slate-300 hover:bg-slate-300 rounded transition-colors cursor-pointer">
            {isUploaded ? "Close" : "Cancel"}
          </button>
          {!isUploaded && (
            <button 
              onClick={handleUpload}
              disabled={!file || isUploading}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${file && !isUploading ? 'bg-sky-500 text-sky-50 hover:bg-sky-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}