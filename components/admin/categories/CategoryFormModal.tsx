'use client';

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type Props = {
  mode: "add" | "edit";
  data?: {
    id: number;
    name: string;
    description: string | null;
  };
  onClose: () => void;
  onSaved?: () => void;
};

export default function CategoryFormModal({ mode, data, onClose, onSaved }: Props) {
  const [name, setName] = useState(data?.name ?? "");
  const [description, setDescription] = useState(data?.description ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (mode === "add") {
        const r = await apiFetch("/categories", {
          method: "POST",
          body: JSON.stringify({ name, description: description || undefined }),
        });
        if (!r.ok) throw new Error(await r.text());
      } else if (data) {
        const r = await apiFetch(`/categories/${data.id}`, {
          method: "PATCH",
          body: JSON.stringify({ name, description: description || undefined }),
        });
        if (!r.ok) throw new Error(await r.text());
      }
      onSaved?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
            {mode === "add" ? "Add New Category" : "Edit Category"}
          </h2>
          <button type="button" onClick={onClose} className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="flex justify-end gap-3 pt-4 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 transition-colors cursor-pointer disabled:opacity-50">
              {saving ? "Saving…" : mode === "add" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
