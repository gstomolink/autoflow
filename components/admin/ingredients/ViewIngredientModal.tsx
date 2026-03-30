'use client';

export default function ViewIngredientModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        <h2 className="font-bold mb-4">Ingredient Details</h2>

        <p><b>Name:</b> {data.name}</p>
        <p><b>Unit:</b> {data.unit}</p>
        <p><b>Supplier:</b> {data.supplier}</p>
        <p><b>Stock:</b> {data.stock}</p>
        <p><b>Reorder:</b> {data.reorder}</p>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-sky-500 text-white px-4 py-2 rounded">Close</button>
        </div>

      </div>
    </div>
  );
}