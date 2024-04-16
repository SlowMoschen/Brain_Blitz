import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";

export function useQuizFetch(quizID: string) {

  const { isPending, data, error, isError } = useQuery({
    queryKey: ["quiz-start"],
    queryFn: () => HttpServiceInstance.get(URLS.API_ENDPOINTS.APP.QUIZ_START + quizID), 
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const quizData = data?.data;

    return { isPending, quizData, error, isError };
}
