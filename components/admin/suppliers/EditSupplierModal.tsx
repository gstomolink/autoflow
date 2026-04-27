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
        <h2 className="font-bold mb-4">Edit supplier</h2>
        <div className="space-y-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Name" />
          <input value={code} onChange={(e) => setCode(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Code" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Phone" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Email" />
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Address" />
          <div>
            <label className="block text-sm text-slate-600 mb-1">Lead time (days)</label>
            <input
              type="number"
              min={1}
              max={365}
              value={defaultLeadTimeDays}
              onChange={(e) => setDefaultLeadTimeDays(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
          <button type="button" disabled={saving} onClick={() => void handleSave()} className="bg-sky-500 text-sky-50 px-4 py-2 rounded disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
