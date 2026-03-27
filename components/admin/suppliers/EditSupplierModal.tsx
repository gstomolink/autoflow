'use client';

import { useState } from "react";

type Props = {
  data: {
    id: string;
    name: string;
    contact: string;
    email: string;
    address: string;
  };
  onClose: () => void;
};

export default function EditSupplierModal({ data, onClose }: Props) {
  const [form, setForm] = useState(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Supplier updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-gray-700">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Edit Supplier</h2>
          <button onClick={onClose} className="cursor-pointer text-black items-center mb-4">
            ⨯
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">

          {/* Supplier ID (DISABLED) */}
          <div>
            <label className="text-sm text-gray-600">Supplier ID</label>
            <input
              value={form.id}
              disabled
              className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm text-gray-600">Contact</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500"
            />
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}