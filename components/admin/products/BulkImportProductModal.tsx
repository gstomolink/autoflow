'use client';

export default function BulkImportProductModal({ onClose }: { onClose: ()=>void }) {

  const downloadSample = () => {
    const csv = "productid,product_name,categoryID,supplierID,stock,price";
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
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
          Bulk Import Products
        </h2>

          <button onClick={onClose} className="cursor-pointer text-black items-center">
            ⨯
          </button>
        </div>

        <p className="mb-3">Download sample CSV file structure:</p>

        <button
          onClick={downloadSample}
          className="w-54 px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded mb-4 cursor-pointer"
        >
          Download Sample CSV
        </button>

        <p className="text-sm text-gray-600 mb-2">
          Note: Uploaded file must follow sample CSV structure.
        </p>

        <input type="file" accept=".csv" className="w-54 mb-4 p-2 text-white border bg-blue-600 hover:bg-blue-700 rounded cursor-pointer" />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-100 rounded-lg cursor-pointer">Cancel</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">Upload</button>
        </div>
      </div>
    </div>
  );
}