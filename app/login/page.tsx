"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (role === "admin") {
      router.push("/admin/dashboard");
      return;
    }
    router.push("/customer/dashboard");
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
              Enter your email and password to login to your dashboard.
            </p>

            {/* <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setRole("customer")}
                className={`w-1/2 py-2 rounded-md font-medium transition ${
                  role === "customer" ? "bg-sky-500 text-sky-50" : "text-slate-600"
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`w-1/2 py-2 rounded-md font-medium transition ${
                  role === "admin" ? "bg-sky-500 text-sky-50" : "text-slate-600"
                }`}
              >
                Admin
              </button>
            </div> */}

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="info@example.com"
                  className="w-full px-4 py-2.5 border rounded-lg border-slate-300 text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 border rounded-lg pr-10 border-slate-300 text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
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
                className="w-full py-2.5 rounded-lg font-semibold text-sky-50 bg-sky-500 hover:bg-sky-600 transition-colors"
              >
                Sign In
              </button>
            </form>

            
          </div>
      </div>
    </div>
  );
}