import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import use15MinuteTimer from "../../../shared/hooks/timer/use15MinuteTimer.hook";
import { UserContext } from "../../../shared/types/User";
import InfoContainer from "./InfoContainer";

export default function EnergyTracker() {
  const { user } = useOutletContext<UserContext>();
  const { time } = use15MinuteTimer();

  return (
    <>
      <InfoContainer>
        <FlashOnIcon sx={{ color: "yellow" }} />
        <Typography variant="h6" color={"accent.main"}>
          {user.energy}/100
        </Typography>
        <Typography variant="caption">{time}</Typography>
      </InfoContainer>
    </>
  );
}
