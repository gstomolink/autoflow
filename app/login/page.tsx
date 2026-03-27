"use client";
import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Company Logo" className="h-14 object-contain" />
        </div>

        {/* Welcome Text */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Great to see you again 👋 Log in to continue your smart ordering journey.
        </p>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setRole("customer")}
            className={`w-1/2 py-2 rounded-md font-medium transition ${
              role === "customer"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow"
                : "text-gray-600"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`w-1/2 py-2 rounded-md font-medium transition ${
              role === "admin"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow"
                : "text-gray-600"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none border-gray-100 text-gray-700"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-purple-500 focus:outline-none border-gray-100 text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                👁
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-purple-600" />
              Remember me
            </label>
            <a href="#" className="text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
          >
            Login as {role === "customer" ? "Customer" : "Admin"}
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="customer/Register" className="text-purple-600 font-medium hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}