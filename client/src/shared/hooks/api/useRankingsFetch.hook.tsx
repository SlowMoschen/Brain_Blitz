import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../../services/httpService.service";
import { URLS } from "../../../configs/Links";
import { IMostPlayedQuizRanking, IPersonalRanking, IPlaytimeRanking, IPointsRanking } from "../../types/Rankings";


/**
 * This hook is used to fetch the rankings data from the server.
 * It uses the useQuery hook from react-query to fetch the data.
 * It returns the rankings data and any errors that occur during the fetch.
 * The hook does not take any arguments.
 * The hook returns an object with the following properties:
 * - personalRankings: The personal rankings data.
 * - personalRankingsError: Any errors that occur during the fetch of the personal rankings data.
 * - overallPointsRankings: The overall points rankings data.
 * - overallPointsRankingsError: Any errors that occur during the fetch of the overall points rankings data.
 * - overallPlaytimeRankings: The overall playtime rankings data.
 * - overallPlaytimeRankingsError: Any errors that occur during the fetch of the overall playtime rankings data.
 * - overallMostPlayedQuizzesRankings: The overall most played quizzes rankings data.
 * - overallMostPlayedQuizzesRankingsError: Any errors that occur during the fetch of the overall most played quizzes rankings data.
 */
export function useRankingsFetch() {
  const httpService = new HttpService();

  /**
   * 
   * Query fetches
   *  
   */
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

  // Extract data from the response
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
