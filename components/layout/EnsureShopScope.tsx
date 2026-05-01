"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { LIST_FETCH_LIMIT, readPaginatedJson } from "@/lib/paginated";
import { getScopedShopId, setScopedShopId } from "@/lib/shop-scope";

type ShopRow = {
  shopId: string;
  parentShopId: string | null;
};

export default function EnsureShopScope({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getStoredUser();
  const isSuperAdmin = user?.role === USER_ROLES.SUPER_ADMIN;
  const [ready, setReady] = useState(!isSuperAdmin);

  useEffect(() => {
    if (!isSuperAdmin) return;
    const current = getScopedShopId();
    if (current) {
      setReady(true);
      return;
    }
    void (async () => {
      try {
        const r = await apiFetch(`/shops?page=1&limit=${LIST_FETCH_LIMIT}`);
        if (!r.ok) {
          setReady(true);
          return;
        }
        const body = await readPaginatedJson<ShopRow>(r);
        const parents = body.items.filter((row) => !row.parentShopId);
        const fallback = parents[0]?.shopId ?? body.items[0]?.shopId;
        if (fallback) {
          setScopedShopId(fallback);
        }
      } finally {
        setReady(true);
      }
    })();
  }, [isSuperAdmin]);

  if (!ready) {
    return <div className="text-sm text-slate-500">Loading store scope...</div>;
  }
  return <>{children}</>;
}
