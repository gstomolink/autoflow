'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TranslationKey, useAdminI18n } from "./AdminI18nProvider";
import { USER_ROLES, getStoredUser } from "@/lib/auth";

const menu: { key: TranslationKey; href: string }[] = [
  { key: "menuDashboard", href: "/admin/dashboard" },
  // { key: "menuWarehouse", href: "/admin/warehouses" },
  { key: "menuShops", href: "/admin/shops" },
  { key: "menuCategories", href: "/admin/categories" },
  { key: "menuProducts", href: "/admin/products" },
  { key: "menuInventory", href: "/admin/inventory" },
  { key: "menuInventoryOrders", href: "/admin/inventory-orders" },
  { key: "menuCustomerOrders", href: "/admin/orders" },
  // { name: "Customers", href: "/admin/customers" },
  { key: "menuSuppliers", href: "/admin/suppliers" },
  // { name: "Purchases", href: "/admin/purchases" },
  // { name: "Reports", href: "/admin/reports" },
  { key: "menuUsersRoles", href: "/admin/users-roles" },
  { key: "menuSettings", href: "/admin/settings" },
  // { name: "Audit Logs", href: "/admin/audit-logs" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useAdminI18n();
  const user = getStoredUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const visibleMenu = menu.filter((item) => {
    if (user?.role === USER_ROLES.SUPER_ADMIN) return true;
    if (user?.role === USER_ROLES.STORE_ADMIN) {
      return item.href !== "/admin/settings";
    }
    if (user?.role === USER_ROLES.STORE_STAFF) {
      return [
        "/admin/dashboard",
        "/admin/inventory",
        "/admin/inventory-orders",
        "/admin/orders",
      ].includes(item.href);
    }
    return true;
  });

  const confirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/login");
    setShowLogoutModal(false);
  };

  return (
    <aside className="w-56 h-screen sticky top-0
      bg-[#0F172A] text-slate-200 border-r border-slate-800 flex flex-col">
      
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <img src="/logo.jpg" alt="Logo" className="h-16 mb-2 m-auto" />
        <h2 className="text-lg font-bold tracking-wide text-center text-slate-200">{t("adminPanel")}</h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visibleMenu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition font-bold tracking-wide
                ${
                  active
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
            >
              {t(item.key)}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full text-left px-4 py-2 rounded-lg font-bold tracking-wide
                     hover:bg-red-500/20 text-red-400 inline-flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l5-5m0 0-5-5m5 5H9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
          </svg>
          <span>{t("logout")}</span>
        </button>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] p-4">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-5">
            <h3 className="text-lg font-semibold text-slate-800">Confirm Logout</h3>
            <p className="text-sm text-slate-600 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-rose-500 text-rose-50 hover:bg-rose-600 transition-colors"
              >
                {t("logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}