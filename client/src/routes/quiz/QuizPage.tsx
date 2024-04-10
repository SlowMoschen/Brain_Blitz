import { useParams } from "react-router-dom";
import { URLS } from "../../configs/Links";
import LoadingScreen from "../../shared/components/LoadingScreen";
import { useQuizFetch } from "../../shared/hooks/api/useQuizFetch.hook";
import RedirectErrorPage from "../error/RedirectErrorPage";
import Quiz from "./Quiz";

export default function QuizPage() {
  const { quizID } = useParams();
  const { quizData, isPending, isError } = useQuizFetch(quizID!);

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
