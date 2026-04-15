export const USER_ROLES = {
  SUPER_ADMIN: 1,
  STORE_ADMIN: 2,
  STORE_STAFF: 3,
} as const;

export type AutoflowUser = {
  id: number;
  fullName: string;
  userId: string;
  email: string | null;
  phone?: string | null;
  role: number;
  shopId: string | null;
  staffType: string | null;
};

export function roleLabel(role: number): string {
  if (role === USER_ROLES.SUPER_ADMIN) return "Super Admin";
  if (role === USER_ROLES.STORE_ADMIN) return "Store Admin";
  if (role === USER_ROLES.STORE_STAFF) return "Store Staff";
  return `Role ${role}`;
}

const TOKEN_KEY = "autoflow_access_token";
const USER_KEY = "autoflow_user";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AutoflowUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AutoflowUser;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return Boolean(getStoredToken() && getStoredUser());
}

export function getAdminDashboardPath(): string {
  return "/admin/dashboard";
}

export function getPostLoginPath(role: number): string {
  if (role === USER_ROLES.SUPER_ADMIN) {
    return getAdminDashboardPath();
  }
  if (role === USER_ROLES.STORE_ADMIN || role === USER_ROLES.STORE_STAFF) {
    return getAdminDashboardPath();
  }
  return "/login";
}

export function resolveAfterLoginPath(
  nextParam: string | null,
  role: number,
): string {
  const fallback = getPostLoginPath(role);
  if (
    !nextParam ||
    !nextParam.startsWith("/") ||
    nextParam.startsWith("//")
  ) {
    return fallback;
  }
  return nextParam;
}
