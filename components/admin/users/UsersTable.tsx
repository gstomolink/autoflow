'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { apiFetch } from "@/lib/api";
import { roleLabel } from "@/lib/auth";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

type ApiUser = {
  id: number;
  fullName: string;
  userId: string;
  email: string | null;
  phone: string | null;
  role: number;
  shopId: string | null;
  staffType: string | null;
};

export default function UsersTable() {
  const { t } = useAdminI18n();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [add, setAdd] = useState(false);
  const [view, setView] = useState<ApiUser | null>(null);
  const [edit, setEdit] = useState<ApiUser | null>(null);
  const [rows, setRows] = useState<ApiUser[]>([]);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);
  const [resetUser, setResetUser] = useState<any>(null);

  const load = useCallback(async () => {
    setLoadError("");
    setLoading(true);
    try {
      const r = await apiFetch("/users");
      if (!r.ok) {
        const t = await r.text();
        throw new Error(t || r.statusText);
      }
      setRows(await r.json());
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Failed to load users");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    let d = rows;
    if (search) {
      const q = search.toLowerCase();
      d = d.filter(
        (u) =>
          u.fullName.toLowerCase().includes(q) ||
          (u.email?.toLowerCase().includes(q) ?? false) ||
          (u.phone?.includes(search) ?? false) ||
          u.userId.toLowerCase().includes(q),
      );
    }
    if (roleFilter) {
      d = d.filter((u) => roleLabel(u.role) === roleFilter);
    }
    return d;
  }, [search, roleFilter, rows]);

  return (
    <div>
      {loadError ? (
        <p className="text-rose-600 text-sm mb-2">{loadError}</p>
      ) : null}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAdd(true)}
          className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded"
        >
          + Add New User
        </button>
      </div>

      <div className="flex justify-between items-end mb-4 flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Search</label>
            <input
              placeholder="Search name, email, phone..."
              value={search}
              className="border border-gray-300 px-3 py-2 rounded"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded"
            >
              <option value="">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Store Admin">Store Admin</option>
              <option value="Store Staff">Store Staff</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="bg-sky-500 text-sky-50 px-4 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <table className="w-full bg-white shadow rounded text-gray-700">
          <thead className="bg-white text-left border-b border-gray-200">
            <tr>
              <th className="p-2">User ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Role</th>
              <th className="p-2">Shop ID</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr className="border-t border-gray-300">
                <td className="p-6 text-center text-slate-500" colSpan={7}>
                  No data
                </td>
              </tr>
            ) : null}
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-gray-300">
                <td className="p-2">{u.userId}</td>
                <td className="p-2">{u.fullName}</td>
                <td className="p-2">{u.email ?? "—"}</td>
                <td className="p-2">{u.phone ?? "—"}</td>
                <td className="p-2">{roleLabel(u.role)}</td>
                <td className="p-2">{u.shopId ?? "—"}</td>

                <td className="p-2 flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setView(u)}
                    className="px-3 py-1 bg-sky-500 text-sky-50 rounded"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => setEdit(u)}
                    className="px-3 py-1 bg-gray-500 text-gray-50 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setResetUser(u)}
                    className="bg-purple-500 text-white px-2 py-1 rounded cursor-pointer"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {add && (
        <AddUserModal
          onClose={() => {
            setAdd(false);
            void load();
          }}
        />
      )}
      {view && (
        <ViewUserModal
          data={view}
          onClose={() => setView(null)}
        />
      )}
      {edit && (
        <EditUserModal
          data={edit}
          onClose={() => {
            setEdit(null);
            void load();
          }}
        />
      )}

      {resetUser && (
  <ResetPasswordModal
    user={resetUser}
    onClose={() => setResetUser(null)}
  />
)}
    </div>
  );
}
