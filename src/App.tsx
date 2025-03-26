import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./components/settings/Settings";
import Menu from "./components/menu/Menu";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Game from "./components/game/Game";
import PageNotFound from "./components/PageNotFound/404Page";

export default function App() {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="bg-purple-400 p-2 sm:p-10 md:p-15 lg:p-20 h-screen flex items-center justify-center">
      <BrowserRouter basename={base}>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
