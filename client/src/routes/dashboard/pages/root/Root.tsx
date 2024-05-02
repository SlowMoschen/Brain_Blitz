import { Box, Stack } from "@mui/material";
import { useContext } from "react";
import blob from "../../../../assets/blob.svg";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";
import { useUserContext } from "../../../../shared/hooks/context/useUserContext.hook";
import DailyStats from "../../components/DailyStats";
import EnergyTracker from "./components/EnergyTracker";
import LoginStreak from "./components/LoginStreak";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import QuizTable from "../../components/quiz/QuizTable";
import WelcomeHeader from "../../components/WelcomeHeader";
import { useDocumentTitle } from "../../../../shared/hooks/useDocumentTitle.hook";

export default function DashboardRoot() {
  useDocumentTitle("Dashboard - Home");
  const user = useUserContext();
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
        overflow={"hidden"}
      >
        <Stack width={{ xs: "100%", lg: "70%" }} alignItems={"center"}>
          <Box
            component={"img"}
            src={blob}
            sx={{
              position: "absolute",
              top: -40,
              zIndex: -1,
              width: "500px",
              rotate: "-10deg",
            }}
          ></Box>
          <WelcomeHeader name={first_name} />
          <Stack direction={{ xs: "column", lg: "row" }} width={"100%"} maxWidth={"600px"} gap={1}>
            <LoginStreak />
            <EnergyTracker />
          </Stack>
          {!isMobile && <DailyStats />}
        </Stack>
        <Stack width={"100%"} alignItems={"center"} my={2}>
          <QuizTable unlockedJoinTable={unlocked_quizzes} completedJoinTable={completed_quizzes} />
        </Stack>
      </Stack>
    </>
  );
}
