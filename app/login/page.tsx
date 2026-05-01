"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { envConfig } from "@/config/env";
import { getStoredUser, isLoggedIn, resolveAfterLoginPath } from "@/lib/auth";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [shopId, setShopId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoggedIn()) return;
    const user = getStoredUser();
    if (user) {
      const next = searchParams.get("next");
      router.replace(resolveAfterLoginPath(next, user.role));
    }
  }, [router, searchParams]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${envConfig.apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
          shopId: shopId.trim() || undefined,
        }),
      });

      if (!response.ok) {
        let message = "Login failed";
        try {
          const err = await response.json();
          if (Array.isArray(err?.message)) {
            message = err.message.join(", ");
          } else if (typeof err?.message === "string") {
            message = err.message;
          } else if (typeof err?.error === "string") {
            message = err.error;
          }
        } catch {
          message = await response.text();
        }
        throw new Error(message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("autoflow_access_token", data.accessToken);
      localStorage.setItem("autoflow_user", JSON.stringify(data.user));
      const next = searchParams.get("next");
      router.push(
        resolveAfterLoginPath(next, data.user.role as number),
      );
    } catch (e) {
      const msg =
        e instanceof Error && e.message
          ? e.message
          : "Invalid credentials. Check user id, password, and shop id.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-[#0F172A] p-10 lg:p-12 text-slate-100 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <img src="/logo.jpg" alt="Autoflow logo" className="h-14 w-14 rounded-lg mb-6 mx-auto" />
            <h1 className="text-4xl font-bold text-white">Autoflow ERP</h1>
            <p className="text-slate-200 mt-4 leading-relaxed">
              Manage products, inventory, warehouses, suppliers, and orders from one place.
            </p>
          </div>
        </div>

      <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Log In</h2>
            <p className="text-slate-500 mb-6">
              Enter your user id and password to login to your dashboard.
            </p>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="admin"
                  className="w-full px-4 py-2.5 border rounded-lg border-slate-300 text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 border rounded-lg pr-10 border-slate-300 text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    👁
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Shop ID (leave empty for super admin)
                </label>
                <input
                  type="text"
                  value={shopId}
                  onChange={(e) => setShopId(e.target.value)}
                  placeholder="shop-001"
                  className="w-full px-4 py-2.5 border rounded-lg border-slate-300 text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {errorMessage ? (
                <p className="text-sm text-red-600">{errorMessage}</p>
              ) : null}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="accent-sky-500" />
                  Remember me
                </label>
                <a href="#" className="text-sky-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg font-semibold text-sky-50 bg-sky-500 hover:bg-sky-600 transition-colors"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            
          </div>
      </div>
    </div>
  );
}