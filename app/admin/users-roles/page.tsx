'use client';

import UsersTable from "@/components/admin/users/UsersTable";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { getScopedShopId } from "@/lib/shop-scope";

export default function UsersRolesPage() {
  const user = getStoredUser();
  const isSuper = user?.role === USER_ROLES.SUPER_ADMIN;
  const scope = isSuper ? getScopedShopId() : user?.shopId ?? null;

  return (
    <div className="text-gray-700">
      <div className="mb-6">
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
      <UsersTable />
    </div>
  );
}