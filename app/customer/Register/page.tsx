"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Company Logo" className="h-14 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Join us today ✨ Create your account and start your smart ordering journey.
        </p>

        {/* Form */}
        <form className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder=""
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none border-gray-100 text-gray-700"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder=""
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none border-gray-100 text-gray-700"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder=""
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none border-gray-100 text-gray-700"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 accent-purple-600" />
            <p className="text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        {/* Sign in */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
}
