'use client';

import { useState, useMemo } from "react";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";

const data = [
  {
    id: "U001",
    name: "John Doe",
    email: "john@gmail.com",
    phone: "0771234567",
    role: "Admin",
    warehouse: "Main Warehouse",
    date: "2026-03-20",
    status: "Active",
  },
];

export default function UsersTable() {
  const { t } = useAdminI18n();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [add, setAdd] = useState(false);
  const [view, setView] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);

  const filtered = useMemo(() => {
    let d = data;

    if (search) {
      d = d.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search)
      );
    }

    if (role) {
      d = d.filter((u) => u.role === role);
    }

    return d;
  }, [search, role]);

  return (
    <div>

      {/* TOP RIGHT BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAdd(true)}
          className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded"
        >
          {t("usersAddNew")}
        </button>
      </div>

      {/* SEARCH + FILTER ROW */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex justify-between items-center">

          {/* search + filter */}
          <div className="flex gap-2">
            <input
              placeholder={t("usersSearchPlaceholder")}
              className="border border-gray-300 px-3 py-2 rounded"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded"
            >
              <option value="">{t("usersAllRoles")}</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Cashier</option>
              <option>Staff</option>
            </select>
          </div>

          {/* RIGHT SIDE SEARCH BUTTON */}
          <button className="bg-sky-500 text-sky-50 px-4 py-2 rounded hover:bg-sky-600 transition-colors cursor-pointer">
            {t("usersSearch")}
          </button>

        </div>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded text-gray-700">
        <thead className="bg-white text-left">
          <tr>
            <th className="p-2">{t("usersId")}</th>
            <th className="p-2">{t("usersName")}</th>
            <th className="p-2">{t("usersEmail")}</th>
            <th className="p-2">{t("usersPhone")}</th>
            <th className="p-2">{t("usersRole")}</th>
            <th className="p-2">{t("usersWarehouse")}</th>
            <th className="p-2">{t("usersCreated")}</th>
            <th className="p-2">{t("usersActions")}</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u, i) => (
            <tr key={i} className="border-t border-gray-300">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.warehouse}</td>
              <td className="p-2">{u.date}</td>

              <td className="p-2 flex gap-2 flex-wrap">

                <button onClick={()=>setView(u)} className="px-3 py-1 bg-sky-500 text-sky-50 rounded">
                  {t("usersView")}
                </button>

                <button onClick={()=>setEdit(u)} className="px-3 py-1 bg-gray-500 text-gray-50 rounded">
                  {t("usersEdit")}
                </button>

                <button className="px-3 py-1 bg-rose-500 text-rose-50 rounded">
                  {t("usersDelete")}
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {add && <AddUserModal onClose={()=>setAdd(false)} />}
      {view && <ViewUserModal data={view} onClose={()=>setView(null)} />}
      {edit && <EditUserModal data={edit} onClose={()=>setEdit(null)} />}

    </div>
  );
}