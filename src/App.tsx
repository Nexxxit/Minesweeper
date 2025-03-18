import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./components/settings/Settings";
import Menu from "./components/menu/Menu";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Game from "./components/game/Game";

export default function App() {
  return (
    <div className="bg-purple-400 p-20 h-screen flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
