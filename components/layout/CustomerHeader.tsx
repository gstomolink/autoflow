export default function CustomerHeader() {
  return (
    <header className="h-16 bg-white backdrop-blur-lg border-b border-white/20 flex items-center justify-between px-6 text-black">
      <h1 className="text-lg font-semibold">Company Name</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1.5 rounded-lg text-black"
        />
        <span>🔔</span>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
            alt="avatar"
          />
          <span>John</span>
        </div>
      </div>
    </header>
  );
}