import { Typography } from "@mui/material";
import InfoContainer from "./InfoContainer";
import StarIcon from "@mui/icons-material/Star";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../../shared/types/User";

export default function LoginStreak() {
  const { user } = useOutletContext<UserContext>();

  return (
    <>
      <InfoContainer>
        <StarIcon sx={{ color: "yellow" }} />
        <Typography variant="h6" color={"accent.main"} fontWeight={600}>
          {user.statistics.login_streak}
        </Typography>
        <Typography variant="caption">Tage</Typography>
        <Typography variant="caption">Login-Streak</Typography>
      </InfoContainer>
    </>
  );
}
