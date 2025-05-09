import Button from "../button/Button";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="sm:mb-20 mb-5">
        <p className="sm:text-7xl text-5xl text-yellow-300 font-bold ">
          Minesweeper
        </p>
      </div>
      <Link to={"/game"}>
        <Button className="w-60 md:w-80 xl:w-160 text-xl" btnText="Начать игру" />
      </Link>
      <Link to={"/leaderboard"}>
        <Button className="w-60 md:w-80 xl:w-160 text-xl" btnText="Таблица лидеров" />
      </Link>
      <Link to={"/settings"}>
        <Button className="w-60 md:w-80 xl:w-160 text-xl" btnText="Настройки" />
      </Link>
    </div>
  );
}
