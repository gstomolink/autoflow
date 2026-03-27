import CustomerSidebar from "@/components/layout/CustomerSidebar";
import CustomerHeader from "@/components/layout/CustomerHeader";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-white">
      <CustomerSidebar />
      <div className="flex-1 flex flex-col">
        <CustomerHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}