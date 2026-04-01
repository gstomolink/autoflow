'use client';

import { useState } from "react";

type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: "Active" | "Inactive";
};

const initialSuppliers: Supplier[] = [
  { id: "SUP001", name: "ABC Traders", contact: "011-1234567", email: "abc@example.com", status: "Active" },
  { id: "SUP002", name: "XYZ Supplies", contact: "011-7654321", email: "xyz@example.com", status: "Active" },
];

export default function SupplierSettings() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);

  return (
    <div className="text-gray-700">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Supplier Settings</h2>
          <p className="text-sm text-gray-500">
            Configure default supplier options, lead times, selection rules, and manage registered suppliers.
          </p>
        </div>
         </div>

      {/* Supplier Settings Options */}
      <div className="grid gap-5 max-w-xl mb-6">

        <div>
          <label className="block font-medium mb-1">Default Lead Time (days)</label>
          <input type="number" placeholder="e.g. 3" className="w-full border border-gray-300 p-2 rounded" />
          <p className="text-xs text-gray-500 mt-1">
            Number of days suppliers need to deliver products by default.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" className="accent-sky-500" />
            Allow Multiple Suppliers per Product
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Enable if ingredients/products can have more than one supplier.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" className="accent-sky-500" />
            Auto Select Cheapest Supplier
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Automatically select the supplier with the lowest cost when placing orders.
          </p>
        </div>

      </div>

      {/* Registered Suppliers Table */}
      <div className="mb-6">
        <h3 className="text-md font-bold mb-2">Registered Suppliers</h3>
        <table className="w-full border-t border-gray-300 text-gray-700 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Contact</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="p-2 border-t border-gray-300">{s.id}</td>
                <td className="p-2 border-t border-gray-300">{s.name}</td>
                <td className="p-2 border-t border-gray-300">{s.contact}</td>
                <td className="p-2 border-t border-gray-300">{s.email}</td>
                <td className="p-2 border-t border-gray-300">{s.status}</td>

              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Add Supplier
        </button>
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