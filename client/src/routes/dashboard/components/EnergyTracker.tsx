import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Typography } from "@mui/material";
import use15MinuteTimer from '../../../shared/hooks/use15MinuteTimer.hook';
import InfoContainer from "./InfoContainer";

interface EnergyTrackerProps {
    energy: number;
    }

export default function EnergyTracker({ energy = 100 }: EnergyTrackerProps) {
    const { time } = use15MinuteTimer();


    return (
        <>
        <InfoContainer>
          <FlashOnIcon sx={{ color: "yellow" }} />
          <Typography variant="caption" fontSize={15} fontWeight={600}>Energie:</Typography>
          <Typography variant="h6" color={"accent.main"}>
            {energy}/100
          </Typography>
            <Typography variant="caption">{time}</Typography>
        </InfoContainer>
      </>
    )
}