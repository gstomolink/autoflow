'use client';

import { useState } from "react";

export default function SecuritySettings() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [requireSpecial, setRequireSpecial] = useState(true);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  const [lockDuration, setLockDuration] = useState(15);
  const [autoLogout, setAutoLogout] = useState(30);

  const handleSave = () => {
    const settings = {
      passwordLength,
      requireSpecial,
      maxLoginAttempts,
      lockDuration,
      autoLogout
    };
    console.log("Security Settings Saved:", settings);
    alert("Security settings saved successfully!");
  };

  return (
    <div className="text-gray-700">

      <h2 className="text-lg font-bold mb-6 text-gray-800">Security Settings</h2>

      {/* Password Rules */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Password Rules</h3>
        <div className="mb-2">
          <label className="block font-medium mb-1">Minimum Password Length</label>
          <input
            type="number"
            value={passwordLength}
            onChange={e => setPasswordLength(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-48"
          />
          <p className="text-xs text-gray-500 mt-1">
            Users must create passwords with at least this many characters.
          </p>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={requireSpecial}
            onChange={() => setRequireSpecial(prev => !prev)}
            className="accent-sky-500"
          />
          Require Special Characters
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Password must include at least one special character (!, @, #, etc.).
        </p>
      </div>

      {/* Login Security */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Login Security</h3>
        <div className="mb-2">
          <label className="block font-medium mb-1">Max Login Attempts</label>
          <input
            type="number"
            value={maxLoginAttempts}
            onChange={e => setMaxLoginAttempts(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-48"
          />
          <p className="text-xs text-gray-500 mt-1">
            Number of failed login attempts before account is temporarily locked.
          </p>
        </div>

        <div className="mb-2">
          <label className="block font-medium mb-1">Lock Duration (minutes)</label>
          <input
            type="number"
            value={lockDuration}
            onChange={e => setLockDuration(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-48"
          />
          <p className="text-xs text-gray-500 mt-1">
            How long the account remains locked after exceeding max login attempts.
          </p>
        </div>
      </div>

      {/* Session Settings */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Session Settings</h3>
        <div>
          <label className="block font-medium mb-1">Auto Logout Time (minutes)</label>
          <input
            type="number"
            value={autoLogout}
            onChange={e => setAutoLogout(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-48"
          />
          <p className="text-xs text-gray-500 mt-1">
            Users are automatically logged out after this period of inactivity.
          </p>
        </div>
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