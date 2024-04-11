import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../../services/httpService.service";
import { URLS } from "../../../configs/Links";
import { IQuizRanking } from "../../types/Rankings";

export function useQuizRankingsFetch(quizID: string) {
    const httpService = new HttpService();

    const { data: res, error: quizRankingsError } = useQuery({
        queryKey: ["quizRankings"],
        queryFn: () => httpService.get(URLS.API_ENDPOINTS.APP.OVERALL_QUIZ_RANKINGS + quizID),
    });

    const quizRankings: IQuizRanking[] = res?.data;

    return { quizRankings, quizRankingsError };
}