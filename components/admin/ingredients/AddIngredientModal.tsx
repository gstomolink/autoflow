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

        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Add Ingredient</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* BASIC */}
        <h3 className="font-semibold mb-2">Basic Info</h3>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Ingredient Name *</label>
          <input placeholder="Ingredient Name *" className="w-full p-2 rounded mb-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">SKU *</label>
          <input placeholder="SKU *" className="w-full p-2 rounded mb-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Description</label>
          <textarea placeholder="Description" className="w-full p-2 rounded mb-3 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>

        {/* UNIT */}
        <h3 className="font-semibold mb-2">Unit & Measurement</h3>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Unit</label>
          <select className="w-full p-2 rounded mb-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500">
            <option>Weight (kg)</option>
            <option>Volume (liter)</option>
            <option>Quantity (pcs)</option>
          </select>
        </div>>

        {/* INVENTORY */}
        <h3 className="font-semibold mb-2">Inventory</h3>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Initial Stock</label>
          <input placeholder="Initial Stock" className="w-full p-2 rounded mb-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Reorder Level</label>
          <input placeholder="Reorder Level" className="w-full p-2 rounded mb-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Safety Stock</label>
          <input placeholder="Safety Stock" className="w-full p-2 rounded mb-3 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>

        {/* PRICING */}
        <h3 className="font-semibold mb-2">Pricing</h3>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Cost Price</label>
          <input placeholder="Cost Price" className="w-full p-2 rounded mb-3 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>

        {/* SUPPLIER */}
        <h3 className="font-semibold mb-2">Supplier</h3>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Supplier Name</label>
          <input placeholder="Supplier Name" className="w-full p-2 rounded mb-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Lead Time (days)</label>
          <input placeholder="Lead Time (days)" className="w-full p-2 rounded mb-3 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"/>
        </div>

        {/* TOGGLE */}
        <label className="block text-sm text-gray-700 mb-1">
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
              <label className="block text-sm text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Shelf Life (Days)</label>
              <input
                type="number"
                placeholder="e.g. 30"
                className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Expiry Alert Before</label>

              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  value={alertValue}
                  onChange={(e) => setAlertValue(Number(e.target.value))}
                  className="w-24 px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
                />

                <select
                  value={alertUnit}
                  onChange={(e) => setAlertUnit(e.target.value)}
                  className="px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
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
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">
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