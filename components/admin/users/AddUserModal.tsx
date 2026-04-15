'use client';

import { useState } from "react";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { getScopedShopId } from "@/lib/shop-scope";

type Props = {
  onClose: () => void;
};

export default function AddUserModal({ onClose }: Props) {
  const { t } = useAdminI18n();
  const actor = getStoredUser();
  const isSuper = actor?.role === USER_ROLES.SUPER_ADMIN;
  const isStoreAdmin = actor?.role === USER_ROLES.STORE_ADMIN;
  const scopedShopId = isSuper ? getScopedShopId() : null;

  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [staffType, setStaffType] = useState("cashier");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        fullName,
        userId,
        password,
        email: email || undefined,
        phone: phone || undefined,
      };
      if (isSuper) {
        const sid = getScopedShopId()?.trim();
        if (!sid) {
          setError(t("usersAddMissingScope"));
          setSaving(false);
          return;
        }
        body.role = USER_ROLES.STORE_ADMIN;
        body.shopId = sid;
      } else if (isStoreAdmin) {
        body.role = USER_ROLES.STORE_STAFF;
        body.shopId = actor?.shopId ?? undefined;
        body.staffType = staffType;
      } else {
        setError("Not allowed");
        setSaving(false);
        return;
      }
      const r = await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!r.ok) {
        const errText = await r.text();
        throw new Error(errText || "Save failed");
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!isSuper && !isStoreAdmin) {
    return (
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl max-w-md">
          <p className="text-gray-700">Only super admin or store admin can add users.</p>
          <button type="button" onClick={onClose} className="mt-4 text-sky-600">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Add User</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {isSuper && scopedShopId ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800">
              <p className="font-medium text-slate-700">{t("usersAddScopedTitle")}</p>
              <p className="mt-1 font-mono text-slate-900">{scopedShopId}</p>
              <p className="mt-2 text-slate-600">{t("usersAddScopedHint")}</p>
              <p className="mt-2 text-xs text-slate-500">{t("usersAddCreatesStoreAdmin")}</p>
            </div>
          ) : null}

          {isStoreAdmin && actor?.shopId ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800">
              <p className="font-medium text-slate-700">{t("usersAddStoreContextTitle")}</p>
              <p className="mt-1 font-mono text-slate-900">{actor.shopId}</p>
              <p className="mt-2 text-slate-600">{t("usersAddStoreContextStaff")}</p>
              <p className="mt-2 text-xs text-slate-500">{t("usersAddCreatesStaff")}</p>
            </div>
          ) : null}

          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name *"
            className="w-full border p-2 rounded"
          />
          <input
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID *"
            className="w-full border p-2 rounded"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full border p-2 rounded"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="w-full border p-2 rounded"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password *"
            type="password"
            className="w-full border p-2 rounded"
          />

          {isStoreAdmin ? (
            <div>
              <label className="block text-sm text-slate-600 mb-1" htmlFor="add-user-staff-type">
                Staff type
              </label>
              <select
                id="add-user-staff-type"
                value={staffType}
                onChange={(e) => setStaffType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="cashier">cashier</option>
                <option value="inventory_staff">inventory_staff</option>
              </select>
            </div>
          ) : null}

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="border border-gray-300 text-gray-700 px-4 py-2 rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || (isSuper && !scopedShopId)}
              className="bg-sky-500 text-sky-50 px-4 py-2 rounded disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
