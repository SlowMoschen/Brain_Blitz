import { IMostPlayedQuizRanking, IPlaytimeRanking, IPointsRanking } from "../types/Rankings";
import { useRankingQuery } from "./api/useRankingQuery.hook";

/**
 * @description A hook to sum up all the global rankings and return them.
 * - Transform the data to a common format (IGlobalRanking).
 * @returns {mostPoints, mostPlaytime, mostPlayedQuizzes, isPending} - The global rankings and a boolean to check if the data is still pending.
 * 
 */
export function useGlobalRankings() {
  const { rankings: overallPointsRankings, isPending: isPointsPending } =
    useRankingQuery<IPointsRanking>({ type: "OVERALL_POINTS" });
  const { rankings: overallPlaytimeRankings, isPending: isPlaytimePending } =
    useRankingQuery<IPlaytimeRanking>({ type: "OVERALL_PLAYTIME" });
  const { rankings: overallMostPlayedQuizzesRankings, isPending: isQuizzesPenidng } =
    useRankingQuery<IMostPlayedQuizRanking>({ type: "OVERALL_MOST_PLAYED_QUIZZES" });

  const isPending = isPointsPending || isPlaytimePending || isQuizzesPenidng;

  const transformToGlobalRanking = (
    data: IPointsRanking[] | IPlaytimeRanking[] | IMostPlayedQuizRanking[]
  ) => {
    return data?.map((ranking: IPointsRanking | IPlaytimeRanking | IMostPlayedQuizRanking) => ({
      id: "userID" in ranking ? ranking.userID : "quiz_id" in ranking ? ranking.quiz_id : "",
      name: "first_name" in ranking ? ranking.first_name : ranking.quiz_name,
      value:
        "points" in ranking
          ? ranking.points
          : "playtime" in ranking
          ? ranking.playtime
          : ranking.times_played,
      additionalInfo: "",
    }));
  };

    return {
        mostPoints: transformToGlobalRanking(overallPointsRankings)?.filter((ranking) => ranking.value > 0),
        mostPlaytime: transformToGlobalRanking(overallPlaytimeRankings)?.filter((ranking) => ranking.value > 0),
        mostPlayedQuizzes: transformToGlobalRanking(overallMostPlayedQuizzesRankings),
        isPending,
    };
}
