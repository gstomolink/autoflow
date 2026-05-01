'use client';

import { useState } from "react";
import SupplierTable from "@/components/admin/suppliers/SupplierTable";
import AddSupplierModal from "@/components/admin/suppliers/AddSupplierModal";
import BulkImportSupplierModal from "@/components/admin/suppliers/BulkImportSupplierModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function SupplierPage() {
  const { t } = useAdminI18n();
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">{t("suppliersTitle")}</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAdd(true)}
            className="bg-sky-500 text-sky-50 px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
          >
            {t("addNewSupplier")}
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

      <SupplierTable key={tableKey} />

      {showAdd && (
        <AddSupplierModal
          onClose={() => setShowAdd(false)}
          onSaved={() => setTableKey((k) => k + 1)}
        />
      )}

      {showBulk && (
        <BulkImportSupplierModal onClose={() => setShowBulk(false)} />
      )}
    </div>
  );
}
