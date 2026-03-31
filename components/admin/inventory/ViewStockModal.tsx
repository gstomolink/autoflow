'use client';

export default function ViewStockModal({ data, onClose }: any) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[500px] p-6 rounded-xl relative">

        <button onClick={onClose} className="absolute top-3 right-3 text-xl">✕</button>

        <h2 className="text-xl font-bold mb-4">View Item</h2>

        <div className="grid grid-cols-2 gap-4">
          <div><strong>ID:</strong> {data.id}</div>
          <div><strong>Name:</strong> {data.name}</div>
          <div><strong>Stock:</strong> {data.stock}</div>
          <div><strong>Unit:</strong> {data.unit}</div>
          <div><strong>Supplier:</strong> {data.supplier}</div>
          <div><strong>Expiry:</strong> {data.expiry}</div>
          <div><strong>Cost:</strong> Rs.{data.cost}</div>
        </div>

      </div>
    </div>
  );
}