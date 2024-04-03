import { useQuery } from "@tanstack/react-query";
import { URLS } from "../../../configs/Links";
import { HttpService } from "../../services/httpService";

const httpService = new HttpService();

function fetchQuizData() {
    return httpService.get(URLS.QUIZ_DATA_ENDPOINT);
}


// This hook is used to fetch quiz data from the server.
// It uses the useQuery hook from react-query to fetch the data.
// The hook returns a query object that can be used to fetch the data.
export function useQuizDataFetch() {
   return useQuery({ queryKey: ["quizData"], queryFn: fetchQuizData });
}