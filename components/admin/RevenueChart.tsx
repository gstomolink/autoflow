const data = [40, 65, 55, 80, 75, 95, 70, 85, 60, 90, 100, 110];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue Overview</h2>

      <div className="flex items-end gap-3 h-56">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-sky-300 to-blue-400 rounded-t-md"
              style={{ height: `${value * 1.5}px` }}
            />
            <span className="text-xs text-gray-500 mt-2">M{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}