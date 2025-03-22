import { useEffect, useState } from "react";

interface TimeProps {
  initialTime: string;
  gameOver: boolean;
  onTimeEnd: () => void;
}

export default function Timer({ initialTime, onTimeEnd, gameOver }: TimeProps) {
  const parseTime = (timeString: string): number => {
    const parts = timeString.split(":").map(Number);

    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }

    return 0;
  };

  const [timeLeft, setTimeLeft] = useState(parseTime(initialTime));

  useEffect(() => {
    setTimeLeft(parseTime(initialTime));
  }, [initialTime]);

  const formatTime = (totalSeconds: number): string => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if(gameOver) return prev;
        if(prev <= 0){
            onTimeEnd();
            return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeEnd]);

  return <div className="text-white font-bold text-3xl">⏱️{formatTime(timeLeft)}</div>;
}
