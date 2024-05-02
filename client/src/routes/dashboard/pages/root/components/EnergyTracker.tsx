import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Typography } from "@mui/material";
import { useUserContext } from "../../../../../shared/hooks/context/useUserContext.hook";
import use15MinuteTimer from "../../../../../shared/hooks/timer/use15MinuteTimer.hook";
import InfoContainer from "../../../components/InfoContainer";

export default function EnergyTracker() {
  const user = useUserContext();
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
