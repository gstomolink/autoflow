'use client';

import { useState } from "react";
import SupplierTable from "@/components/admin/suppliers/SupplierTable";
import AddSupplierModal from "@/components/admin/suppliers/AddSupplierModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

export default function SupplierPage() {
  const { t } = useAdminI18n();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">{t("suppliersTitle")}</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-sky-500 text-sky-50 px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer"
        >
          {t("addNewSupplier")}
        </button>
      </div>

      <SupplierTable />

      {showAdd && <AddSupplierModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}