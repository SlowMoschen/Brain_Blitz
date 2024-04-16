import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";
import { IQuizRanking } from "../../types/Rankings";

export function useQuizRankingsFetch(quizID: string) {

    const { data: res, error: quizRankingsError } = useQuery({
        queryKey: ["quizRankings"],
        queryFn: () => HttpServiceInstance.get(URLS.API_ENDPOINTS.APP.OVERALL_QUIZ_RANKINGS + quizID),
    });

    const quizRankings: IQuizRanking[] = res?.data;

    return { quizRankings, quizRankingsError };
}