import { useEffect, useState } from "react";

interface CellProps {
  id: number;
  col: number;
  row: number;
  hasBomb: boolean;
  bombCount: number;
  checkNearbyCells: (row: number, col: number) => void;
  isOpenCell: Set<number>;
}

export default function Cell({
  id,
  col,
  row,
  hasBomb,
  bombCount,
  checkNearbyCells,
  isOpenCell,
}: CellProps) {
  const [textColor, setTextColor] = useState<string>("");

  useEffect(() => {
    changeTextColor(bombCount);
  }, [bombCount])

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
    checkNearbyCells(row, col);
  };

  return (
    <div
      className={`border border-3 shadow-xl ${isOpenCell.has(id) ? "bg-gray-400" : ""} border-gray-300 ring-1 w-full h-full flex items-center justify-center cursor-pointer`}
      onClick={handleOpenCell}
    >
      <p className={`${textColor} font-bold text-xl`}>
        {isOpenCell.has(id)
          ? hasBomb
            ? "💣"
            : bombCount !== undefined && bombCount > 0
            ? `${bombCount}`
            : ""
          : ""}
      </p>
    </div>
  );
}
