import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PlayerPage from "./pages/PlayerPage";
import CharacterPage from "./pages/CharacterPage";
import SkillPage from "./pages/SkillPage";
import ItemPage from "./pages/ItemPage";

function App() {
  const [page, setPage] = useState("player");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Navbar currentPage={page} setPage={setPage} />
      {page === "player" && <PlayerPage />}
      {page === "character" && <CharacterPage />}
      {page === "skill" && <SkillPage />}
      {page === "item" && <ItemPage />}
    </div>
  );
}

export default App;
