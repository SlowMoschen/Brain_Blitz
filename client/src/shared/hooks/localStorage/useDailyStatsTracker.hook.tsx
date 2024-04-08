import { useLocalStorage } from "./useLocalStorage.hook";

export interface IDailyStats {
    [key: string]: number | string;
    playedQuizzes: number;
    points: number;
    answeredQuestions: number;
    timePlayed: string;
}

export function useDailyStatsTracker() {
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

    return { getDailyStats, updateDailyStats, resetDailyStats };
}