'use client';

import { useState } from "react";

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
  const [form, setForm] = useState<Row>(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("User updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Edit User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {/* FORM */}
        <div className="space-y-3">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          {/* USER ID (READ ONLY) */}
          <div>
            <label className="text-sm font-medium">User ID</label>
            <input
              value={form.userId}
              disabled
              className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              value={form.email ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            >
              <option value={1}>Admin</option>
              <option value={2}>Manager</option>
              <option value={3}>Cashier</option>
              <option value={4}>Staff</option>
            </select>
          </div>

          {/* SHOP */}
          <div>
            <label className="text-sm font-medium">Shop</label>
            <input
              name="shopId"
              value={form.shopId ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          {/* STAFF TYPE */}
          <div>
            <label className="text-sm font-medium">Staff Type</label>
            <input
              name="staffType"
              value={form.staffType ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors cursor-pointer"
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