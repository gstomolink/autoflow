import { envConfig } from "@/config/env";
import { getStoredToken } from "./auth";
import { getScopedShopId } from "./shop-scope";

export function apiPath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const sid = getScopedShopId();
  if (!sid) return p;
  const sep = p.includes("?") ? "&" : "?";
  return `${p}${sep}shopId=${encodeURIComponent(sid)}`;
}

export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const url = `${envConfig.apiBaseUrl}/api${apiPath(path)}`;
  const token = getStoredToken();
  const headers = new Headers(init?.headers);
  if (
    init?.body !== undefined &&
    init.body !== null &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(url, { ...init, headers });
}
