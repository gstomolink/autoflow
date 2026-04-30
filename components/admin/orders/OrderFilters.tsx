export type OrderFilterValues = {
  fromDate: string;
  toDate: string;
  status: string;
  paymentType: string;
};

type Props = {
  values: OrderFilterValues;
  onChange: (next: OrderFilterValues) => void;
};

export default function OrderFilters({ values, onChange }: Props) {
  const patch = (partial: Partial<OrderFilterValues>) => {
    onChange({ ...values, ...partial });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">
      
      {/* Left side filters */}
      <div className="flex flex-wrap gap-4 flex-1">
        <input
          type="date"
          value={values.fromDate}
          onChange={(e) => patch({ fromDate: e.target.value })}
          className="border px-3 py-2 rounded-lg border-gray-300 text-gray-700"
        />
        <input
          type="date"
          value={values.toDate}
          onChange={(e) => patch({ toDate: e.target.value })}
          className="border px-3 py-2 rounded-lg border-gray-300 text-gray-700"
        />

        <select
          value={values.status}
          onChange={(e) => patch({ status: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        >
          <option value="">Status</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={values.paymentType}
          onChange={(e) => patch({ paymentType: e.target.value })}
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        >
          <option value="">Payment Type</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="cod">COD</option>
          <option value="wallet">Wallet</option>
        </select>
      </div>

      {/* Right side button */}
      <button
        type="button"
        onClick={() =>
          onChange({
            fromDate: "",
            toDate: "",
            status: "",
            paymentType: "",
          })
        }
        className="px-4 py-2 bg-sky-500 text-sky-50 rounded-lg cursor-pointer whitespace-nowrap hover:bg-sky-600 transition-colors"
      >
        Clear filters
      </button>

    </div>
  );
}