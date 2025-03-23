import { useEffect, useState } from "react";

interface CellProps {
  id: number;
  col: number;
  row: number;
  hasBomb: boolean;
  hasMark: "flag" | "question" | "non";
  bombAround: number;
  checkNearbyCells: (row: number, col: number) => void;
  setMark: (row: number, col: number) => void;
  isOpenCell: Set<number>;
}

export default function Cell({
  id,
  col,
  row,
  hasBomb,
  hasMark,
  bombAround,
  checkNearbyCells,
  setMark,
  isOpenCell,
}: CellProps) {
  const [textColor, setTextColor] = useState<string>("");

  useEffect(() => {
    changeTextColor(bombAround);
  }, [bombAround]);

  const changeTextColor = (count: number) => {
    switch (count) {
      case 1:
        setTextColor("text-blue-500");
        break;
      case 2:
        setTextColor("text-green-500");
        break;
      case 3:
        setTextColor("text-red-500");
        break;
      case 4:
        setTextColor("text-blue-800");
        break;
      case 5:
        setTextColor("text-yellow-700");
        break;
      case 6:
        setTextColor("text-cyan-400");
        break;
      case 7:
        setTextColor("text-stone-950");
        break;
      case 8:
        setTextColor("text-neutral-50");
        break;
      default:
        setTextColor("");
    }
  };

  const handleOpenCell = () => {
    if (hasMark !== "non") return;
    if(isOpenCell.has(id)) return;
    checkNearbyCells(row, col);
  };

  const handleSetMark = (e: React.MouseEvent) => {
    e.preventDefault();
    if(isOpenCell.has(id)) return;
    setMark(row, col);
  };

  return (
    <div
      className={`border border-3 shadow-xl ${
        isOpenCell.has(id) ? (hasBomb ? "bg-red-400" : "bg-gray-400") : ""
      } border-gray-300 ring-1 w-full h-full flex items-center justify-center cursor-pointer`}
      onClick={handleOpenCell}
      onContextMenu={handleSetMark}
    >
      <p className={`${textColor} font-bold text-xl`}>
        {isOpenCell.has(id)
          ? hasBomb
            ? "💣"
            : bombAround !== undefined && bombAround > 0
            ? `${bombAround}`
            : ""
          : hasMark === "flag"
          ? "🚩"
          : hasMark === "question"
          ? "❓"
          : ""}
      </p>
    </div>
  );
}
