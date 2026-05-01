import PageShopScopeFilter from "@/components/layout/PageShopScopeFilter";
import { requestShopScopeApply } from "@/lib/shop-scope";

export type OrderFilterValues = {
  fromDate: string;
  toDate: string;
  status: string;
  paymentType: string;
};

type Props = {
  values: OrderFilterValues;
  onChange: (next: OrderFilterValues) => void;
  onSearch?: () => void;
};

export default function OrderFilters({ values, onChange, onSearch }: Props) {
  const patch = (partial: Partial<OrderFilterValues>) => {
    onChange({ ...values, ...partial });
  };

  const handleFromDateChange = (nextFrom: string) => {
    // keep the range valid: from date cannot be after to date
    if (values.toDate && nextFrom && nextFrom > values.toDate) {
      onChange({ ...values, fromDate: nextFrom, toDate: nextFrom });
      return;
    }
    patch({ fromDate: nextFrom });
  };

  const handleToDateChange = (nextTo: string) => {
    // keep the range valid: to date cannot be before from date
    if (values.fromDate && nextTo && nextTo < values.fromDate) {
      onChange({ ...values, fromDate: nextTo, toDate: nextTo });
      return;
    }
    patch({ toDate: nextTo });
  };

   return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-end gap-4">
      
      {/* Left side filters */}
      <div className="flex flex-wrap gap-3 flex-1 min-w-0">
        <PageShopScopeFilter mode="ops" />

        {/* From Date */}
        <div className="flex flex-col gap-1 min-w-[8.5rem]">
          <label className="text-sm text-gray-600">From Date</label>
          <input
            type="date"
            value={values.fromDate}
            max={values.toDate || undefined}
            onChange={(e) => handleFromDateChange(e.target.value)}
            className="h-10 w-full border px-3 py-2 rounded-lg border-gray-300 text-gray-700"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1 min-w-[8.5rem]">
          <label className="text-sm text-gray-600">To Date</label>
          <input
            type="date"
            value={values.toDate}
            min={values.fromDate || undefined}
            onChange={(e) => handleToDateChange(e.target.value)}
            className="h-10 w-full border px-3 py-2 rounded-lg border-gray-300 text-gray-700"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 min-w-[6.5rem]">
          <label className="text-sm text-gray-600">Status</label>
          <select
            value={values.status}
            onChange={(e) => patch({ status: e.target.value })}
            className="h-10 w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment Type */}
        <div className="flex flex-col gap-1 min-w-[6.5rem]">
          <label className="text-sm text-gray-600">Payment Type</label>
          <select
            value={values.paymentType}
            onChange={(e) => patch({ paymentType: e.target.value })}
            className="h-10 w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
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
      <div className="ml-auto">
        <button
          type="button"
          onClick={() => {
            requestShopScopeApply();
            onSearch?.();
          }}
          className="px-4 py-2 bg-sky-500 text-sky-50 rounded-lg cursor-pointer whitespace-nowrap hover:bg-sky-600 transition-colors"
        >
          Search
        </button>
      </div>

    </div>
  );
}