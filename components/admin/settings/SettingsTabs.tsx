'use client';

export default function SettingsTabs({ active, setActive }: any) {
  const menu = [
    { key: "general", label: "General" },
    { key: "features", label: "Feature Controls" },
    { key: "inventory", label: "Inventory" },
    { key: "auto", label: "Auto Order" },
    { key: "warehouse", label: "Warehouse" },
    { key: "supplier", label: "Supplier" },
    { key: "notification", label: "Notification" },
    { key: "security", label: "Security" },
    { key: "system", label: "System" },
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