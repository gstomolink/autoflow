import StatCard from "@/components/dashboard/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentOrders from "@/components/dashboard/RecentOrders";
import Recommendations from "@/components/dashboard/Recommendations";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="text-black">
        <h2 className="text-2xl font-bold">Welcome back, John 👋</h2>
        <p className="text-black/80">
          Here’s what’s happening with your orders today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value="24" icon="📦" />
        <StatCard title="Pending" value="3" icon="⏳" />
        <StatCard title="Shipped" value="5" icon="🚚" />
        <StatCard title="Delivered" value="16" icon="✅" />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Orders */}
      <RecentOrders />

      {/* Recommendations */}
      <Recommendations />
    </div>
  );
}