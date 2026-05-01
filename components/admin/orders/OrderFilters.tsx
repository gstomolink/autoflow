export type OrderFilterValues = {
  fromDate: string;
  toDate: string;
  status: string;
  paymentType: string;
};

type Props = {
  values: OrderFilterValues;
  onChange: (next: OrderFilterValues) => void;
  onSearch: () => void;
};

export default function OrderFilters({ values, onChange, onSearch }: Props) {
  const patch = (partial: Partial<OrderFilterValues>) => {
    onChange({ ...values, ...partial });
  };

   return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">
      
      {/* Left side filters */}
      <div className="flex flex-wrap gap-4 flex-1">

        {/* From Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">From Date</label>
          <input
            type="date"
            value={values.fromDate}
            onChange={(e) => patch({ fromDate: e.target.value })}
            className="border px-3 py-2 rounded-lg border-gray-300 text-gray-700"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">To Date</label>
          <input
            type="date"
            value={values.toDate}
            onChange={(e) => patch({ toDate: e.target.value })}
            className="border px-3 py-2 rounded-lg border-gray-300 text-gray-700"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Status</label>
          <select
            value={values.status}
            onChange={(e) => patch({ status: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment Type */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Payment Type</label>
          <select
            value={values.paymentType}
            onChange={(e) => patch({ paymentType: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
          >
            <option value="">All</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
            <option value="cod">COD</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>

      </div>


      {/* Right side Search button */}
      <button
        type="button"
        onClick={onSearch}
        className="px-4 py-2 bg-sky-500 text-sky-50 rounded-lg cursor-pointer whitespace-nowrap hover:bg-sky-600 transition-colors"
      >
        Search
      </button>

    </div>
  );
}