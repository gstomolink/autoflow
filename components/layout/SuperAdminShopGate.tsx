"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { USER_ROLES, getStoredUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { LIST_FETCH_LIMIT, readPaginatedJson } from "@/lib/paginated";
import { getScopedShopId, setScopedShopId } from "@/lib/shop-scope";
import SearchableShopCombobox from "./SearchableShopCombobox";
import { useAdminI18n } from "./AdminI18nProvider";


const INCLUDED_PATHS = ["/admin/inventory", "/admin/inventory-orders", "/admin/orders", "/admin/users-roles"];

function isIncludedPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return INCLUDED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

type ShopRow = { shopId: string; name: string; address: string | null };

export default function SuperAdminShopGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useAdminI18n();
  const user = getStoredUser();
  const included = isIncludedPath(pathname);

  const needsPick = useMemo(
    () =>
      user?.role === USER_ROLES.SUPER_ADMIN &&
      included,
    [user?.role, included],
  );

  const [activeShop, setActiveShop] = useState<string | null>(null);
  const [shops, setShops] = useState<ShopRow[]>([]);
  const [choice, setChoice] = useState("");
  const [loadError, setLoadError] = useState("");
  const [loadingShops, setLoadingShops] = useState(false);

  const refreshLocal = useCallback(() => {
    setActiveShop(getScopedShopId());
  }, []);

  useEffect(() => {
    refreshLocal();
  }, [pathname, refreshLocal]);

  useEffect(() => {
    if (!needsPick) return;
    setLoadingShops(true);
    setLoadError("");
    void (async () => {
      try {
        const r = await apiFetch(
          `/shops?page=1&limit=${LIST_FETCH_LIMIT}`,
        );
        if (!r.ok) {
          setLoadError(await r.text());
          setShops([]);
          return;
        }
        const body = await readPaginatedJson<ShopRow>(r);
        setShops(body.items);
      } catch {
        setLoadError("Could not load shops");
        setShops([]);
      } finally {
        setLoadingShops(false);
      }
    })();
  }, [needsPick]);

  const applyShop = () => {
    const v = choice.trim();
    if (!v) return;
    setScopedShopId(v);
    setActiveShop(v);
    router.refresh();
  };

  if (!needsPick) {
    return <>{children}</>;
  }

  if (activeShop) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/60 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-900">
            {t("shopGateTitle")}
          </h2>
          <p className="mt-2 text-sm text-slate-600">{t("shopGateHint")}</p>

          {loadError ? (
            <p className="mt-3 text-sm text-rose-600">{loadError}</p>
          ) : null}

          <div className="mt-4 space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              {t("shopGateSelectLabel")}
            </label>
            <SearchableShopCombobox
              shops={shops}
              value={choice}
              onChange={setChoice}
              placeholder={t("shopGateSelectPlaceholder")}
              disabled={loadingShops}
              id="super-admin-shop-gate"
              aria-label={t("shopGateSelectLabel")}
              className="w-full"
              inputClassName="py-2"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/admin/shops"
              className="text-sm font-medium text-sky-600 hover:underline"
            >
              {t("shopGateRegisterLink")}
            </Link>
            <button
              type="button"
              disabled={!choice.trim()}
              onClick={applyShop}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-40"
            >
              {t("shopGateContinue")}
            </button>
          </div>

          {loadingShops ? (
            <p className="mt-4 text-sm text-slate-500">{t("shopGateLoading")}</p>
          ) : null}
        </div>
      </div>
    </>
  );
}
