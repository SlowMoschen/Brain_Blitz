import FlagIcon from "@mui/icons-material/Flag";
import { IconButton, Stack } from "@mui/material";
import { useEffect } from "react";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import ReportForm from "../../../../shared/components/form/ReportForm";
import { useDocumentTitle } from "../../../../shared/hooks/api/useDocumentTitle.hook";
import { useQuiz } from "../../../../shared/hooks/game/useQuiz.hook";
import useToggle from "../../../../shared/hooks/useToggle.hook";
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
  useDocumentTitle(`Quiz - ${quizData?.title}`);
  const [isReportModalOpen, toggleReportModal] = useToggle(false);
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
    togglePause,
  } = useQuiz(quizData);

  useEffect(() => {
    if (quizData) startQuiz();
  }, [quizData]);

  const handleModal = () => {
    toggleReportModal();
    togglePause();
  };

  if (isQuizComplete)
    return (
      <QuizEndScreen
        answersCount={answerCount}
        time={quizTime}
        isSuccess={isSuccess}
        quizId={quizData.id}
      />
    );

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
            position={"relative"}
          >
            <Score score={currentScore} />
            <QuizTimer time={quizTime} />
            <Question question={currentQuestion!.question} />
            <Answers
              answers={currentQuestion!.answers}
              correctAnswer={currentQuestion!.correct_answer}
              checkAnswer={checkAnswer}
            />
            <IconButton onClick={handleModal}>
              <FlagIcon sx={{ color: "text.main" }} />
            </IconButton>
            {isReportModalOpen && (
              <ReportForm
                header="Melde diese Frage"
                problemLabel="Wo liegt das Problem?"
                problemSelectList={[
                  "Falsche Antwort",
                  "Falsche Frage",
                  "Frage ist unverständlich",
                  "Frage ist doppelt",
                  "Sonstiges",
                ]}
                id={currentQuestion!.id}
                isOpen={isReportModalOpen}
                onClose={handleModal}
                problemHelperText="Wo liegt das Problem?"
              />
            )}
          </Stack>
        </>
      ) : null}
    </>
  );
}
