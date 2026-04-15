"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";
import { AdminI18nProvider } from "@/components/layout/AdminI18nProvider";
import SuperAdminShopGate from "@/components/layout/SuperAdminShopGate";
import RequireAuth from "@/components/auth/require-auth";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="h-screen flex bg-gray-100 overflow-hidden">
        <AdminI18nProvider>
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-6">
              <SuperAdminShopGate>{children}</SuperAdminShopGate>
            </main>
          </div>
        </AdminI18nProvider>
      </div>
    </RequireAuth>
  );
}
