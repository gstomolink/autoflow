"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import {
  SHOP_SCOPE_CHANGE_EVENT,
  clearScopedShopId,
  getScopedShopId,
  setScopedShopId,
  type ShopListEntry,
} from "@/lib/shop-scope";
import SearchableShopCombobox from "./SearchableShopCombobox";
import { useAdminI18n } from "./AdminI18nProvider";

export default function ShopScopeSelect() {
  const { t } = useAdminI18n();
  const router = useRouter();
  const user = getStoredUser();
  const [shops, setShops] = useState<ShopListEntry[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (user?.role !== USER_ROLES.SUPER_ADMIN) return;
    const syncValue = () => setValue(getScopedShopId() ?? "");
    syncValue();
    window.addEventListener(SHOP_SCOPE_CHANGE_EVENT, syncValue);
    void (async () => {
      const r = await apiFetch("/shops");
      if (r.ok) {
        setShops((await r.json()) as ShopListEntry[]);
      }
    })();
    return () => window.removeEventListener(SHOP_SCOPE_CHANGE_EVENT, syncValue);
  }, [user?.role]);

  if (!user || user.role !== USER_ROLES.SUPER_ADMIN) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-slate-700">
      <span className="text-slate-500 shrink-0">Shop</span>
      <SearchableShopCombobox
        shops={shops}
        value={value}
        onChange={(id) => {
          setValue(id);
          if (id) setScopedShopId(id);
          else clearScopedShopId();
          router.refresh();
        }}
        placeholder={t("shopGateSelectPlaceholder")}
        aria-label="Active shop"
        className="max-w-[min(22rem,100%)] min-w-[12rem]"
      />
    </div>
  );
}
