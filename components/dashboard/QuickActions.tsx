export default function QuickActions() {
  const actions = [
    "Browse Products",
    "Reorder Last Purchase",
    "Track an Order",
    "View Cart",
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <h3 className="font-semibold mb-4 text-black">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a}
            className="py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}