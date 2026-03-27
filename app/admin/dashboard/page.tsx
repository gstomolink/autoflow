
import StatCard from "@/components/admin/StatCard";
import RevenueChart from "@/components/admin/RevenueChart";
import TopProducts from "@/components/admin/TopProducts";
import LowStockAlerts from "@/components/admin/LowStockAlerts";

export default function AdminDashboardPage() {
  return (
    <div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Sales Today"
          value="$12,540"
          change="+12% from yesterday"
        />
        <StatCard
          title="Orders Count"
          value="326"
          change="+8% growth"
        />
        <StatCard
          title="Total Revenue"
          value="$320,845"
        />
        <StatCard
          title="Active Customers"
          value="1,240"
        />
      </div>

      {/* Charts & Side Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <LowStockAlerts />
      </div>

      {/* Bottom Section */}
      <TopProducts />
    </div>
  );
}