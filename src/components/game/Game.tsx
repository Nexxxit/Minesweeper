import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cell from "../cell/Cell";
import Timer from "../timer/Timer";
import Button from "../button/Button";
import BombCounter from "../bombCounter/BombCounter";

interface CellData {
  id: number;
  row: number;
  col: number;
  hasBomb: boolean;
  hasMark: "flag" | "question" | "non";
  bombAround: number;
}

export default function Game() {
  const [roundTime, setRoundTime] = useState<string>("10:00");
  const [rows, setRows] = useState<number>(8);
  const [cols, setCols] = useState<number>(8);
  const [cellData, setCellData] = useState<CellData[]>([]);
  const [openedCell, setOpenedCell] = useState<Set<number>>(new Set());
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean | null>(null);
  const [currentTime, setCurrentTime] = useState<number>();
  const [gameKey, setGameKey] = useState<number>(0);
  const [initialTimeSeconds, setInitialTimeSeconds] = useState<number>(0);

  const restartGame = useCallback(() => {
    setIsGameOver(false);
    setWin(null);
    setOpenedCell(new Set());
    setCurrentTime(0);
    setGameKey((prev) => prev + 1);

    const parseTime = (timeString: string): number => {
      const parts = timeString.split(":").map(Number);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      return 0;
    };

    const mode = localStorage.getItem("selectedOption") || "easy";
    switch (mode) {
      case "easy":
        setRoundTime("10:00");
        setInitialTimeSeconds(parseTime("10:00"));
        setCols(8);
        setRows(8);
        break;
      case "medium":
        setRoundTime("40:00");
        setInitialTimeSeconds(parseTime("40:00"));
        setCols(16);
        setRows(16);
        break;
      case "hard":
        setRoundTime("1:40:00");
        setInitialTimeSeconds(parseTime("1:40:00"));
        setCols(32);
        setRows(16);
        break;
    }
  }, []);

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    const generateCells = () => {
      let newCells: CellData[] = [];
      const totalCells = rows * cols;
      for (let i = 0; i < totalCells; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        let hasBomb = false;
        if (Math.random() >= 0.8) {
          hasBomb = true;
        }
        newCells.push({
          id: i,
          row,
          col,
          hasBomb,
          hasMark: "non",
          bombAround: 0,
        });
      }
      setCellData(newCells);
    };

    generateCells();
  }, [rows, cols, gameKey]);

  const direction = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const checkCells = (row: number, col: number): number => {
    let count = 0;
    direction.forEach(([dx, dy]) => {
      let newRow = row + dx;
      let newCol = col + dy;

      if (0 <= newRow && newRow < rows && 0 <= newCol && newCol < cols) {
        const cell = cellData.find(
          (cell) => cell.row === newRow && cell.col === newCol
        );
        if (cell?.hasBomb) count++;
      }
    });
    return count;
  };

  const openNearbyCells = (
    row: number,
    col: number,
    temporaryOpened: Set<number>
  ) => {
    const currentCell = cellData.find(
      (cell) => cell.row === row && cell.col === col
    );

    if (!currentCell || temporaryOpened.has(currentCell.id)) return;

    temporaryOpened.add(currentCell.id);

    const countBombs = checkCells(row, col);

    if (countBombs > 0) return;

    direction.forEach(([dx, dy]) => {
      let newRow = row + dx;
      let newCol = col + dy;

      if (0 <= newRow && newRow < rows && 0 <= newCol && newCol < cols) {
        openNearbyCells(newRow, newCol, temporaryOpened);
      }
    });
  };

  const checkNearbyCells = (row: number, col: number) => {
    if (isGameOver) return;

    const currentCell = cellData.find(
      (cell) => cell.row === row && cell.col === col
    );
    if (currentCell?.hasBomb) {
      setIsGameOver(true);

      const allBombs = getAllBombs();
      setOpenedCell(new Set([...openedCell, ...allBombs]));
      return;
    }

    const temporaryOpened = new Set(openedCell);
    openNearbyCells(row, col, temporaryOpened);

    const updatedCellData = cellData.map((cell) => {
      if (temporaryOpened.has(cell.id)) {
        return { ...cell, bombAround: checkCells(cell.row, cell.col) };
      }
      return cell;
    });
    setCellData(updatedCellData);
    setOpenedCell(new Set(temporaryOpened));
  };

  const setMark = (row: number, col: number) => {
    if (isGameOver) return;
    const flagEqualBombs = getAllBombs().length === getAllFlags().length;
    const allFlags = getAllFlags();

    const updatedCellData = cellData.map((cell) => {
      if (
        cell.row === row &&
        cell.col === col &&
        flagEqualBombs &&
        !allFlags.includes(cell.id)
      ) {
        return {
          ...cell,
          hasMark: (cell.hasMark === "question"
            ? "non"
            : cell.hasMark === "non"
            ? "question"
            : "non") as "question" | "non",
        };
      } else {
        if(cell.row === row && cell.col === col) {
          return {
            ...cell,
            hasMark: (cell.hasMark === "flag"
              ? "question"
              : cell.hasMark === "question"
              ? "non"
              : "flag") as "flag" | "question" | "non",
          };
        }
      }
      return cell;
    });
    setCellData(updatedCellData);
  };

  const getAllBombs = () => {
    return cellData.filter((cell) => cell.hasBomb).map((cell) => cell.id);
  };

  const getAllFlags = () => {
    return cellData
      .filter((cell) => cell.hasMark === "flag")
      .map((cell) => cell.id);
  };

  const checkWinOrLose = () => {
    const bombs = getAllBombs();
    const isLose = bombs.some((bombId) => openedCell.has(bombId));

    const safeCells = cellData
      .filter((cell) => !cell.hasBomb)
      .map((cell) => cell.id);

    const isWin =
      safeCells.length > 0 &&
      safeCells.every((cellId) => openedCell.has(cellId));

    const flagedCells = cellData
      .filter((cell) => cell.hasMark === "flag")
      .map((cell) => cell.id);

    const isWinFlag =
      bombs.length > 0 &&
      bombs.length === flagedCells.length &&
      bombs.every((bombId) => flagedCells.includes(bombId));

    if (isLose) {
      setIsGameOver(true);
      setWin(false);
      return;
    }

    if (isWin || isWinFlag) {
      setIsGameOver(true);
      setWin(true);
      makeNewRecord();
      return;
    }
  };

  const timeEnd = () => {
    if (!isGameOver) {
      setIsGameOver(true);
      setWin(false);
      setCurrentTime(0);
    }
  };

  useEffect(() => {
    checkWinOrLose();
  }, [openedCell, cellData]);

  const updateTime = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const makeNewRecord = () => {
    if (win !== true || !currentTime) return;
    const timeSpent = initialTimeSeconds - currentTime;

    const enterName = prompt("Введите ваше имя:");
    if (!enterName) return;

    const storedRecords = localStorage.getItem("leaderboard");
    const records: { name: string; time: number }[] = storedRecords
      ? JSON.parse(storedRecords)
      : [];

    const newRecord = { name: enterName, time: timeSpent };
    const updatedRecords = [...records, newRecord]
      .sort((a, b) => a.time - b.time)
      .slice(0, 10);

    localStorage.setItem("leaderboard", JSON.stringify(updatedRecords));
  };

  useEffect(() => {
    if (win === true) {
      makeNewRecord();
    }
  }, [win]);

  return (
    <div className="flex flex-col gap-5 relative">
      <div className="flex items-center justify-between">
        <Timer
          key={gameKey}
          initialTime={roundTime}
          onTimeEnd={timeEnd}
          onTimeUpdate={updateTime}
          gameOver={isGameOver}
        />
        <BombCounter
          bombCount={getAllBombs().length}
          flagsSet={getAllFlags().length}
        />
      </div>
      <div
        className="grid gap-1 border rounded-lg bg-gray-200"
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
            hasMark={cell.hasMark}
            bombAround={cell.bombAround}
            isOpenCell={openedCell}
            checkNearbyCells={checkNearbyCells}
            setMark={setMark}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Link to="/">
          <Button className="w-60" btnText="В меню" />
        </Link>
        <Button
          className="w-60"
          btnText="Перезапустить"
          onClick={restartGame}
        />
      </div>
    </div>
  );
}
