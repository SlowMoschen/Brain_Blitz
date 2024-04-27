import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";
import { IconButton, Stack, Typography } from "@mui/material";
import { GAME } from "../../../../configs/Application";
import { URLS } from "../../../../configs/Links";
import RouterButton from "../../../../shared/components/buttons/RouterButton";
import { useTimeParser } from "../../../../shared/hooks/timer/useTimeParser.hook";
import ScoreTable from "./components/ScoreTable";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import useToggle from "../../../../shared/hooks/useToggle.hook";
import FlagIcon from "@mui/icons-material/Flag";
import ReportForm from "../../../../shared/components/form/ReportForm";

interface QuizEndScreenProps {
  answersCount: {
    correct: number;
    incorrect: number;
  };
  time: number;
  isSuccess: boolean;
  quizId: string;
}

export default function QuizEndScreen({
  answersCount,
  time,
  isSuccess,
  quizId,
}: QuizEndScreenProps) {
  const { parseToTimeString } = useTimeParser();
  const [isReportModalOpen, toggleReportModal] = useToggle(false);
  const timeUsed = parseToTimeString(GAME.TIME_PER_QUIZ - time);

  const correctPoints = answersCount.correct * GAME.CORRECT_ANSWER_POINTS;
  const incorrectPoints = answersCount.incorrect * GAME.WRONG_ANSWER_POINTS;
  const timeBonus = (time / 1000) * GAME.POINTS_PER_SECOND;

  return (
    <>
      <Stack
        height={"90vh"}
        width={"100%"}
        maxWidth={BREAKPOINTS.md}
        justifyContent={"center"}
        p={2}
      >
        <Stack alignItems={"center"}>
          {isSuccess ? (
            <VerifiedIcon sx={{ color: "accent.main", fontSize: 40 }} />
          ) : (
            <CancelIcon sx={{ color: "primary.main", fontSize: 40 }} />
          )}
          <Typography variant="h4">{isSuccess ? "Abgeschlossen" : "Nicht geschafft"}</Typography>
          <Typography variant="subtitle1">Zeit: {timeUsed}</Typography>
        </Stack>
        <ScoreTable
          correctPoints={correctPoints}
          incorrectPoints={incorrectPoints}
          timeBonus={timeBonus}
        />
        <RouterButton
          to={URLS.DASHBOARD}
          variant="contained"
          color="primary"
          text="Zurück zum Dashboard"
        />
        {isReportModalOpen && (
          <ReportForm
            isOpen={isReportModalOpen}
            onClose={toggleReportModal}
            header="Fehler melden"
            problemLabel="Problem auswählen"
            problemHelperText="Bitte wähle ein Problem aus."
            problemSelectList={["Quiz-Fehler", "Fehler bei Punktevergabe", "Sonstiges"]}
            id={quizId}
          />
        )}
        <IconButton onClick={toggleReportModal} sx={{ maxWidth: 150 }}>
          <FlagIcon sx={{ color: "text.main" }} />
          <Typography color={"text.main"} variant="caption">
            Fehler melden
          </Typography>
        </IconButton>
      </Stack>
    </>
  );
}
