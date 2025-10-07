import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PlayerPage from "./pages/PlayerPage";
import CharacterPage from "./pages/CharacterPage";
import SkillPage from "./pages/SkillPage";
import ItemPage from "./pages/ItemPage";

function App() {
  const [page, setPage] = useState("player");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar currentPage={page} setPage={setPage} />
      <div className="p-6">
        {page === "player" && <PlayerPage />}
        {page === "character" && <CharacterPage />}
        {page === "skill" && <SkillPage />}
        {page === "item" && <ItemPage />}
      </div>
    </div>
  );
}

export default App;
