"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getPostLoginPath,
  getStoredUser,
  isLoggedIn,
} from "@/lib/auth";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    const user = getStoredUser();
    if (user) {
      router.replace(getPostLoginPath(user.role));
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-slate-600">
      Loading…
    </div>
  );
}
