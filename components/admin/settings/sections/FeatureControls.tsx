'use client';

import { useState } from "react";

const initialFeatures = [
  "Dashboard",
  "Categories",
  "Products",
  "Warehouses",
  "Recipes",
  "Inventory",
  "Inventory Orders",
  "Suppliers",
  "Purchases",
  "Reports",
  "Users & Roles",
  "Settings",
];

export default function FeatureControls() {
  const [features, setFeatures] = useState(
    initialFeatures.map((f) => ({
      name: f,
      visible: true,
      enabled: f === "Settings" ? true : true,
    }))
  );

  const toggle = (index: number, field: "visible" | "enabled") => {
    setFeatures(prev =>
      prev.map((f, i) =>
        i === index
          ? {
              ...f,
              [field]:
                f.name === "Settings" && field === "enabled"
                  ? true
                  : !f[field],
            }
          : f
      )
    );
  };

  return (
    <div>
      <h2 className="text-lg text-gray-800 font-bold mb-4">Feature Controls</h2>

      <table className="w-full">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border-t border-gray-300">Feature</th>
            <th className="p-2 border-t border-gray-300">Visible</th>
            <th className="p-2 border-t border-gray-300">Enabled</th>
          </tr>
        </thead>

        <tbody>
          {features.map((f, i) => (
            <tr key={i}>
              <td className="p-2 border-t border-gray-300 text-gray-700">{f.name}</td>

              <td className="p-2 border-t border-gray-300 text-center text-gray-700">
                <input
                  type="checkbox"
                  checked={f.visible}
                  onChange={() => toggle(i, "visible")}
                />
              </td>

              <td className="p-2 border-t border-gray-300 text-center text-gray-700">
                <input
                  type="checkbox"
                  checked={f.enabled}
                  disabled={f.name === "Settings"}
                  onChange={() => toggle(i, "enabled")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}