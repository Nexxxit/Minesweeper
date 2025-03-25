import Button from "../button/Button";
import { Link } from "react-router-dom";
import { leaderboardStore } from "../../stores/leaderboard.store";
import { observer } from "mobx-react-lite";

export default observer(function Leaderboard() {
  const listItems = leaderboardStore.formattedRecords.map((record, index) => (
    <li key={`${record.name}-${index}`} className="flex items-center justify-between bg-yellow-400 p-5 rounded-xl">
      <div className="text-white font-bold text-3xl">{record.name}</div>
      <div className={`text-${record.level === "easy" ? 'white' : record.level === "medium" ? 'blue-500' : "red-500"} font-bold text-3xl`}>{record.level}</div>
      <div className="text-white font-bold text-3xl">{record.time}</div>
    </li>
  ));

  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="text-center text-7xl sm:text-5xl font-bold text-yellow-300">
        Таблица лидеров
      </p>
      <div className="border rounded-xl p-1 w-125 h-150 overflow-y-auto scrollbar-hide">
        <ol className="flex flex-col gap-1 ">{listItems}</ol>
      </div>
      <Link className="w-full" to={"/"}>
        <Button className="w-full" btnText="В меню" />
      </Link>
    </div>
  );
});
