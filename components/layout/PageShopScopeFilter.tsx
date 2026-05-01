"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { LIST_FETCH_LIMIT, readPaginatedJson } from "@/lib/paginated";
import {
  SHOP_SCOPE_APPLY_EVENT,
  SHOP_SCOPE_CHANGE_EVENT,
  getScopedShopId,
  setScopedShopId,
  type ShopListEntry,
} from "@/lib/shop-scope";
import SearchableShopCombobox from "./SearchableShopCombobox";

type ShopWithParent = ShopListEntry & { parentShopId: string | null };

type Props = {
  mode: "master" | "ops";
  className?: string;
};

export default function PageShopScopeFilter({ mode, className = "" }: Props) {
  const router = useRouter();
  const user = getStoredUser();
  const isSuperAdmin = user?.role === USER_ROLES.SUPER_ADMIN;
  const isStoreAdmin = user?.role === USER_ROLES.STORE_ADMIN;
  const canManageScope = isSuperAdmin || isStoreAdmin;
  const [shops, setShops] = useState<ShopWithParent[]>([]);
  const [parentShopId, setParentShopId] = useState("");
  const [subShopId, setSubShopId] = useState("");

  const parentShops = useMemo(() => shops.filter((s) => !s.parentShopId), [shops]);
  const subShops = useMemo(
    () => shops.filter((s) => s.parentShopId === parentShopId),
    [shops, parentShopId],
  );

  const adminChildShops = useMemo(() => {
    if (!isStoreAdmin || !user?.shopId) return [];
    return shops.filter((s) => s.parentShopId === user.shopId);
  }, [isStoreAdmin, shops, user?.shopId]);

  useEffect(() => {
    if (!canManageScope) return;
    void (async () => {
      const r = await apiFetch(`/shops?page=1&limit=${LIST_FETCH_LIMIT}`);
      if (!r.ok) {
        setShops([]);
        return;
      }
      const body = await readPaginatedJson<ShopWithParent>(r);
      setShops(body.items);
    })();
  }, [canManageScope]);

  useEffect(() => {
    if (!canManageScope) return;
    const syncFromScope = () => {
      const scoped = getScopedShopId() ?? "";
      if (isStoreAdmin) {
        setParentShopId(user?.shopId ?? "");
        const pickedChild = adminChildShops.find((s) => s.shopId === scoped);
        setSubShopId(pickedChild ? pickedChild.shopId : "");
        return;
      }
      const row = shops.find((s) => s.shopId === scoped);
      if (!row) {
        setParentShopId("");
        setSubShopId("");
        return;
      }
      setParentShopId(row.parentShopId || row.shopId);
      setSubShopId(row.parentShopId ? row.shopId : "");
    };
    syncFromScope();
    window.addEventListener(SHOP_SCOPE_CHANGE_EVENT, syncFromScope);
    window.addEventListener("storage", syncFromScope);
    return () => {
      window.removeEventListener(SHOP_SCOPE_CHANGE_EVENT, syncFromScope);
      window.removeEventListener("storage", syncFromScope);
    };
  }, [adminChildShops, canManageScope, isStoreAdmin, shops, user?.shopId]);

  useEffect(() => {
    if (!canManageScope) return;
    const scoped = getScopedShopId();
    if (scoped) return;
    if (isStoreAdmin) {
      if (!user?.shopId) return;
      setParentShopId(user.shopId);
      setSubShopId("");
      setScopedShopId(user.shopId);
      router.refresh();
      return;
    }
    if (!parentShops.length) return;
    const fallback = parentShops[0]?.shopId;
    if (!fallback) return;
    setParentShopId(fallback);
    setSubShopId("");
    setScopedShopId(fallback);
    router.refresh();
  }, [canManageScope, isStoreAdmin, parentShops, router, user?.shopId]);

  const applyScope = () => {
    const nextScopedShopId = subShopId || parentShopId;
    if (!nextScopedShopId) return;
    const currentScopedShopId = getScopedShopId();
    if (currentScopedShopId === nextScopedShopId) return;
    setScopedShopId(nextScopedShopId);
    router.refresh();
  };

  useEffect(() => {
    if (!canManageScope) return;
    const handleApplyScope = () => {
      applyScope();
    };
    window.addEventListener(SHOP_SCOPE_APPLY_EVENT, handleApplyScope);
    return () => {
      window.removeEventListener(SHOP_SCOPE_APPLY_EVENT, handleApplyScope);
    };
  }, [canManageScope, parentShopId, subShopId]);

  if (!canManageScope) {
    return null;
  }

  if (isStoreAdmin) {
    return (
      <div className={`flex flex-wrap items-end gap-3 ${className}`}>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Child Store</label>
          <div className="w-56 md:w-64">
            <SearchableShopCombobox
              shops={adminChildShops}
              value={subShopId}
              onChange={(shopId) => {
                setSubShopId(shopId);
              }}
              placeholder="All child shops"
              aria-label="Child store scope"
              allowClear
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-end gap-3 ${className}`}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Parent Store</label>
        <div className="w-56 md:w-64">
          <SearchableShopCombobox
            shops={parentShops}
            value={parentShopId}
            onChange={(shopId) => {
              if (!shopId) return;
              setParentShopId(shopId);
              setSubShopId("");
            }}
            placeholder="Select parent store"
            aria-label="Parent store scope"
          />
        </div>
      </div>
      {mode === "ops" ? (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Sub Store</label>
          <div className="w-56 md:w-64">
            <SearchableShopCombobox
              shops={subShops}
              value={subShopId}
              onChange={(shopId) => {
                setSubShopId(shopId);
              }}
              placeholder="All sub shops"
              disabled={!parentShopId}
              allowClear
              aria-label="Sub store scope"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
