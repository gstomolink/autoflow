'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { apiFetch } from "@/lib/api";
import { USER_ROLES, getStoredUser, roleLabel } from "@/lib/auth";
import {
  LIST_FETCH_LIMIT,
  PAGE_SIZE,
  readPaginatedJson,
  slicePage,
} from "@/lib/paginated";
import TablePagination from "@/components/admin/common/TablePagination";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import PageShopScopeFilter from "@/components/layout/PageShopScopeFilter";
import { requestShopScopeApply } from "@/lib/shop-scope";

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
  const actor = getStoredUser();

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [add, setAdd] = useState(false);
  const [view, setView] = useState<ApiUser | null>(null);
  const [edit, setEdit] = useState<ApiUser | null>(null);
  const [rows, setRows] = useState<ApiUser[]>([]);
  const [listPage, setListPage] = useState(1);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);
  const [resetUser, setResetUser] = useState<any>(null);

  const load = useCallback(async () => {
    setLoadError("");
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: String(LIST_FETCH_LIMIT),
      });
      if (search.trim()) params.set("search", search.trim());
      if (roleFilter.trim()) params.set("role", roleFilter.trim());
      const r = await apiFetch(`/users?${params.toString()}`);
      if (!r.ok) {
        const t = await r.text();
        throw new Error(t || r.statusText);
      }
      const body = await readPaginatedJson<ApiUser>(r);
      setRows(body.items);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Failed to load users");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [roleFilter, search]);

  useEffect(() => {
    void load();
  }, [load]);

  const pagedRows = useMemo(
    () => slicePage(rows, listPage, PAGE_SIZE),
    [rows, listPage],
  );

  useEffect(() => {
    setListPage(1);
  }, [search, roleFilter]);

  const roleOptions = useMemo(() => {
    if (actor?.role === USER_ROLES.SUPER_ADMIN) {
      return [
        { value: String(USER_ROLES.SUPER_ADMIN), label: "Super Admin" },
        { value: String(USER_ROLES.STORE_ADMIN), label: "Store Admin" },
        { value: String(USER_ROLES.STORE_STAFF), label: "Store Staff" },
      ];
    }
    if (actor?.role === USER_ROLES.STORE_ADMIN) {
      return [
        { value: String(USER_ROLES.STORE_STAFF), label: "Store Staff" },
      ];
    }
    return [];
  }, [actor?.role]);

  useEffect(() => {
    if (!roleFilter) return;
    if (!roleOptions.some((opt) => opt.value === roleFilter)) {
      setRoleFilter("");
    }
  }, [roleFilter, roleOptions]);

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
        <div className="flex gap-4 flex-wrap">
          <PageShopScopeFilter mode="master" />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Search</label>
            <input
              placeholder="Search name, email, phone..."
              value={searchInput}
              className="border border-gray-300 px-3 py-2 rounded"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  requestShopScopeApply();
                  setSearch(searchInput.trim());
                }
              }}
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
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              requestShopScopeApply();
              setSearch(searchInput.trim());
            }}
            className="bg-sky-500 text-sky-50 px-4 py-2 rounded cursor-pointer hover:bg-sky-600 transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              setSearch("");
              setRoleFilter("");
            }}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <>
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
            {rows.length === 0 ? (
              <tr className="border-t border-gray-300">
                <td className="p-6 text-center text-slate-500" colSpan={7}>
                  No data
                </td>
              </tr>
            ) : null}
            {pagedRows.map((u) => (
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
        <TablePagination
          page={listPage}
          total={rows.length}
          pageSize={PAGE_SIZE}
          onPageChange={setListPage}
        />
        </>
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
