'use client';

import { useState } from "react";

export default function NotificationSettings() {
  const [alerts, setAlerts] = useState({
    lowStock: true,
    expiry: true,
    orderApproval: true,
  });

  const [channels, setChannels] = useState({
    email: true,
    inApp: true,
  });

  const handleAlertChange = (key: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChannelChange = (key: keyof typeof channels) => {
    setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log("Notification Settings Saved:", { alerts, channels });
    alert("Notification settings saved successfully!");
  };

  return (
    <div className="text-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Notification Settings</h2>
      </div>

      {/* Alerts */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Alerts</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={alerts.lowStock}
            onChange={() => handleAlertChange("lowStock")}
            className="accent-sky-500"
          />
          Low Stock Alert
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={alerts.expiry}
            onChange={() => handleAlertChange("expiry")}
            className="accent-sky-500"
          />
          Expiry Alert
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={alerts.orderApproval}
            onChange={() => handleAlertChange("orderApproval")}
            className="accent-sky-500"
          />
          Order Approval Alert
        </label>
      </div>

      {/* Channels */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Channels</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={channels.email}
            onChange={() => handleChannelChange("email")}
            className="accent-sky-500"
          />
          Email
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={channels.inApp}
            onChange={() => handleChannelChange("inApp")}
            className="accent-sky-500"
          />
          In-App
        </label>
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