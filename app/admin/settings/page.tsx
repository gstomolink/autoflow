'use client';

import SettingsLayout from "@/components/admin/settings/SettingsLayout";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage system configuration, feature controls, inventory rules, and security settings.
        </p>
      </div>

      {/* Settings Content */}
      <SettingsLayout />
    </div>
  );
}