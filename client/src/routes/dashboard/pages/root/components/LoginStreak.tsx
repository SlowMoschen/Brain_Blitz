import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";
import { useUserContext } from "../../../../../shared/hooks/context/useUserContext.hook";
import InfoContainer from "../../../components/InfoContainer";

export default function LoginStreak() {
  const user = useUserContext();

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
