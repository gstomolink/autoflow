'use client';

export default function InventorySettings() {
  return (
    <div className="text-gray-700">

      {/* Heading */}
      <h2 className="text-lg font-bold mb-1 text-gray-800">
        Inventory Settings
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Configure stock behavior, reorder rules, and expiry tracking.
      </p>

      <div className="grid gap-5 max-w-xl">

        {/* Stock Rules */}
        <div>
          <label className="block font-medium mb-2">Stock Rules</label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-sky-500" />
            Allow Negative Stock
          </label>

          <p className="text-xs text-gray-500 mt-1">
            If enabled, system allows stock to go below zero.
          </p>
        </div>

        {/* Reorder Settings */}
        <div>
          <label className="block font-medium mb-1">
            Default Reorder Level
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Minimum stock level before triggering reorder alerts.
          </p>
          <input
            type="number"
            placeholder="e.g. 50"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Safety Stock (%)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Extra buffer stock percentage to avoid shortages.
          </p>
          <input
            type="number"
            placeholder="e.g. 10"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Expiry Settings */}
        <div>
          <label className="block font-medium mb-2">
            Expiry Settings
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-sky-500" />
            Enable Expiry Tracking
          </label>

          <p className="text-xs text-gray-500 mt-1">
            Track product expiry dates and manage expiring stock.
          </p>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Alert Before Expiry (Days)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Number of days before expiry to send alerts.
          </p>
          <input
            type="number"
            placeholder="e.g. 7"
            className="w-full border border-gray-300 p-2 rounded"
          />
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