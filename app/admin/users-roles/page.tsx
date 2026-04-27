'use client';

import { useState } from "react";
import UsersTable from "@/components/admin/users/UsersTable";
import BulkImportUserModal from "@/components/admin/users/BulkImportUserModal";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { getScopedShopId } from "@/lib/shop-scope";

export default function UsersRolesPage() {
  const [showBulk, setShowBulk] = useState(false);
  const user = getStoredUser();
  const isSuper = user?.role === USER_ROLES.SUPER_ADMIN;
  const scope = isSuper ? getScopedShopId() : user?.shopId ?? null;

  return (
    <div className="text-gray-700">
      <div className="flex justify-between items-start mb-6 flex-nowrap shrink-0">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-500">
            System users (roles are fixed in the database: 1 Super Admin, 2 Store Admin, 3 Store Staff).
            {isSuper
              ? " As super admin, the list shows users for the shop you selected (same scope as categories)."
              : null}
          </p>
          {scope ? (
            <p className="text-sm text-slate-600 mt-2">
              <span className="font-medium text-slate-700">Shop scope:</span>{" "}
              <span className="font-mono">{scope}</span>
            </p>
          ) : null}
        </div>

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
          <span>Bulk Import CSV</span>
        </button>
      </div>
      
      <UsersTable />

      {showBulk && <BulkImportUserModal onClose={() => setShowBulk(false)} onSaved={() => window.location.reload()} />}
    </div>
  );
}