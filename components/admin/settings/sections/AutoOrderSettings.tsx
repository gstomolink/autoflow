'use client';

export default function AutoOrderSettings() {
  return (
    <div className="text-gray-700">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Auto Order Settings
          </h2>
          <p className="text-sm text-gray-500">
            Configure automatic purchasing, forecasting, and approval workflow.
          </p>
        </div>
      </div>

      <div className="grid gap-5 max-w-xl">

        {/* Enable Auto Order */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" className="accent-sky-500" />
            Enable Auto Ordering
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Automatically generate purchase orders based on stock levels and forecasts.
          </p>
        </div>

        {/* Forecast Settings */}
        <div>
          <label className="block font-medium mb-1">
            Forecast Days
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Number of days ahead the system predicts demand.
          </p>
          <input
            type="number"
            placeholder="e.g. 30"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" className="accent-sky-500" />
            Use Average Consumption
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Use past consumption data to calculate future demand.
          </p>
        </div>

        {/* Approval Rules */}
        <div>
          <label className="block font-medium mb-2">
            Approval Rules
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-sky-500" />
            Require Manager Approval
          </label>

          <p className="text-xs text-gray-500 mt-1">
            Orders must be approved before sending to suppliers.
          </p>
        </div>

        {/* Supplier Automation */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" className="accent-sky-500" />
            Auto-send to Supplier
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Automatically send purchase orders after approval.
          </p>
        </div>

        {/* Formula Info (Optional but professional) */}
        <div className="bg-gray-50 border border-gray-200 p-3 rounded">
          <p className="text-sm font-medium mb-1">Calculation Formula</p>
          <p className="text-xs text-gray-600">
            Suggested Order = Forecast Demand + Safety Stock − Current Stock
          </p>
        </div>

      </div>
            {/* Save Button */}
        <div className="pt-4 flex justify-end">
          <button className="bg-sky-500 text-white px-6 py-2 rounded hover:bg-sky-600 transition align-right">
            Save Settings
          </button>
        </div>
    </div>
  );
}