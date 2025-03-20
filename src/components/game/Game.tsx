import { useEffect, useState } from "react";
import Cell from "../cell/Cell";

interface CellData {
  id: number;
  row: number;
  col: number;
  hasBomb: boolean;
}

export default function Game() {
  const [roundTime, setRoundTime] = useState<string>("10:00");
  const [rows, setRows] = useState<number>(8);
  const [cols, setCols] = useState<number>(8);
  const [cellData, setCellData] = useState<CellData[]>([]);

  useEffect(() => {
    const gameMode = () => {
      const mode = localStorage.getItem("selectedOption");
      if (mode === "easy") {
        setRoundTime("10:00");
        setCols(8);
        setRows(8);
      } else if (mode === "medium") {
        setRoundTime("40:00");
        setCols(16);
        setRows(16);
      } else if (mode === "hard") {
        setRoundTime("1:40:00");
        setCols(32);
        setRows(16);
      }
    };

    gameMode();
  }, []);

  useEffect(() => {
    const generateCells = () => {
      let newCells: CellData[] = [];
      const totalCells = rows * cols;
      for (let i = 0; i < totalCells; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        let hasBomb = false;
        if (Math.random() >= 0.6) {
          hasBomb = true;
        }
        newCells.push({ id: i, row, col, hasBomb });
      }
      setCellData(newCells);
    };
  
    generateCells();
  }, [rows, cols]);

  return (
    <div
      className="grid gap-1 border rounded-lg bg-gray-400"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(50px, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(50px, 1fr))`,
      }}
    >
      {cellData.map((cell) => (
        <Cell
          key={cell.id}
          id={cell.id}
          col={cell.col}
          row={cell.row}
          hasBomb={cell.hasBomb}
        />
      ))}
    </div>
  );
}
