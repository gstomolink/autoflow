'use client';

type InvOrder = {
  orderNumber?: string;
  supplier?: { name?: string };
  lines?: Array<{
    quantityOrdered?: number;
    product?: { name?: string; sku?: string };
  }>;
  expectedDeliveryDate?: string | null;
};

export default function ProceedModal({
  data,
  onClose,
}: {
  data: InvOrder;
  onClose: () => void;
}) {
  const firstLine = data.lines?.[0];
  const productLabel = firstLine?.product?.name ?? firstLine?.product?.sku ?? "—";
  const totalQty =
    data.lines?.reduce((sum, line) => sum + Number(line.quantityOrdered ?? 0), 0) ?? 0;
  const delivery = data.expectedDeliveryDate
    ? String(data.expectedDeliveryDate).slice(0, 10)
    : "—";

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        <h2 className="font-bold mb-4">Confirm Order Creation</h2>

        <p><b>Order:</b> {data.orderNumber ?? "—"}</p>
        <p><b>Product:</b> {productLabel}</p>
        <p><b>Supplier:</b> {data.supplier?.name ?? "—"}</p>
        <p><b>Quantity:</b> {totalQty}</p>
        <p><b>Delivery:</b> {delivery}</p>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}