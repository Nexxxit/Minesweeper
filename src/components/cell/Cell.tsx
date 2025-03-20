import { useState } from "react";

interface CellProps {
  id: number;
  col: number;
  row: number;
  hasBomb: boolean;
}

export default function Cell({ id, col, row, hasBomb }: CellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border border-3 shadow-xl border-gray-300 ring-1 w-full h-full flex items-center justify-center cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      {isOpen ? (hasBomb ? "💣" : `${row}, ${col}`) : "?"}
    </div>
  );
}
