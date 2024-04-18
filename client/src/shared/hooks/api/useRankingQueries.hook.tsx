import { URLS } from "../../../configs/Links";
import { IMostPlayedQuizRanking, IPersonalRanking, IPlaytimeRanking, IPointsRanking, IQuizRanking } from "../../types/Rankings";
import { useQueryFactory } from "./_useQueryFactory"

export function useRankingQueries() {

    const usePersonalRankings = () => {
        const {data, isError} = useQueryFactory({
            queryKey: ["personalRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.PERSONAL_RANKINGS,
        });

        const personalRankings: IPersonalRanking[] = data?.data 

        return {personalRankings, isError};
    }

    const useOverallPointsRankings = () => {
        const {data, isError} = useQueryFactory({
            queryKey: ["overallPointsRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.OVERALL_POINTS_RANKINGS,
        });

        const overallPointsRankings: IPointsRanking[] = data?.data.filter((ranking: IPointsRanking) => ranking.points > 0)

        return {overallPointsRankings, isError};
    }

    const useOverallPlaytimeRankings = () => {
        const {data, isError} = useQueryFactory({
            queryKey: ["overallPlaytimeRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.OVERALL_PLAYTIME_RANKINGS,
        });

        const overallPlaytimeRankings: IPlaytimeRanking[] = data?.data.filter((ranking: IPlaytimeRanking) => ranking.playtime > 0)

        return {overallPlaytimeRankings, isError};
    }

    const useOverallMostPlayedQuizzesRankings = () => {
        const {data, isError} = useQueryFactory({
            queryKey: ["overallMostPlayedQuizzesRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.OVERALL_MOST_PLAYED_QUIZZES_RANKINGS,
        });

        const overallMostPlayedQuizzesRankings: IMostPlayedQuizRanking[] = data?.data

        return {overallMostPlayedQuizzesRankings, isError};
    }

    const useSingleQuizRankings = (quizID: string) => {
        const {data, isError} = useQueryFactory({
            queryKey: ["singleQuizRankings"],
            endpoint: URLS.API_ENDPOINTS.APP.OVERALL_QUIZ_RANKINGS + quizID,
        });

        const singleQuizRankings: IQuizRanking[] = data?.data

        return {singleQuizRankings, isError};
    }

    return {
        usePersonalRankings,
        useOverallPointsRankings,
        useOverallPlaytimeRankings,
        useOverallMostPlayedQuizzesRankings,
        useSingleQuizRankings
    };
}