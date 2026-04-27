'use client';

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function AddWarehouseModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved?: () => void;
}) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [managerName, setManagerName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const r = await apiFetch("/warehouses", {
        method: "POST",
        body: JSON.stringify({
          name,
          code,
          address,
          managerName,
          contactPhone,
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
          <h2 className="text-xl font-bold text-black mb-1">Add New Warehouse</h2>
          <button type="button" onClick={onClose} className="cursor-pointer text-slate-600 hover:text-slate-900 transition-colors p-1 rounded" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

<form className="space-y-4" onSubmit={submit}>

  {/* WAREHOUSE NAME */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Warehouse Name 
    </label>
    <input
      required
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* CODE */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Warehouse Code 
    </label>
    <input
      required
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* ADDRESS */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Address 
    </label>
    <input
      required
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* MANAGER NAME */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Manager Name 
    </label>
    <input
      required
      value={managerName}
      onChange={(e) => setManagerName(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* CONTACT */}
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      Manager Contact 
    </label>
    <input
      required
      value={contactPhone}
      onChange={(e) => setContactPhone(e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
    />
  </div>

  {/* ERROR */}
  {error && (
    <p className="text-sm text-rose-600">{error}</p>
  )}

  {/* ACTIONS */}
  <div className="flex justify-end mt-4 gap-2">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 border border-gray-300 text-gray-700 rounded cursor-pointer"
    >
      Cancel
    </button>

    <button
      type="submit"
      disabled={saving}
      className="px-4 py-2 bg-sky-500 text-sky-50 hover:bg-sky-600 rounded cursor-pointer disabled:opacity-50"
    >
      {saving ? "Saving…" : "Save"}
    </button>
  </div>

</form>
      </div>
    </div>
  );
}
