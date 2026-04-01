'use client';

import { useState } from "react";

export default function GeneralSettings() {
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="text-gray-700">
      
      {/* Heading */}
      <h2 className="text-lg font-bold mb-1 text-gray-800">
        General Settings
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Configure basic system details like name, logo, timezone, currency, and date format.
      </p>

      <div className="grid gap-5 max-w-xl">

        {/* System Name */}
        <div>
          <label className="block font-medium mb-1">System Name</label>
          <p className="text-xs text-gray-500 mb-2">
            This name will appear in your dashboard, reports, and invoices.
          </p>
          <input
            type="text"
            placeholder="Enter system name"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block font-medium mb-1">System Logo</label>
          <p className="text-xs text-gray-500 mb-2">
            Upload your company or system logo (recommended size: 200x200px).
          </p>

          <input type="file" onChange={handleLogoUpload} />

          {/* Preview */}
          {logo && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img
                src={logo}
                alt="Logo Preview"
                className="w-24 h-24 object-contain border rounded"
              />
            </div>
          )}
        </div>

        {/* Timezone */}
        <div>
          <label className="block font-medium mb-1">Timezone</label>
          <p className="text-xs text-gray-500 mb-2">
            Set your local timezone to ensure correct time tracking.
          </p>
          <select className="w-full border border-gray-300 p-2 rounded">
            <option>Asia/Colombo</option>
            <option>Asia/Kolkata</option>
            <option>UTC</option>
          </select>
        </div>

        {/* Currency */}
        <div>
          <label className="block font-medium mb-1">Currency</label>
          <p className="text-xs text-gray-500 mb-2">
            Select the default currency for all transactions.
          </p>
          <select className="w-full border border-gray-300 p-2 rounded">
            <option>LKR (Sri Lankan Rupee)</option>
            <option>USD (US Dollar)</option>
            <option>INR (Indian Rupee)</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="block font-medium mb-1">Date Format</label>
          <p className="text-xs text-gray-500 mb-2">
            Choose how dates should be displayed across the system.
          </p>
          <select className="w-full border border-gray-300 p-2 rounded">
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
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