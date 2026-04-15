import { USER_ROLES, getStoredUser } from "./auth";

const KEY = "autoflow_shop_scope";

export const SHOP_SCOPE_CHANGE_EVENT = "autoflow-shop-scope-change";

function notifyShopScopeChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SHOP_SCOPE_CHANGE_EVENT));
}

export function getScopedShopId(): string | null {
  if (typeof window === "undefined") return null;
  const user = getStoredUser();
  if (!user) return null;
  if (user.role !== USER_ROLES.SUPER_ADMIN) {
    return user.shopId;
  }
  return sessionStorage.getItem(KEY);
}

export function setScopedShopId(shopId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, shopId);
  notifyShopScopeChange();
}

export function clearScopedShopId() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
  notifyShopScopeChange();
}

export type ShopListEntry = {
  name: string;
  shopId: string;
  address: string | null;
};

export function formatShopSelectLabel(shop: ShopListEntry): string {
  const addr = shop.address?.trim();
  if (addr) {
    return `${shop.name} (${shop.shopId}) [${addr}]`;
  }
  return `${shop.name} (${shop.shopId})`;
}

export function filterShopsByQuery(
  shops: ShopListEntry[],
  query: string,
): ShopListEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return shops;
  return shops.filter((s) => {
    const blob = `${s.name} ${s.shopId} ${s.address ?? ""}`.toLowerCase();
    return blob.includes(q);
  });
}
