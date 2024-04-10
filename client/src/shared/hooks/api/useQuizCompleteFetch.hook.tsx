import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpService } from "../../services/httpService.service";
import { URLS } from "../../../configs/Links";
const httpService = new HttpService();

interface QuizCompleteDTO {
  correct_answers: number;
  incorrect_answers: number;
  score: number;
  total_time_played: number;
}

function fetchQuizComplete(quizID: string, body: QuizCompleteDTO) {
    return httpService.post(URLS.API_ENDPOINTS.APP.QUIZ_COMPLETE + quizID, body);
}

export function useQuizCompleteFetch(quizID: string) {
        const queryClient = useQueryClient();

    const { isPending, data, error, isError, mutate } = useMutation({
        mutationFn: (body: QuizCompleteDTO) => fetchQuizComplete(quizID, body),
        onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    return { isPending, data, error, isError, mutate };
}
