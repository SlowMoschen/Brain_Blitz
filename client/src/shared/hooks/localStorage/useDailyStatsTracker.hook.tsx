import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage.hook";
import { UserIDContext } from "../../context/UserID.context";

export interface IDailyStats {
  [key: string]: number | string;
  playedQuizzes: number;
  points: number;
  answeredQuestions: number;
  timePlayed: number;
  date: string;
}

const initialStats: IDailyStats = {
  playedQuizzes: 0,
  points: 0,
  answeredQuestions: 0,
  timePlayed: 0,
  date: new Date().toDateString(),
};

export function useDailyStatsTracker() {
  const { userID } = useContext(UserIDContext);
  const [dailyStats, setDailyStats] = useState<IDailyStats>(initialStats);
  const { setData, getData, removeData } = useLocalStorage();
  const key = `dailyStats-${userID}`;

  const getDailyStats = (): IDailyStats | null => {
    return getData(key);
  };

  const updateDailyStats = (stats: IDailyStats) => {
    const currentStats = getDailyStats();
    if (!currentStats) return setData(key, stats);

    const updatedStats: IDailyStats = {
      playedQuizzes: currentStats.playedQuizzes + stats.playedQuizzes,
      points: currentStats.points + stats.points,
      answeredQuestions: currentStats.answeredQuestions + stats.answeredQuestions,
      timePlayed: currentStats.timePlayed + stats.timePlayed,
      date: currentStats.date,
    };

    setData(key, updatedStats);
  };

  const resetDailyStats = () => {
    removeData(key);
  };

  useEffect(() => {
    const stats = getDailyStats();

    if (!stats) return updateDailyStats(initialStats);

    if (stats.date !== new Date().toDateString()) {
      resetDailyStats();
      return updateDailyStats(initialStats);
    }

    setDailyStats(stats);
  }, []);

  return { getDailyStats, updateDailyStats, resetDailyStats, dailyStats };
}
