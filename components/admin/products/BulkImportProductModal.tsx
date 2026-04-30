'use client';

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function BulkImportProductModal({ onClose, onSaved }: { onClose: () => void, onSaved?: () => void }) {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const headers = ["productid", "product_name", "categoryID", "supplierID", "stock", "price"];

  const downloadSample = () => {
    const csv = headers.join(",") + "\n" + "P001,Sample Product,1,1,100,25.00";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "sample_products.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError("");
    setCsvData([]);
    setIsUploaded(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const allLines = text.split(/\r?\n/).filter(line => line.trim() !== "");
      if (allLines.length === 0) {
        setError("File is empty");
        return;
      }

      const lines = allLines.map(line => line.split(",").map(cell => cell.trim()));
      const fileHeaders = lines[0];
      
      // Check if headers match (case-insensitive, trimmed)
      const isMatch = headers.length === fileHeaders.length && 
                      headers.every((h, i) => fileHeaders[i]?.toLowerCase() === h.toLowerCase());

      if (!isMatch) {
        setError(`Format mismatch. Expected columns: ${headers.join(", ")}`);
        return;
      }

      const dataRows = lines.slice(1).filter(line => line.length === headers.length);
      if (dataRows.length === 0) {
        setError("No data rows found after header");
        return;
      }

      setCsvData(dataRows);
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (csvData.length === 0) {
      setError("No data to upload");
      return;
    }

    setLoading(true);
    setError("");
    let successCount = 0;

    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i];
      const payload = {
        sku: row[0],
        name: row[1],
        categoryId: row[2] ? parseInt(row[2], 10) : undefined,
        primarySupplierId: row[3] ? parseInt(row[3], 10) : undefined,
        basePrice: row[5] || undefined,
      };

      try {
        const res = await apiFetch("/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (res.ok) successCount++;
      } catch (err) {
        console.error("Error uploading product:", err);
      }
      setProgress(Math.round(((i + 1) / csvData.length) * 100));
    }

    setLoading(false);
    if (successCount > 0) {
      setIsUploaded(true);
      if (onSaved) onSaved();
    } else {
      setError("Failed to upload any records.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl text-gray-700 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-black mb-1">
              Bulk Import Products
            </h2>
            {isUploaded && (
              <p className="text-emerald-600 font-medium flex items-center gap-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                Successfully uploaded {csvData.length} records
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {!isUploaded && (
          <>
            <p className="mb-3">Download sample CSV file structure:</p>

            <button
              onClick={downloadSample}
              className="w-64 px-4 py-2 bg-white text-slate-700 border border-slate-400 rounded mb-4 hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              Download Sample CSV
            </button>

            <p className="text-sm text-gray-600 mb-2">
              Note: Uploaded file must follow sample CSV structure.
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                <span className="truncate max-w-[200px]">{fileName || "Choose File"}</span>
                <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
              </label>
              {error && <p className="text-rose-500 text-sm font-semibold">{error}</p>}
            </div>
          </>
        )}

        {csvData.length > 0 && (
          <div className="flex-1 overflow-auto border border-gray-200 rounded-lg mb-4">
            <table className="w-full border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {headers.map((h) => (
                    <th key={h} className="p-2 border-b font-semibold text-gray-700 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 border-b last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="p-2 text-gray-600 whitespace-nowrap">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-gray-100">
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-sky-600 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
              <p className="text-xs text-center mt-1">Uploading... {progress}%</p>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button onClick={onClose} disabled={loading} className="px-4 py-2 border border-slate-300 text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg cursor-pointer transition-colors disabled:opacity-50">
              {isUploaded ? "Close" : "Cancel"}
            </button>
            {!isUploaded && (
              <button 
                onClick={handleUpload}
                disabled={csvData.length === 0 || loading}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${csvData.length > 0 && !loading ? 'bg-sky-500 text-sky-50 hover:bg-sky-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'}`}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}