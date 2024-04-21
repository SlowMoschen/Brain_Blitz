import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Badge, Grid, Stack, Typography } from "@mui/material";
import CountUp from "react-countup";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import { useAuthQueries } from "../../../../../shared/hooks/api/useAuthQueries.hook";
import { useUserContext } from "../../../../../shared/hooks/context/useUserContext.hook";
import { formatValue } from "../../../../../shared/services/ValueFormatter.service";
import AvatarIcon from "./AvatarIcon";

export default function ProfileStats() {
  const user = useUserContext();
  const { mutate: logout } = useAuthQueries().useLogout();

  const countUpStyle = { color: "#99ff66", fontSize: "1.3rem" };

  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      justifyContent={{
        xs: "center",
        md: "space-between",
      }}
      alignItems={"center"}
      p={5}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        alignItems={"center"}
      >
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
          <AvatarIcon />
        </Badge>
        <Grid container mx={4} my={2} spacing={2}>
          <Grid item xs={12} md={6} gridRow={2} alignItems={"center"} justifyContent={"center"}>
            <Typography variant="h4">{`${formatValue(user.first_name, [
              "capitalize",
            ])} ${formatValue(user.last_name, ["capitalize"])}`}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              ID: {user.id}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={12} lg={6}>
              <Typography variant="subtitle1">Gesamktpunkte:</Typography>
              <CountUp end={user.statistics.points} style={countUpStyle} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="subtitle1">Abgeschlossene Quiz:</Typography>
              <CountUp end={user.statistics.played_quizzes} style={countUpStyle} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="subtitle1">Richtige Antworten:</Typography>
              <CountUp end={user.statistics.correct_answers} style={countUpStyle} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="subtitle1">Falsche Antworten:</Typography>
              <CountUp end={user.statistics.incorrect_answers} style={countUpStyle} />
            </Grid>
          </Grid>
        </Grid>
      </Stack>
      <CallToAction text="Logout" color="error" size="large" onClick={() => logout(undefined)} />
    </Stack>
  );
}
