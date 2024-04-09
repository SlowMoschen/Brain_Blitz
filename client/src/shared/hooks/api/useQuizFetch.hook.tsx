import { useQuery } from "@tanstack/react-query";
import { HttpService } from "../../services/httpService.service";
import { URLS } from "../../../configs/Links";

const httpService = new HttpService();

export function useQuizFetch(quizID: string) {

  const { isPending, data, error, isError } = useQuery({
    queryKey: ["quiz-start"],
    queryFn: () => httpService.get(URLS.API_ENDPOINTS.APP.QUIZ_START + quizID), 
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const quizData = data?.data;

    return { isPending, quizData, error, isError };
}
