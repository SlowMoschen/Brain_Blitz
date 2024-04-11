import { Stack, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../../../../shared/types/User";

interface RankingBarProps {
  value: number | string;
  name: string;
  rank: number;
  user_id: string;
}

export default function RankingBar({ value, name, rank, user_id }: RankingBarProps) {
  const { user } = useOutletContext<UserContext>();

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "space-between", lg: "flex-start" },
    flexDirection: { xs: "row", lg: "column" },
    padding: "1rem",
    height: { xs: "100px", lg: rank === 1 ? "20rem" : rank === 2 ? "14rem" : "10rem" },
    width: { xs: rank === 1 ? "90%" : rank === 2 ? "85%" : "75%", lg: "100%" },
    bgcolor:
      value === 0 || value === "00:00"
        ? "secondary.dark"
        : rank === 1
        ? "#d4af37"
        : rank === 2
        ? "silver"
        : "#bf8970",
    color: value === 0 ? "text.main" : "text.dark",
    order: { xs: rank, lg: rank === 2 ? 1 : rank === 2 ? 1 : 3 },
    borderRadius: { xs: "0 .375rem .375rem 0", lg: ".375rem .375rem 0 0" },
  };

  return (
    <Stack sx={styles}>
      <Typography variant="h5" fontSize={{ md: 30, lg: 40 }}>
        {value === 0 || value === "00:00" ? "" : rank === 1 ? "👑" : rank === 2 ? "🥈" : "🥉"}
      </Typography>
      <Typography variant="subtitle1" fontSize={{ md: 25, lg: 30 }}>
        {
          user_id === user.id
          ? `${name} (Du)`
          : name
        }
      </Typography>
      <Typography variant="body1" fontSize={{ md: 20 }} sx={{ textDecoration: "underline" }}>
        {typeof value === "number" && value === 0
          ? ""
          : typeof value === "string" && value === "00:00"
          ? ""
          : value}
      </Typography>
    </Stack>
  );
}
