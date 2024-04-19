import { Stack } from "@mui/material";
import { useEffect } from "react";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { useQuiz } from "../../../../shared/hooks/game/useQuiz.hook";
import { IQuiz } from "../../../../shared/types/Quiz";
import QuizEndScreen from "./QuizEndScreen";
import Answers from "./components/Answers";
import InitialCountdown from "./components/InitialCountdown";
import LeaveWarningModal from "./components/LeaveWarningModal";
import Question from "./components/Question";
import QuizTimer from "./components/QuizTimer";
import Score from "./components/Score";

interface QuizProps {
  quizData: IQuiz;
}

export default function Quiz({ quizData }: QuizProps) {
  const {
    checkAnswer,
    currentQuestion,
    currentScore,
    quizTime,
    hasStarted,
    answerCount,
    isQuizComplete,
    isSuccess,
    startQuiz,
  } = useQuiz(quizData);

  useEffect(() => {
    if (quizData) startQuiz();
  }, [quizData]);

  if (isQuizComplete)
    return <QuizEndScreen answersCount={answerCount} time={quizTime} isSuccess={isSuccess} />;

  return (
    <>
      <LeaveWarningModal />
      <InitialCountdown />
      {hasStarted ? (
        <>
          <Stack
            alignItems={"center"}
            justifyContent={{ xs: "flex-start", lg: "center" }}
            width={"100%"}
            height={"100vh"}
            p={4}
            gap={2}
            maxWidth={BREAKPOINTS.lg}
          >
            <Score score={currentScore} />
            <QuizTimer time={quizTime} />
            <Question question={currentQuestion!.question} />
            <Answers
              answers={currentQuestion!.answers}
              correctAnswer={currentQuestion!.correct_answer}
              checkAnswer={checkAnswer}
            />
          </Stack>
        </>
      ) : null}
    </>
  );
}
