'use client';

export default function BulkImportCategoryModal({ onClose }: any) {
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">
            Bulk Import Categories
          </h2>

          <button onClick={onClose} className="cursor-pointer text-black">
            ⨯
          </button>
        </div>

        <button
          onClick={downloadSample}
          className=" w-54 px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded mb-4 cursor-pointer"
        >
          Download Sample CSV
        </button>

        <p className="text-sm text-gray-600 mb-4">
          Note: Uploaded file must follow the sample CSV structure.
        </p>

        <input type="file" accept=".csv" className="w-54 mb-4 p-2 text-white border bg-blue-600 hover:bg-blue-700 rounded cursor-pointer" />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-purple-100 text-purple-600 border border-purple-600 hover:bg-purple-200 rounded cursor-pointer">
            Cancel
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}