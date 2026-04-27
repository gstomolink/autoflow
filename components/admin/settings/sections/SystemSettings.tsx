'use client';

import { useState } from "react";

export default function SystemSettings() {
  const [auditLogs, setAuditLogs] = useState(true);
  const [logRetention, setLogRetention] = useState(90);
  const [debugMode, setDebugMode] = useState(false);

  const handleSave = () => {
    const settings = {
      auditLogs,
      logRetention,
      debugMode
    };
    console.log("System Settings Saved:", settings);
    alert("System settings saved successfully!");
  };

  return (
    <div className="text-gray-700">

      <h2 className="text-lg font-bold mb-6 text-gray-800">System Settings (Advanced)</h2>

      {/* Audit Logs */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Audit Logs</h3>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={auditLogs}
            onChange={() => setAuditLogs(prev => !prev)}
            className="accent-sky-500"
          />
          Enable Audit Logs
        </label>
        <input
          type="number"
          value={logRetention}
          onChange={e => setLogRetention(Number(e.target.value))}
          placeholder="Log Retention Days"
          className="border border-gray-300 p-2 rounded w-48"
        />
        <p className="text-xs text-gray-500 mt-1">
          Number of days audit logs are kept before automatic deletion.
        </p>
      </div>

      {/* Debug Mode */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Debug Mode</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={debugMode}
            onChange={() => setDebugMode(prev => !prev)}
            className="accent-sky-500"
          />
          Enable Debug Mode
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Enables detailed logs for development or troubleshooting. Recommended OFF in production.
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="bg-sky-500 text-white px-6 py-2 rounded hover:bg-sky-600 transition"
        >
          Save Settings
        </button>
      </div>

    </div>
  );
}