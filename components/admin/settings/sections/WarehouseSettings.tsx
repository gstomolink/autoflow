'use client';

export default function WarehouseSettings() {
  return (
    <div className="text-gray-700">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Warehouse / Store Settings
          </h2>
          <p className="text-sm text-gray-500">
            Manage warehouses, transfers, and default settings for stores.
          </p>
        </div>
      </div>

      <div className="grid gap-5 max-w-xl">

        {/* Enable Multi-Store */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" className="accent-sky-500" />
            Enable Multi-store
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Turn ON if you operate multiple warehouses or stores.
          </p>
        </div>

        {/* Default Warehouse */}
        <div>
          <label className="block font-medium mb-1">
            Default Warehouse
          </label>
          <select className="w-full border border-gray-300 p-2 rounded">
            <option>Main Warehouse</option>
            <option>Warehouse 2</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Select the default warehouse for stock assignments.
          </p>
        </div>

        {/* Allow Transfers */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" className="accent-sky-500" />
            Allow Transfers Between Warehouses
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Enable internal stock transfers between warehouses.
          </p>
        </div>

        {/* Warehouse Capacity */}
        <div>
          <label className="block font-medium mb-1">
            Warehouse Max Capacity (units)
          </label>
          <input
            type="number"
            placeholder="e.g. 10000"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum stock allowed for this warehouse.
          </p>
        </div>

        {/* Assign Manager */}
        <div>
          <label className="block font-medium mb-1">
            Assign Warehouse Manager
          </label>
          <select className="w-full border border-gray-300 p-2 rounded">
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Manager responsible for this warehouse.
          </p>
        </div>

        {/* Low Stock Alerts */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" className="accent-sky-500" />
            Enable Low Stock Alerts
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Notify when stock goes below minimum level in warehouse.
          </p>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-medium mb-1">Notes / Comments</label>
          <textarea
            placeholder="Optional warehouse notes"
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
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