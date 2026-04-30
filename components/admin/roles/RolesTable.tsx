'use client';

import { useState } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import RoleFormModal from "./RoleFormModal";
import ViewPermissionsModal from "./ViewPermissionsModal";

const roles = [
  { name: "Admin", users: 3, date: "2026-03-01" },
  { name: "Manager", users: 5, date: "2026-03-05" },
];

export default function RolesTable() {
  const [add, setAdd] = useState(false);
  const [view, setView] = useState<any>(null);
  const { t } = useAdminI18n();

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAdd(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded"
        >
          + {t("rolesCreateRole")}
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded text-gray-700">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">{t("rolesColumnRole")}</th>
            <th className="p-2">{t("rolesColumnUsers")}</th>
            <th className="p-2">{t("rolesColumnCreated")}</th>
            <th className="p-2">{t("rolesColumnActions")}</th>
          </tr>
        </thead>

        <tbody>
          {roles.length === 0 ? (
            <tr className="border-t border-gray-300">
              <td className="p-6 text-center text-slate-500" colSpan={4}>
                No data
              </td>
            </tr>
          ) : null}
          {roles.map((r, i) => (
            <tr key={i} className="border-t border-gray-300">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.users}</td>
              <td className="p-2">{r.date}</td>

              <td className="p-2 flex gap-2 flex-wrap">

                <button
                  onClick={() => setView(r)}
                  className="bg-sky-500 text-sky-50 px-3 py-1 rounded"
                >
                  {t("rolesViewPermissions")}
                </button>

                <button className="bg-gray-500 text-gray-50 px-3 py-1 rounded">
                  {t("rolesEdit")}
                </button>

                <button className="bg-rose-500 text-white px-3 py-1 rounded">
                  {t("rolesDelete")}
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {add && <RoleFormModal onClose={() => setAdd(false)} />}
      {view && <ViewPermissionsModal data={view} onClose={() => setView(null)} />}
    </div>
  );
}