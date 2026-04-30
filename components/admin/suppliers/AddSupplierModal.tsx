'use client';

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function AddSupplierModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved?: () => void;
}) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [defaultLeadTimeDays, setDefaultLeadTimeDays] = useState(7);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const r = await apiFetch("/suppliers", {
        method: "POST",
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
      onSaved?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Add Supplier</h2>
          <button type="button" onClick={onClose} className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name *</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Code</label>
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Lead time (days) *</label>
            <input
              required
              type="number"
              min={1}
              max={365}
              value={defaultLeadTimeDays}
              onChange={(e) => setDefaultLeadTimeDays(Number(e.target.value))}
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
            <p className="text-xs text-slate-500 mt-1">Max days from order to delivery (used for replenishment timing).</p>
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="bg-sky-500 text-sky-50 px-4 py-2 rounded hover:bg-sky-600 transition-colors disabled:opacity-50">
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
