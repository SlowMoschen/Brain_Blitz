import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpServiceInstance } from "../../services/httpService.service";

interface QuizCompleteDTO {
  correct_answers: number;
  incorrect_answers: number;
  score: number;
  total_time_played: number;
}

function fetchQuizComplete(quizID: string, body: QuizCompleteDTO) {
    return HttpServiceInstance.post(URLS.API_ENDPOINTS.APP.QUIZ_COMPLETE + quizID, body);
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
