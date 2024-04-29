import ListIcon from "@mui/icons-material/List";
import { Box, Stack, Typography } from "@mui/material";
import QuizCategoryIcon from "../../../components/quiz/QuizCategoryIcon";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";

interface PersonalRankingCardProps {
  points: number;
  position: number;
  quizName: string;
  quizCategory: string;
  quizId: string;
}

export default function PersonalRankingCard({
  points,
  position,
  quizName,
  quizCategory,
  quizId,
}: PersonalRankingCardProps) {
  const redirect = useNavigate();

  const handleClick = () => {
    redirect(URLS.QUIZ_RANKING + quizId);
  };

  return (
    <Stack
      id={quizId}
      direction={{ xs: "column", lg: "row" }}
      justifyContent={"space-between"}
      width={"100%"}
      sx={{ bgcolor: "primary.light" }}
    >
      <QuizCategoryIcon category={quizCategory} />
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Typography variant="h6">{quizName}</Typography>
        <Typography variant="body1" fontSize={{ xs: 20 }}>
          {position === 1
            ? "👑"
            : position === 2
            ? "🥈"
            : position === 3
            ? "🥉"
            : `${position}. Platz`}
        </Typography>
        <Typography variant="body1">{points} Punkte</Typography>
      </Stack>
      <Box
        onClick={handleClick}
        sx={{
          bgcolor: "primary.main",
          borderRadius: { xs: "0 0 .375rem .375rem", lg: "0 .375rem .375rem 0" },
          minWidth: { xs: 50, lg: 100 },
          minHeight: { xs: 40, lg: 100 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "primary.dark",
          },
          position: "relative",
        }}
      >
        <ListIcon sx={{ color: "accent.main", fontSize: { xs: 40 } }} />
      </Box>
    </Stack>
  );
}
