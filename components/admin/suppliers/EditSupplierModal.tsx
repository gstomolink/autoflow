'use client';

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type Row = {
  id: number;
  name: string;
  code: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  defaultLeadTimeDays?: number;
};

export default function EditSupplierModal({
  data,
  onClose,
}: {
  data: Row;
  onClose: () => void;
}) {
  const [name, setName] = useState(data.name);
  const [code, setCode] = useState(data.code ?? "");
  const [phone, setPhone] = useState(data.phone ?? "");
  const [email, setEmail] = useState(data.email ?? "");
  const [address, setAddress] = useState(data.address ?? "");
  const [defaultLeadTimeDays, setDefaultLeadTimeDays] = useState(
    data.defaultLeadTimeDays ?? 7,
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const r = await apiFetch(`/suppliers/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          code: code || undefined,
          phone: phone || undefined,
          email: email || undefined,
          address: address || undefined,
          defaultLeadTimeDays,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Edit Supplier</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" placeholder="Name" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Code</label>
            <input value={code} onChange={(e) => setCode(e.target.value)} className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" placeholder="Code" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" placeholder="Phone" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" placeholder="Email" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" placeholder="Address" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Lead time (days)</label>
            <input
              type="number"
              min={1}
              max={365}
              value={defaultLeadTimeDays}
              onChange={(e) => setDefaultLeadTimeDays(Number(e.target.value))}
              className="w-full rounded px-3 py-2 border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </div>
        <div className="flex justify-end gap-3 pt-4 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">Cancel</button>
          <button type="button" disabled={saving} onClick={() => void handleSave()} className="bg-sky-500 text-sky-50 px-4 py-2 rounded hover:bg-sky-600 transition-colors disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
