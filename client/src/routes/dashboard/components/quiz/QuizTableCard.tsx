import FlashOffIcon from "@mui/icons-material/FlashOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { GAME, TIMES } from "../../../../configs/Application";
import AlertSnackbar from "../../../../shared/components/AlertSnackbar";
import { useQuizRedirect } from "../../../../shared/hooks/game/useQuizRedirect.hook";
import useToggle from "../../../../shared/hooks/useToggle.hook";
import QuizCategoryIcon from "./QuizCategoryIcon";
import { useUserContext } from "../../../../shared/hooks/context/useUserContext.hook";

interface QuizTableCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  isCompleted: boolean;
}

export default function QuizTableCard({
  id,
  title,
  category,
  description,
  isCompleted,
}: QuizTableCardProps) {
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const user = useUserContext();
  const hasEnoughEnergy = user.energy >= GAME.ENERGY_CONSUPMTION;
  const handleQuizRedirect = useQuizRedirect();

  const paper = {
    bgcolor: "primary.light",
    color: "text.main",
    m: 2,
    borderRadius: ".375rem",
  };

  return (
    <Paper id={id} sx={paper}>
      <Stack direction={{ xs: "column", lg: "row" }} justifyContent={"space-between"}>
        <QuizCategoryIcon category={category} />
        <Stack alignItems={"center"}>
          <Stack alignItems="center" p={2}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Typography variant="h6" align="center">
                {title}
              </Typography>
              {isCompleted && <VerifiedIcon sx={{ color: "accent.main" }} />}
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="caption" p={2} align="center">
              {description}
            </Typography>
          </Stack>
        </Stack>
        <Box
          onClick={() => handleQuizRedirect(id)}
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
          <Stack direction={"row"} alignItems="center">
            <Stack
              direction={"row"}
              alignItems="center"
              sx={{ position: "absolute", left: { xs: 5, lg: 70 }, top: { lg: 3 }, fontSize: 10 }}
            >
              {GAME.ENERGY_CONSUPMTION}
              <FlashOffIcon sx={{ color: "yellow", fontSize: { xs: 15, lg: 20 } }} />
            </Stack>
            {hasEnoughEnergy ? (
              <PlayArrowIcon
                sx={{
                  color: "accent.main",
                  cursor: "pointer",
                  fontSize: { xs: 30, lg: 50 },
                }}
              />
            ) : (
              <FlashOffIcon
                sx={{
                  color: "accent.main",
                  cursor: "pointer",
                  fontSize: { xs: 30, lg: 50 },
                }}
              />
            )}
          </Stack>
        </Box>
      </Stack>
      <AlertSnackbar
        open={isSnackbarOpen}
        alertType="error"
        message="Nicht genung Energie um dieses Quiz zu spielen"
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        onClose={toggleSnackbarOpen}
        autoHideDuration={TIMES.SNACKBAR_DELAY}
      />
    </Paper>
  );
}
