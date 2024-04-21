import { Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../../shared/hooks/context/useUserContext.hook";

interface RankingBarProps {
  value: number | string;
  name: string;
  rank: number;
  user_id: string;
  onClick?: () => void;
}

export default function RankingBar({ value, name, rank, user_id, onClick }: RankingBarProps) {
  const user = useUserContext();

  const isZero = value === 0 || value === "00:00";

  // conditional styling
  const desktopHeight = rank === 1 ? "20rem" : rank === 2 ? "14rem" : "10rem";
  const mobileWidth = rank === 1 ? "90%" : rank === 2 ? "85%" : "75%";
  const bgcolor = isZero
    ? "secondary.dark"
    : rank === 1
    ? "#d4af37"
    : rank === 2
    ? "silver"
    : "#bf8970";
  const color = isZero ? "text.main" : "text.dark";

  // codition to display  1st rankingbar in the middle on desktop
  const desktopOrder = rank === 1 ? 2 : rank === 2 ? 1 : 3;

  // hover effect if onClick is passed
  const hover = onClick ? { cursor: "pointer", filter: "brightness(0.8)" } : {};

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "space-between", lg: "flex-start" },
    flexDirection: { xs: "row", lg: "column" },
    padding: "1rem",
    height: { xs: "100px", lg: desktopHeight },
    width: { xs: mobileWidth, lg: "100%" },
    bgcolor,
    color,
    order: { xs: rank, lg: desktopOrder },
    borderRadius: { xs: "0 .375rem .375rem 0", lg: ".375rem .375rem 0 0" },
    '&:hover': hover,
    
  };

  return (
    <Stack sx={styles} onClick={onClick}>
      <Typography variant="h5" fontSize={{ md: 30, lg: 40 }}>
        {isZero ? "" : rank === 1 ? "👑" : rank === 2 ? "🥈" : "🥉"}
      </Typography>
      <Typography variant="subtitle1" fontSize={{ md: 25, lg: 30 }} align="center">
        {user_id === user.id ? `${name} (Du)` : `${name.length > 15 ? name.slice(0, 10) + "..." : name}`}
      </Typography>
      <Typography variant="body1" fontSize={{ md: 20 }} sx={{ textDecoration: "underline" }}>
        {isZero ? "" : value}
      </Typography>
    </Stack>
  );
}
