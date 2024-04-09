import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpService } from "../../services/httpService.service";

const httpService = new HttpService();

function fetchQuizData() {
  return httpService.get(URLS.API_ENDPOINTS.APP.QUIZ_DATA);
}

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

// This hook is used to fetch quiz data from the server.
// It uses the useQuery hook from react-query to fetch the data.
// The hook returns a query object that can be used to fetch the data.
export function useQuizDataFetch() {
  const { data, isError } = useQuery({ queryKey: ["quizData"], queryFn: fetchQuizData });

  const quizData = (data?.data as IQuizData) || undefined;

  return { quizData, isError };
}
