import { useEffect, useState } from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  const [records, setRecords] = useState<{ name: string; time: string }[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("leaderboard");

    const convertTime = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const remainingSeconds = totalSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
    
        if (hours > 0) {
          return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        }
    
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    if (storedData) {
      try {
        const parseData: { name: string; time: number }[] =
          JSON.parse(storedData);
        const newRecord = parseData.map(data => ({
           name: data.name,
           time: convertTime(data.time)
        }));
        setRecords(newRecord);
      } catch (error) {
        console.error("Ошибка при чтении рекордов:", error);
      }
    }
  }, []);

  const listItems = records.map((record, index) => (
    <li key={`${record.name}-${index}`} className="flex items-center justify-between bg-yellow-400 p-5 rounded-xl">
      <div className="text-white font-bold text-3xl">{record.name}</div>
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
}
