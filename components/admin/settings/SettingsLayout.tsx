'use client';

import { useState } from "react";
import SettingsTabs from "./SettingsTabs";

import GeneralSettings from "./sections/GeneralSettings";
import FeatureControls from "./sections/FeatureControls";
import InventorySettings from "./sections/InventorySettings";
import AutoOrderSettings from "./sections/AutoOrderSettings";
import WarehouseSettings from "./sections/WarehouseSettings";
import SupplierSettings from "./sections/SupplierSettings";
import NotificationSettings from "./sections/NotificationSettings";
import SecuritySettings from "./sections/SecuritySettings";
import SystemSettings from "./sections/SystemSettings";

export default function SettingsLayout() {
  const [active, setActive] = useState("general");

  const renderSection = () => {
    switch (active) {
      case "general": return <GeneralSettings />;
      case "features": return <FeatureControls />;
      case "inventory": return <InventorySettings />;
      case "auto": return <AutoOrderSettings />;
      case "warehouse": return <WarehouseSettings />;
      case "supplier": return <SupplierSettings />;
      case "notification": return <NotificationSettings />;
      case "security": return <SecuritySettings />;
      case "system": return <SystemSettings />;
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      
      {/* Tabs */}
      <SettingsTabs active={active} setActive={setActive} />

      {/* Content */}
      <div>{renderSection()}</div>
    </div>
  );
}