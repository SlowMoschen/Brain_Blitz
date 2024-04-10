import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import { URLS } from "../../configs/Links";
import LoadingScreen from "../../shared/components/LoadingScreen";
import { useQuizFetch } from "../../shared/hooks/api/useQuizFetch.hook";
import { useQuiz } from "../../shared/hooks/game/useQuiz.hook";
import RedirectErrorPage from "../error/RedirectErrorPage";
import InitialCountdown from "./InitialCountdown";
import Question from "./components/Question";
import QuizTimer from "./components/QuizTimer";
import Score from "./components/Score";

export default function Quiz() {
  const { quizID } = useParams();
  const { quizData, isPending, isError } = useQuizFetch(quizID!);
  const {
    checkAnswer,
    currentQuestion,
    currentScore,
    quizTime,
    hasStarted,
    isQuizComplete,
    isSuccess,
    startQuiz,
  } = useQuiz(quizData);

  useEffect(() => {
    if (!isPending && !isError) startQuiz();
  }, [isError, isPending]);

  if (isError)
    return (
      <RedirectErrorPage
        redirectTo={"zum Dashboard"}
        redirectUrl={URLS.DASHBOARD}
        message={"Quiz konnte nicht geladen werden"}
      />
    );

  if (isPending) return <LoadingScreen />;

  return (
    <>
      <InitialCountdown />
      {hasStarted ? (
        <>
          <Stack alignItems={"center"} width={"100%"} p={4} gap={2} maxWidth={BREAKPOINTS.lg}>
            <Score score={currentScore} />
            <QuizTimer time={quizTime} />
            <Question question={currentQuestion!.question} />
          </Stack>
        </>
      ) : null}
    </>
  );
}
