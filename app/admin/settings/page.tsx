'use client';

import SettingsLayout from "@/components/admin/settings/SettingsLayout";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function SettingsPage() {
  const { t } = useAdminI18n();

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {t("settingsPageTitle")}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {t("settingsPageDescription")}
        </p>
      </div>

      {/* Settings Content */}
      <SettingsLayout />
    </div>
  );
}