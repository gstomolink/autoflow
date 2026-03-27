import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}