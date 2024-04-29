import { useParams } from "react-router-dom";
import { URLS } from "../../../../configs/Links";
import LoadingScreen from "../../../../shared/components/LoadingScreen";
import { useQueryFactory } from "../../../../shared/hooks/api/_useQueryFactory";
import RedirectErrorPage from "../../../error/RedirectErrorPage";
import Quiz from "./Quiz";

export default function QuizPage() {
  const { quizID } = useParams();
  
  const {data , isError, isPending} = useQueryFactory({
    queryKey: ["quiz-start"],
    endpoint: URLS.API_ENDPOINTS.QUIZ.QUIZ_START + quizID,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  const quizData = data?.data;

  if (isError)
    return (
      <RedirectErrorPage
        redirectTo={"zum Dashboard"}
        redirectUrl={URLS.DASHBOARD}
        message={"Quiz konnte nicht geladen werden"}
      />
    );

  if (isPending) return <LoadingScreen />;

  return <Quiz quizData={quizData} />;
}
