"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";
import { apiFetch } from "@/lib/api";
import { LIST_FETCH_LIMIT, readPaginatedJson } from "@/lib/paginated";
import { setScopedShopId } from "@/lib/shop-scope";
import { USER_ROLES, getStoredUser } from "@/lib/auth";

export default function AddShopModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved?: () => void;
}) {
  const { t } = useAdminI18n();
  const router = useRouter();
  const user = getStoredUser();
  const isStoreAdmin = user?.role === USER_ROLES.STORE_ADMIN;
  const [shopId, setShopId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [storeType, setStoreType] = useState<"parent" | "sub">("parent");
  const [parentShopId, setParentShopId] = useState("");
  const [parentOptions, setParentOptions] = useState<
    { shopId: string; name: string; parentShopId: string | null }[]
  >([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      const r = await apiFetch(`/shops?page=1&limit=${LIST_FETCH_LIMIT}`);
      if (!r.ok) return;
      const body = await readPaginatedJson<{
        shopId: string;
        name: string;
        parentShopId: string | null;
      }>(r);
      const parentRows = body.items.filter((s) => !s.parentShopId);
      setParentOptions(parentRows);
      if (isStoreAdmin && user?.shopId) {
        const own = body.items.find((s) => s.shopId === user.shopId);
        const ownParent = own?.parentShopId || own?.shopId || user.shopId;
        if (parentRows.some((p) => p.shopId === ownParent)) {
          setParentShopId(ownParent);
        }
      }
    })();
  }, [isStoreAdmin, user?.shopId]);

  useEffect(() => {
    if (!isStoreAdmin) return;
    setStoreType("sub");
  }, [isStoreAdmin]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const id = shopId.trim();
      const display = name.trim();
      const addr = address.trim();
      const parent =
        isStoreAdmin || storeType === "sub"
          ? parentShopId.trim() || undefined
          : undefined;
      if ((isStoreAdmin || storeType === "sub") && !parent) {
        throw new Error("parent store is required for sub store");
      }
      const r = await apiFetch("/shops", {
        method: "POST",
        body: JSON.stringify({
          shopId: id,
          name: display,
          address: addr,
          parentShopId: parent,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      setScopedShopId(id);
      onSaved?.();
      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">{t("shopsModalTitle")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form className="space-y-3" onSubmit={submit}>
          {isStoreAdmin ? null : (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Store Type</label>
              <select
                value={storeType}
                onChange={(e) => setStoreType(e.target.value as "parent" | "sub")}
                className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 focus:ring-2 focus:ring-sky-500"
              >
                <option value="parent">Parent Store</option>
                <option value="sub">Sub Store</option>
              </select>
            </div>
          )}
          {isStoreAdmin || storeType === "sub" ? (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Parent Store</label>
              <select
                value={parentShopId}
                onChange={(e) => setParentShopId(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 focus:ring-2 focus:ring-sky-500"
                required
                disabled={isStoreAdmin}
              >
                <option value="">Select parent store</option>
                {parentOptions.map((p) => (
                  <option key={p.shopId} value={p.shopId}>
                    {p.name} ({p.shopId})
                  </option>
                ))}
              </select>
              {isStoreAdmin ? (
                <p className="mt-1 text-xs text-slate-500">
                  your child shop will be linked under your primary shop
                </p>
              ) : null}
            </div>
          ) : null}
          <div>
            <label className="block text-sm text-gray-700 mb-1">{t("shopsFormId")}</label>
            <input
              required
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              placeholder="shop-001"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">{t("shopsFormName")}</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Main store"
              className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">{t("shopsFormAddress")}</label>
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("shopsFormAddressPlaceholder")}
              className="w-full px-3 py-2 rounded resize-y min-h-[4.5rem] border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors"
            >
              {t("actionCancel")}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-sky-500 text-sky-50 hover:bg-sky-600 rounded cursor-pointer transition-colors disabled:opacity-50"
            >
              {saving ? "…" : t("shopsFormSubmit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
