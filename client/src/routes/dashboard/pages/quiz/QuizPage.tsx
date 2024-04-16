import { useParams } from "react-router-dom";
import { URLS } from "../../../../configs/Links";
import LoadingScreen from "../../../../shared/components/LoadingScreen";
import { useQuizQueries } from "../../../../shared/hooks/api/useQuizQueries.hook";
import RedirectErrorPage from "../../../error/RedirectErrorPage";
import Quiz from "./Quiz";

export default function QuizPage() {
  const { quizID } = useParams();
  const { quizData, isPending, isError } = useQuizQueries().useQuizGameData(quizID!);

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
