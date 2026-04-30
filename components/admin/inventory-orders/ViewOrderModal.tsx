'use client';

import { inventoryOrderStatusLabel } from "@/lib/inventory-order-statuses";

type Line = {
  id: number;
  quantityOrdered: number;
  unitCost: string;
  product?: { name: string; sku: string };
};

type InvOrder = {
  id: number;
  orderNumber: string;
  status: string;
  expectedDeliveryDate: string | null;
  supplier?: { name: string };
  lines?: Line[];
};

export default function ViewOrderModal({
  data,
  onClose,
}: {
  data: InvOrder;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 text-gray-700">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Order Details</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <p><b>Order:</b> {data.orderNumber}</p>
        <p><b>Supplier:</b> {data.supplier?.name ?? "—"}</p>
        <p><b>Status:</b> {inventoryOrderStatusLabel(data.status)}</p>
        <p><b>Expected delivery:</b> {data.expectedDeliveryDate ? String(data.expectedDeliveryDate).slice(0, 10) : "—"}</p>

        <h3 className="font-semibold mt-4 mb-2">Products</h3>
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Product</th>
              <th className="p-2">SKU</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Unit</th>
            </tr>
          </thead>
          <tbody>
            {(data.lines ?? []).map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-2">{l.product?.name ?? "—"}</td>
                <td className="p-2">{l.product?.sku ?? "—"}</td>
                <td className="p-2">{l.quantityOrdered}</td>
                <td className="p-2">{l.unitCost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
