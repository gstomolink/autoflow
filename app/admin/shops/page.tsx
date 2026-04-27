"use client";

import { useState } from "react";
import AddShopModal from "@/components/admin/shops/AddShopModal";
import BulkImportShopModal from "@/components/admin/shops/BulkImportShopModal";
import ShopTable from "@/components/admin/shops/ShopTable";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function AdminShopsPage() {
  const { t } = useAdminI18n();
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">{t("shopsPageTitle")}</h1>
          <p className="text-gray-600 mt-1 mr-12">{t("shopsPageSubtitle")}</p>
        </div>

        <div className="flex gap-3 flex-nowrap shrink-0">
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="bg-sky-500 text-sky-50 px-5 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t("addShop")}
          </button>

          <button
            onClick={() => setShowBulk(true)}
            className="px-4 py-2 bg-transparent text-slate-600 border border-slate-400 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            <span>{t("bulkImportCsv")}</span>
          </button>
        </div>
      </div>

      <ShopTable key={tableKey} />

      {showAdd ? (
        <AddShopModal
          onClose={() => setShowAdd(false)}
          onSaved={() => setTableKey((k) => k + 1)}
        />
      ) : null}

      {showBulk && (
        <BulkImportShopModal 
          onClose={() => setShowBulk(false)} 
          onSaved={() => setTableKey((k) => k + 1)}
        />
      )}
    </div>
  );
}

