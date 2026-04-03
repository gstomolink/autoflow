'use client';

import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function SettingsTabs({ active, setActive }: any) {
  const { t } = useAdminI18n();

  const menu = [
    { key: "general", label: t("settingsGeneral") },
    { key: "features", label: t("settingsFeatures") },
    { key: "inventory", label: t("settingsInventory") },
    { key: "auto", label: t("settingsAutoOrder") },
    { key: "warehouse", label: t("settingsWarehouse") },
    { key: "supplier", label: t("settingsSupplier") },
    { key: "notification", label: t("settingsNotification") },
    { key: "security", label: t("settingsSecurity") },
    { key: "system", label: t("settingsSystem") },
  ];

  return (
    <div className="w-full border-b border-gray-300 mb-6">
      <div className="flex gap-2 overflow-x-auto">
        {menu.map((m) => (
          <button
            key={m.key}
            onClick={() => setActive(m.key)}
            className={`px-4 py-2 whitespace-nowrap border-b-2 transition-all ${
              active === m.key
                ? "border-sky-500 text-sky-600 font-semibold"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}