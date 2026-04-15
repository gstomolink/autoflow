'use client';

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type Row = {
  id: number;
  name: string;
  code: string;
  address: string | null;
  managerName: string | null;
  contactPhone: string | null;
};

export default function EditWarehouseModal({
  data,
  onClose,
}: {
  data: Row;
  onClose: () => void;
}) {
  const [name, setName] = useState(data.name);
  const [code, setCode] = useState(data.code);
  const [address, setAddress] = useState(data.address ?? "");
  const [managerName, setManagerName] = useState(data.managerName ?? "");
  const [contactPhone, setContactPhone] = useState(data.contactPhone ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setError("");
    setSaving(true);
    try {
      const r = await apiFetch(`/warehouses/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          code,
          address,
          managerName,
          contactPhone,
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
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <h2 className="text-xl font-bold text-black mb-4">Edit Warehouse</h2>
        <div className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 p-2 rounded" placeholder="Name" />
          <input value={code} onChange={(e) => setCode(e.target.value)} className="w-full border border-gray-300 p-2 rounded" placeholder="Code" />
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-gray-300 p-2 rounded" placeholder="Address" />
          <input value={managerName} onChange={(e) => setManagerName(e.target.value)} className="w-full border border-gray-300 p-2 rounded" placeholder="Manager" />
          <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full border border-gray-300 p-2 rounded" placeholder="Contact" />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
          <button type="button" disabled={saving} onClick={() => void save()} className="bg-sky-500 text-sky-50 px-4 py-2 rounded disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
