import { URLS } from "../../../configs/Links";
import { useMutationFactory } from "./_useMutationFactory";
import { useQueryFactory } from "./_useQueryFactory";

/**
 * @description This hook is used to create hooks for quiz queries.
 * @returns The hooks for quiz queries.
 */

interface IQuizData {
  uniqueCategories: number;
  totalQuestions: number;
  totalQuizzes: number;
  categoryStats: {
    category: string;
    totalQuestions: number;
    totalQuizzes: number;
  }[];
  timesPlayed: {
    title: string;
    times_played: number;
  }[];
}

interface QuizCompleteDTO {
  correct_answers: number;
  incorrect_answers: number;
  score: number;
  total_time_played: number;
}

export function useQuizQueries() {
  /**
   * @description hook to get general quiz stats for the home page
   * @returns {quizData, isError}
   */
  const useQuizGeneralStats = () => {
    const { data, isError } = useQueryFactory({
      queryKey: ["quizData"],
      endpoint: URLS.API_ENDPOINTS.APP.QUIZ_DATA,
    });

    const quizData = (data?.data as IQuizData) || undefined;

    return { quizData, isError };
  };

  const useQuizGameData = (quizID: string) => {
    const { isPending, data, error, isError } = useQueryFactory({
      queryKey: ["quiz-start"],
      endpoint: URLS.API_ENDPOINTS.APP.QUIZ_START + quizID,
      retry: 1,
      refetchOnWindowFocus: false,
    });

    const quizData = data?.data;

    return { isPending, quizData, error, isError };
  };

  const useCompleteQuiz = (quizID: string) => {
    return useMutationFactory<QuizCompleteDTO>({
      method: "post",
      endpoint: URLS.API_ENDPOINTS.APP.QUIZ_COMPLETE + quizID,
      onSuccess: () => {},
      onError: () => {},
      invalidateData: ["user"],
    });
  };

  return { useQuizGeneralStats, useQuizGameData, useCompleteQuiz };
}
