interface Props {
  title: string;
  value: string;
  change?: string;
}

export default function StatCard({ title, value, change }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      {change && (
        <p className="text-sm text-green-600 mt-1 font-medium">{change}</p>
      )}
    </div>
  );
}