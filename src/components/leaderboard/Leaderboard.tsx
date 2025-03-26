import Button from "../button/Button";
import { Link } from "react-router-dom";
import { leaderboardStore } from "../../stores/leaderboard.store";
import { observer } from "mobx-react-lite";

export default observer(function Leaderboard() {
  const listItems = leaderboardStore.formattedRecords.map((record, index) => (
    <li key={`${record.name}-${index}`} className="flex shadow-md flex-wrap sm:flex-nowrap sm:justify-none justify-between items-center bg-yellow-400 p-5 gap-5 rounded-xl">
      <div className="text-white font-bold text-xl sm:text-2xl sm:flex-grow min-w-0">{record.name}</div>
      <div className={`text-center text-xl sm:text-2xl shrink-0 order-2 sm:order-none w-[80px] sm:w-[120px] text-${record.level === "easy" ? 'white' : record.level === "medium" ? 'blue-500' : "red-500"} font-bold`}>{record.level}</div>
      <div className="text-white font-bold text-end shrink-0 text-xl sm:text-2xl">{record.time}</div>
    </li>
  ));

  return (
    <div className="flex flex-col gap-5 w-full md:w-150 lg:w-160 items-center">
      <p className="text-center text-3xl sm:text-5xl lg:text-6xl font-bold text-yellow-300">
        Таблица лидеров
      </p>
      <div className="border rounded-xl p-1 w-full h-100 overflow-y-auto scrollbar-hide bg-white/50">
        <ol className="flex flex-col gap-1 ">{listItems}</ol>
      </div>
      <Link className="w-full" to={"/"}>
        <Button className="w-full" btnText="В меню" />
      </Link>
    </div>
  );
});
