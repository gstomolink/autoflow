"use client";

import { useState } from "react";
import AddShopModal from "@/components/admin/shops/AddShopModal";
import ShopTable from "@/components/admin/shops/ShopTable";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function AdminShopsPage() {
  const { t } = useAdminI18n();
  const [showAdd, setShowAdd] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">{t("shopsPageTitle")}</h1>
          <p className="text-gray-600 mt-1">{t("shopsPageSubtitle")}</p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="bg-sky-500 text-sky-50 px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
        >
          {t("addShop")}
        </button>
      </div>

      <ShopTable key={tableKey} />

      {showAdd ? (
        <AddShopModal
          onClose={() => setShowAdd(false)}
          onSaved={() => setTableKey((k) => k + 1)}
        />
      ) : null}
    </div>
  );
}
