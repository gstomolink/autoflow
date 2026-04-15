"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getPostLoginPath,
  getStoredToken,
  getStoredUser,
  USER_ROLES,
} from "@/lib/auth";

type RequireAuthProps = {
  children: React.ReactNode;
  roles?: number[];
  fallbackPath?: string;
};

export default function RequireAuth({
  children,
  roles,
  fallbackPath = "/login",
}: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const rolesKey = roles?.join(",") ?? "";

  useEffect(() => {
    const token = getStoredToken();
    const user = getStoredUser();

    if (!token || !user) {
      router.replace(`${fallbackPath}?next=${encodeURIComponent(pathname || "/")}`);
      return;
    }

    if (roles?.length && !roles.includes(user.role)) {
      router.replace(getPostLoginPath(user.role));
      return;
    }

    setReady(true);
  }, [router, pathname, rolesKey, fallbackPath]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-slate-600">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}

export function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={[USER_ROLES.SUPER_ADMIN]} fallbackPath="/login">
      {children}
    </RequireAuth>
  );
}
