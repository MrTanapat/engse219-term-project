import React from "react";

function Navbar({ currentPage, setPage }) {
  const menu = [
    { id: "player", label: "🧑 Player" },
    { id: "character", label: "⚔️ Character" },
    { id: "skill", label: "🧠 Skill" },
    { id: "item", label: "🛡️ Item" },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 rounded-2xl shadow-lg mb-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-wide">
        🎮 RPG Database Manager
      </h1>
      <div className="space-x-3">
        {menu.map((m) => (
          <button
            key={m.id}
            onClick={() => setPage(m.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              currentPage === m.id
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
