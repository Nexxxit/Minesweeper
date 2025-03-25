import { makeAutoObservable, runInAction } from "mobx";

interface Record {
  name: string;
  time: number;
  level: "easy" | "medium" | "hard";
}

export class LeaderboardStore {
  records: Record[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadRecords();
  }

  loadRecords() {
    const storedData = localStorage.getItem("leaderboard");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        this.records = parsedData;
      } catch (error) {
        console.error("Ошибка при загрузке рекордов:", error);
      }
    }
  }

  addRecord(record: Record) {
    runInAction(() => {
      const newRecords = [...this.records, record]
        .sort((a, b) => a.time - b.time)
        .slice(0, 10);
      this.records = newRecords;
      localStorage.setItem("leaderboard", JSON.stringify(newRecords));
    });
  }

  get formattedRecords() {
    return this.records.map((record) => ({
      ...record,
      time: this.convertTime(record.time),
    }));
  }

  private convertTime(totalSeconds: number): string {
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
  }
}

export const leaderboardStore = new LeaderboardStore();
