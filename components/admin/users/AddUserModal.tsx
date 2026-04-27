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
      let errorMessage = "Save failed";

      try {
        const errData = await r.json();
        errorMessage =
          errData?.message ||
          errData?.error ||
          JSON.stringify(errData);
      } catch {
        errorMessage = await r.text();
      }

      throw new Error(errorMessage);
    }

    alert("User added successfully!"); // 
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

<form className="space-y-4" onSubmit={handleSubmit}>

  {/* FULL NAME */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Full Name *
    </label>
    <input
      required
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* USER ID */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      User ID *
    </label>
    <input
      required
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* EMAIL */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Email
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* PHONE */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Phone
    </label>
    <input
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* PASSWORD */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Password *
    </label>
    <input
      required
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* STAFF TYPE */}
  {isStoreAdmin && (
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Staff Type
      </label>
      <select
        value={staffType}
        onChange={(e) => setStaffType(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
      >
        <option value="cashier">Cashier</option>
        <option value="inventory_staff">Inventory Staff</option>
      </select>
    </div>
  )}

  {/* ERROR */}
  {error && (
    <p className="text-sm text-rose-600">{error}</p>
  )}

  {/* ACTIONS */}
  <div className="flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={onClose}
      className="border border-gray-300 text-gray-700 px-4 py-2 rounded"
    >
      Cancel
    </button>

    <button
      type="submit"
      disabled={saving || (isSuper && !scopedShopId)}
      className="bg-sky-500 text-sky-50 px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
    >
      {saving ? "Saving…" : "Save"}
    </button>
  </div>

</form>
      </div>
    </div>
  );
}
