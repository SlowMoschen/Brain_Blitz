import { useNavigate, useParams } from "react-router-dom";
import { useUserQueries } from "../../../../shared/hooks/api/useUserQueries.hook";
import LoadingScreen from "../../../../shared/components/LoadingScreen";
import { useUserContext } from "../../../../shared/hooks/context/useUserContext.hook";
import { useEffect } from "react";
import { URLS } from "../../../../configs/Links";
import ContainerWithHeader from "../../components/ContainerWithHeader";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import AvatarIcon from "./components/AvatarIcon";
import { Badge, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { formatValue } from "../../../../shared/services/ValueFormatter.service";
import useToggle from "../../../../shared/hooks/useToggle.hook";
import FlagIcon from "@mui/icons-material/Flag";
import ReportForm from "../../../../shared/components/form/ReportForm";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CountUp from "react-countup";
import { useDocumentTitle } from "../../../../shared/hooks/api/useDocumentTitle.hook";

export default function ProfilePage() {
  const [isReportModalOpen, toggleReportModal] = useToggle(false);
  const { userID } = useParams();
  const redirect = useNavigate();
  const loggedInUser = useUserContext();
  const { user, isPending } = useUserQueries().useDifferentUserFetch(userID!);
  useDocumentTitle(
    `Profil - ${formatValue(user?.first_name, ["capitalize"])} ${formatValue(user?.last_name, [
      "capitalize",
    ])}`
  );

  useEffect(() => {
    if (loggedInUser.id === userID) redirect(URLS.PROFILE);
  }, [userID]);

  const countUpStyle = { color: "#99ff66", fontSize: "1.3rem" };

  return (
    <>
      {isPending && <LoadingScreen />}
      {!isPending && user && (
        <>
          <HeaderMenu />
          <ReportForm
            isOpen={isReportModalOpen}
            onClose={toggleReportModal}
            header="Spieler melden"
            problemSelectList={[
              "Bot",
              "Cheater",
              "Beleidigung",
              "Spieler ist inaktiv",
              "Sonstiges",
            ]}
            problemLabel="Was ist das Problem?"
            problemHelperText="Wähle eine Kategorie aus"
            id={user.id}
          />
          <ContainerWithHeader header="Profil Details" sx={{ my: 5, mb: 10 }}>
            <Stack alignContent={"center"} justifyContent={"center"}>
              <Stack
                p={2}
                direction={{ xs: "column", lg: "row" }}
                justifyContent={"space-evenly"}
                position={"relative"}
              >
                <IconButton
                  onClick={toggleReportModal}
                  sx={{ position: "absolute", left: 0, top: 0 }}
                >
                  <FlagIcon color="error" />
                  <Typography variant="caption" color="text.main">
                    Spieler melden
                  </Typography>
                </IconButton>
                <Stack alignItems={"center"} mt={2}>
                  <Badge
                    badgeContent={
                      user.settings.is_verified ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <CancelIcon color="error" />
                      )
                    }
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <AvatarIcon first_name={user.first_name} last_name={user.last_name} />
                  </Badge>
                  <Typography variant="h4" py={1}>{`${formatValue(user.first_name, [
                    "capitalize",
                  ])} ${formatValue(user.last_name, ["capitalize"])}`}</Typography>
                </Stack>
                <Stack alignItems={"center"} justifyContent={"center"}>
                  <Grid container item xs={12} md={6} spacing={2}>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="subtitle1">Gesamktpunkte:</Typography>
                      <CountUp end={user.statistics.points} style={countUpStyle} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="body1">Highscores:</Typography>
                      <CountUp end={user.highscores.length} style={countUpStyle} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="body1">Freigeschaltete Quizze:</Typography>
                      <CountUp end={user.unlocked_quizzes.length} style={countUpStyle} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography variant="body1">Abgeschlossene Quizze:</Typography>
                      <CountUp end={user.completed_quizzes.length} style={countUpStyle} />
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
              <Divider
                orientation="horizontal"
                variant="middle"
                sx={{ bgcolor: "secondary.main" }}
              />
              <Stack
                p={2}
                alignItems={"center"}
                direction={{ xs: "column", lg: "row" }}
                justifyContent={"space-evenly"}
              >
                <Typography variant="h4">Statistiken</Typography>
                <Grid container item xs={12} md={6} spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body1">Login Streak:</Typography>
                    <CountUp end={user.statistics.login_streak} style={countUpStyle} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body1">Max. Login Streak:</Typography>
                    <CountUp end={user.statistics.max_login_streak} style={countUpStyle} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body1">Gespielte Quizze:</Typography>
                    <CountUp end={user.statistics.played_quizzes} style={countUpStyle} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body1">Korrekte Antworten:</Typography>
                    <CountUp end={user.statistics.correct_answers} style={countUpStyle} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body1">Falsche Antworten:</Typography>
                    <CountUp end={user.statistics.incorrect_answers} style={countUpStyle} />
                  </Grid>
                </Grid>
              </Stack>
              <Divider
                orientation="horizontal"
                variant="middle"
                sx={{ bgcolor: "secondary.main" }}
              />
              <Stack
                p={2}
                direction={{ xs: "column", lg: "row" }}
                justifyContent={"space-evenly"}
                alignItems={"center"}
              >
                <Typography variant="h4">Zeitstempel</Typography>
                <Grid container item xs={12} md={6} spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body1">Erstellt am:</Typography>
                    <Typography color="accent.main" variant="body1">
                      {new Date(user.timestamps.created_at).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="body1">Letzter Login am:</Typography>
                    <Typography color="accent.main" variant="body1">
                      {new Date(user.timestamps.last_login).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </ContainerWithHeader>
        </>
      )}
    </>
  );
}
