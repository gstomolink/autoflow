'use client';

import { useState } from "react";

export default function AddIngredientModal({ onClose }: any) {

  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [alertValue, setAlertValue] = useState(14);
  const [alertUnit, setAlertUnit] = useState("days");
  const [expiryDate, setExpiryDate] = useState("");

  const getAlertDays = () => {
    if (alertUnit === "weeks") return alertValue * 7;
    if (alertUnit === "months") return alertValue * 30;
    return alertValue;
  };

  const getAlertDate = () => {
    if (!expiryDate) return "";

    const exp = new Date(expiryDate);
    exp.setDate(exp.getDate() - getAlertDays());

    return exp.toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl text-gray-700 overflow-y-auto max-h-[90vh]">

        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Add Ingredient</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* BASIC */}
        <h3 className="font-semibold mb-2">Basic Info</h3>
        <input placeholder="Ingredient Name *" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="SKU *" className="w-full border p-2 rounded mb-2"/>
        <textarea placeholder="Description" className="w-full border p-2 rounded mb-3"/>

        {/* UNIT */}
        <h3 className="font-semibold mb-2">Unit & Measurement</h3>
        <select className="w-full border p-2 rounded mb-2">
          <option>Weight (kg)</option>
          <option>Volume (liter)</option>
          <option>Quantity (pcs)</option>
        </select>

        {/* INVENTORY */}
        <h3 className="font-semibold mb-2">Inventory</h3>
        <input placeholder="Initial Stock" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="Reorder Level" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="Safety Stock" className="w-full border p-2 rounded mb-3"/>

        {/* PRICING */}
        <h3 className="font-semibold mb-2">Pricing</h3>
        <input placeholder="Cost Price" className="w-full border p-2 rounded mb-3"/>

        {/* SUPPLIER */}
        <h3 className="font-semibold mb-2">Supplier</h3>
        <input placeholder="Supplier Name" className="w-full border p-2 rounded mb-2"/>
        <input placeholder="Lead Time (days)" className="w-full border p-2 rounded mb-3"/>

        {/* TOGGLE */}
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={expiryEnabled}
            onChange={() => setExpiryEnabled(!expiryEnabled)}
          />
          Enable Expiry Tracking
        </label>

        {expiryEnabled && (
          <div className="space-y-3">

            <div>
              <label className="text-sm">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Shelf Life (Days)</label>
              <input
                type="number"
                placeholder="e.g. 30"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm">Expiry Alert Before</label>

              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  value={alertValue}
                  onChange={(e) => setAlertValue(Number(e.target.value))}
                  className="w-24 border px-3 py-2 rounded"
                />

                <select
                  value={alertUnit}
                  onChange={(e) => setAlertUnit(e.target.value)}
                  className="border px-3 py-2 rounded"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            {expiryDate && (
              <div className="bg-yellow-50 p-3 rounded border text-sm">
                ⚠️ Alert will trigger on: <b>{getAlertDate()}</b>
              </div>
            )}

          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}