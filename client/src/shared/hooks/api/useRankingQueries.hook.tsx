import { URLS } from "../../../configs/Links";
import { IMostPlayedQuizRanking, IPersonalRanking, IPlaytimeRanking, IPointsRanking, IQuizRanking } from "../../types/Rankings";
import { useQueryFactory } from "./_useQueryFactory"

export function useRankingQueries() {

    const usePersonalRankings = () => {
        const {data, isError, isPending} = useQueryFactory({
            queryKey: ["personalRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.PERSONAL_RANKINGS,
        });

        const personalRankings: IPersonalRanking[] = data?.data 

        return {personalRankings, isError, isPending};
    }

    const useOverallPointsRankings = () => {
        const {data, isError, isPending} = useQueryFactory({
            queryKey: ["overallPointsRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.OVERALL_POINTS_RANKINGS,
        });

        const overallPointsRankings: IPointsRanking[] = data?.data.filter((ranking: IPointsRanking) => ranking.points > 0)

        return {overallPointsRankings, isError, isPending};
    }

    const useOverallPlaytimeRankings = () => {
        const {data, isError, isPending} = useQueryFactory({
            queryKey: ["overallPlaytimeRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.OVERALL_PLAYTIME_RANKINGS,
        });

        const overallPlaytimeRankings: IPlaytimeRanking[] = data?.data.filter((ranking: IPlaytimeRanking) => ranking.playtime > 0)

        return {overallPlaytimeRankings, isError, isPending};
    }

    const useOverallMostPlayedQuizzesRankings = () => {
        const {data, isError, isPending} = useQueryFactory({
            queryKey: ["overallMostPlayedQuizzesRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.OVERALL_MOST_PLAYED_QUIZZES_RANKINGS,
        });

        const overallMostPlayedQuizzesRankings: IMostPlayedQuizRanking[] = data?.data

        return {overallMostPlayedQuizzesRankings, isError, isPending};
    }

    const useSingleQuizRankings = (quizID: string) => {
        const {data, isError, isPending} = useQueryFactory({
            queryKey: ["singleQuizRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.OVERALL_QUIZ_RANKINGS + quizID,
            retry: 1,
            refetchOnMount: true,
            gcTime: 100
        });

        const singleQuizRankings: IQuizRanking[] = data?.data

        return {singleQuizRankings, isError, isPending};
    }

    const useGlobalRankings = () => {
        const { overallPointsRankings, isPending: isPointsPending } = useOverallPointsRankings();
        const {overallPlaytimeRankings, isPending: isPlaytimePending } = useOverallPlaytimeRankings()
        const {overallMostPlayedQuizzesRankings, isPending: isQuizzesPenidng } = useOverallMostPlayedQuizzesRankings()

        const isPending = isPointsPending || isPlaytimePending || isQuizzesPenidng

        const transformToGlobalRanking = (data: IPointsRanking[] | IPlaytimeRanking[] | IMostPlayedQuizRanking[]) => {
            return data?.map((ranking: IPointsRanking | IPlaytimeRanking | IMostPlayedQuizRanking) => ({
                id: "userID" in ranking ? ranking.userID : "quiz_id" in ranking ? ranking.quiz_id : '',
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

        const mostPoints = transformToGlobalRanking(overallPointsRankings)
        const mostPlaytime = transformToGlobalRanking(overallPlaytimeRankings)
        const mostPlayedQuizzes = transformToGlobalRanking(overallMostPlayedQuizzesRankings)

        return {
            isPending,
            mostPoints,
            mostPlaytime,
            mostPlayedQuizzes
        };
    }

    return {
        useGlobalRankings,
        usePersonalRankings,
        useOverallPointsRankings,
        useOverallPlaytimeRankings,
        useOverallMostPlayedQuizzesRankings,
        useSingleQuizRankings
    };
}