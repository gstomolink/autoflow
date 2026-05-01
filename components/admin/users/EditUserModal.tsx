'use client';

import { useState } from "react";
import { USER_ROLES, getStoredUser } from "@/lib/auth";

type Row = {
  fullName: string;
  userId: string;
  email: string | null;
  phone: string | null;
  role: number;
  shopId: string | null;
  staffType: string | null;
};

export default function EditUserModal({
  data,
  onClose,
}: {
  data: Row;
  onClose: () => void;
}) {
  const actor = getStoredUser();
  const allowedRoleOptions =
    actor?.role === USER_ROLES.SUPER_ADMIN
      ? [
          { value: USER_ROLES.SUPER_ADMIN, label: "Super Admin" },
          { value: USER_ROLES.STORE_ADMIN, label: "Store Admin" },
          { value: USER_ROLES.STORE_STAFF, label: "Store Staff" },
        ]
      : actor?.role === USER_ROLES.STORE_ADMIN
        ? [{ value: USER_ROLES.STORE_STAFF, label: "Store Staff" }]
        : [];

  const [form, setForm] = useState<Row>(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "role") {
      setForm({ ...form, role: Number(value) });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    alert("User updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Edit User</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">

          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* USER ID (READ ONLY) */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">User ID</label>
            <input
              value={form.userId}
              disabled
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              name="email"
              value={form.email ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            >
              {allowedRoleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* SHOP */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Shop</label>
            <input
              name="shopId"
              value={form.shopId ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* STAFF TYPE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Staff Type</label>
            <input
              name="staffType"
              value={form.staffType ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded cursor-pointer transition-colors"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}