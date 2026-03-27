import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

const products = [
  { name: 'Wireless Headphones', sales: 320 },
  { name: 'Smart Watch', sales: 250 },
  { name: 'Gaming Mouse', sales: 210 },
  { name: 'Bluetooth Speaker', sales: 180 },
];

export default function TopProducts() {
  const { t } = useAdminI18n();
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{t("topProducts")}</h2>

      <div className="space-y-3">
        {products.map((p, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-gray-700">{p.name}</span>
            <span className="font-semibold text-sky-600">
              {p.sales} {t("salesSuffix")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}