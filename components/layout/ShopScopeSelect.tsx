'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { LIST_FETCH_LIMIT, readPaginatedJson } from "@/lib/paginated";
import {
  SHOP_SCOPE_CHANGE_EVENT,
  clearScopedShopId,
  getScopedShopId,
  setScopedShopId,
  type ShopListEntry,
} from "@/lib/shop-scope";
import SearchableShopCombobox from "./SearchableShopCombobox";

export default function ShopScopeSelect() {
  const router = useRouter();
  const user = getStoredUser();
  const isSuperAdmin = user?.role === USER_ROLES.SUPER_ADMIN;

  const [shops, setShops] = useState<ShopListEntry[]>([]);
  const [selectedShopId, setSelectedShopId] = useState("");

  useEffect(() => {
    if (!isSuperAdmin) return;
    setSelectedShopId(getScopedShopId() ?? "");

    const syncFromScope = () => {
      setSelectedShopId(getScopedShopId() ?? "");
    };
    window.addEventListener(SHOP_SCOPE_CHANGE_EVENT, syncFromScope);
    window.addEventListener("storage", syncFromScope);
    return () => {
      window.removeEventListener(SHOP_SCOPE_CHANGE_EVENT, syncFromScope);
      window.removeEventListener("storage", syncFromScope);
    };
  }, [isSuperAdmin]);

  useEffect(() => {
    if (!isSuperAdmin) return;
    void (async () => {
      const r = await apiFetch(`/shops?page=1&limit=${LIST_FETCH_LIMIT}`);
      if (!r.ok) {
        setShops([]);
        return;
      }
      const body = await readPaginatedJson<ShopListEntry>(r);
      setShops(body.items);
    })();
  }, [isSuperAdmin]);

  if (!isSuperAdmin) {
    return null;
  }

  return (
    <div className="w-[280px]">
      <SearchableShopCombobox
        shops={shops}
        value={selectedShopId}
        onChange={(shopId) => {
          if (!shopId) {
            clearScopedShopId();
            setSelectedShopId("");
          } else {
            setScopedShopId(shopId);
            setSelectedShopId(shopId);
          }
          router.refresh();
        }}
        placeholder="Select shop"
        allowClear
        aria-label="Shop scope"
      />
    </div>
  );
}