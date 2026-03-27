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
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
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
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm text-gray-600">Contact</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-sky-500"
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
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-sky-500"
            />
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-600 rounded bg-slate-200 hover:bg-slate-300 cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 cursor-pointer transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}