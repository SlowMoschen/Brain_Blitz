import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage.hook";

export interface IDailyStats {
    [key: string]: number | string;
    playedQuizzes: number;
    points: number;
    answeredQuestions: number;
    timePlayed: string;
    date: string;
}

const initialStats: IDailyStats = {
    playedQuizzes: 0,
    points: 0,
    answeredQuestions: 0,
    timePlayed: "0h 0m",
    date: new Date().toDateString(),
}

export function useDailyStatsTracker() {
    const [dailyStats, setDailyStats] = useState<IDailyStats>(initialStats);
    const { setData, getData, removeData } = useLocalStorage();
    const key = "brain-blitz-daily-stats";

    const getDailyStats = (): IDailyStats | null => {
        return getData(key);
    }

    const updateDailyStats = (stats: IDailyStats) => {
        setData(key, stats);
    }

    const resetDailyStats = () => {
        removeData(key);
    }

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