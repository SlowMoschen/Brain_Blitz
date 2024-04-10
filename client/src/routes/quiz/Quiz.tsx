import { Stack } from "@mui/material";
import { useQuiz } from "../../shared/hooks/game/useQuiz.hook";
import { IQuiz } from "../../shared/types/Quiz";
import InitialCountdown from "./components/InitialCountdown";
import Score from "./components/Score";
import QuizTimer from "./components/QuizTimer";
import Question from "./components/Question";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import { useEffect } from "react";
import Answers from "./components/Answers";
import QuizEndScreen from "./QuizEndScreen";

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
    return (
      <QuizEndScreen
        answersCount={answerCount}
        time={quizTime}
        isSuccess={isSuccess}
      />
    );

  return (
    <>
      <InitialCountdown />
      {hasStarted ? (
        <>
          <Stack alignItems={"center"} width={"100%"} p={4} gap={2} maxWidth={BREAKPOINTS.lg}>
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
