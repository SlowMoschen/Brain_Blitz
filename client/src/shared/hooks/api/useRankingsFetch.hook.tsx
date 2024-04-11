import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../../services/httpService.service";
import { URLS } from "../../../configs/Links";
import { IMostPlayedQuizRanking, IPersonalRanking, IPlaytimeRanking, IPointsRanking } from "../../types/Rankings";

export function useRankingsFetch() {
  const httpService = new HttpService();

  const { data: personalRes, error: personalRankingsError } = useQuery({
    queryKey: ["personalRankings"],
    queryFn: () => httpService.get(URLS.API_ENDPOINTS.APP.PERSONAL_RANKINGS),
  });

  const { data: pointsRes, error: overallPointsRankingsError } = useQuery({
    queryKey: ["overallPointsRankings"],
    queryFn: () => httpService.get(URLS.API_ENDPOINTS.APP.OVERALL_POINTS_RANKINGS),
  });

  const { data: playtimeRes, error: overallPlaytimeRankingsError } = useQuery({
    queryKey: ["overallPlaytimeRankings"],
    queryFn: () => httpService.get(URLS.API_ENDPOINTS.APP.OVERALL_PLAYTIME_RANKINGS),
  });

  const { data: playedRes, error: overallMostPlayedQuizzesRankingsError } = useQuery({
    queryKey: ["overallMostPlayedQuizzesRankings"],
    queryFn: () => httpService.get(URLS.API_ENDPOINTS.APP.OVERALL_MOST_PLAYED_QUIZZES_RANKINGS),
  });

  const personalRankings: IPersonalRanking[] = personalRes?.data;
  const overallPointsRankings: IPointsRanking[] = pointsRes?.data;
  const overallPlaytimeRankings: IPlaytimeRanking[] = playtimeRes?.data;
  const overallMostPlayedQuizzesRankings: IMostPlayedQuizRanking[] = playedRes?.data;

  return {
    personalRankings,
    personalRankingsError,
    overallPointsRankings,
    overallPointsRankingsError,
    overallPlaytimeRankings,
    overallPlaytimeRankingsError,
    overallMostPlayedQuizzesRankings,
    overallMostPlayedQuizzesRankingsError,
  };

}
