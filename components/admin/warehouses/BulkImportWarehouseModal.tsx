'use client';

import { useState } from "react";

export default function BulkImportWarehouseModal({ onClose }: { onClose: ()=>void }) {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const headers = ["name", "code", "address", "managerName", "contactPhone"];

  const downloadSample = () => {
    const csv = headers.join(",") + "\n" + "Main Warehouse,WH001,456 Depot Rd,Alice Smith,555-0200";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_warehouses.csv";
    a.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError("");
    setCsvData([]);

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
      
      const isValid = headers.every((h, i) => fileHeaders[i]?.toLowerCase() === h.toLowerCase());

      if (!isValid) {
        setError("error format not match");
        return;
      }

      setCsvData(lines.slice(1).filter(line => line.length === headers.length));
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (csvData.length === 0) {
      setError("No data to upload");
      return;
    }
    console.log("Uploading warehouses:", csvData);
    alert("Warehouses imported successfully (mocked)");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl text-gray-700 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
            Bulk Import Warehouses
          </h2>

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
          <label className="w-64 px-4 py-2 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors text-center inline-flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            <span className="truncate max-w-[200px]">{fileName || "Choose File"}</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
          </label>
          {error && <p className="text-rose-500 text-sm font-semibold">{error}</p>}
        </div>

        {csvData.length > 0 && (
          <div className="flex-1 overflow-auto border border-gray-200 rounded-lg mb-4">
            <table className="w-full text-sm text-left border-collapse">
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

        <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg cursor-pointer transition-colors">Cancel</button>
          <button 
            onClick={handleUpload}
            disabled={csvData.length === 0}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${csvData.length > 0 ? 'bg-sky-500 text-sky-50 hover:bg-sky-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
