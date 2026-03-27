type Props = {
  title: string;
  value: string;
  icon: string;
};

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}