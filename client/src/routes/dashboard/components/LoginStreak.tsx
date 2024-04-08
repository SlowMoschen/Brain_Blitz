import { Typography } from "@mui/material";
import InfoContainer from "./InfoContainer";
import StarIcon from '@mui/icons-material/Star';

interface LoginStreakProps {
  streak: number;
}

export default function LoginStreak({ streak = 0 }: LoginStreakProps) {
  return (
    <>
      <InfoContainer>
        <StarIcon sx={{ color: "yellow" }} />
        <Typography variant="caption" fontSize={15} fontWeight={600}>Login-Streak:</Typography>
        <Typography variant="h6" color={"accent.main"}>
          {streak}
        </Typography>
        <Typography variant="caption">Tage</Typography>
      </InfoContainer>
    </>
  );
}
