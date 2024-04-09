import { Box, Stack } from "@mui/material";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import blob from "../../../../assets/blob.svg";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";
import { useDailyStatsTracker } from "../../../../shared/hooks/localStorage/useDailyStatsTracker.hook";
import { UserContext } from "../../../../shared/types/User";
import DailyStats from "../../components/DailyStats";
import EnergyTracker from "../../components/EnergyTracker";
import LoginStreak from "../../components/LoginStreak";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import QuizTable from "../../components/quiz/QuizTable";
import WelcomeHeader from "./WelcomeHeader";

export default function DashboardRoot() {
  const { user } = useOutletContext<UserContext>();
  const { dailyStats } = useDailyStatsTracker();
  const { width } = useContext(WindowContext);
  const isMobile = width < BREAKPOINTS.lg;
  const { first_name, unlocked_quizzes, completed_quizzes } = user;

  return (
    <>
      <HeaderMenu />
      <Stack
        direction={{ xs: "column", lg: "row" }}
        alignItems={{ xs: "center", lg: "flex-start" }}
        width={"100%"}
        p={2}
        pb={8}
        position={"relative"}
      >
        <Stack width={{ xs: "100%", lg: "70%" }} alignItems={"center"}>
          <Box
            component={"img"}
            src={blob}
            sx={{
              position: "absolute",
              top: { xs: -20, md: -40 },
              zIndex: -1,
              width: { xs: "300px", md: "400px", lg: "500px" },
              rotate: "-10deg",
            }}
          ></Box>
          <WelcomeHeader name={first_name} />
          <Stack direction={{ xs: "column", lg: "row" }} width={"100%"} maxWidth={"600px"} gap={1}>
            <LoginStreak />
            <EnergyTracker />
          </Stack>
          {!isMobile && <DailyStats stats={dailyStats} />}
        </Stack>
        <Stack width={"100%"} alignItems={"center"} my={2}>
          <QuizTable unlockedJoinTable={unlocked_quizzes} completedJoinTable={completed_quizzes} />
        </Stack>
      </Stack>
    </>
  );
}
