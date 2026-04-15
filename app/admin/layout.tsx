import AdminAuthLayout from "@/components/layout/AdminAuthLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthLayout>{children}</AdminAuthLayout>;
}