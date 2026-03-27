export default function Recommendations() {
  const items = ["Smart Watch", "Headphones", "Sneakers", "Backpack"];

  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <h3 className="font-semibold mb-4 text-black">Recommended for You</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item} className="border rounded-lg p-3 text-center">
            <div className="h-20 bg-gray-100 rounded mb-2" />
            <p className="text-sm font-medium text-black">{item}</p>
            <button className="mt-2 text-xs px-2 py-1 rounded text-white bg-green-600 hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}