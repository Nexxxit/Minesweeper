import { BrowserRouter, Routes, Route } from "react-router-dom"
import Settings from './components/settings/Settings';
import Menu from "./components/menu/Menu";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Game from "./components/game/Game";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  )
}
