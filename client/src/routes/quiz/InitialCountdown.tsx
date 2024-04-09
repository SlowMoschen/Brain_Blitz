import { CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useCountdownTimer } from "../../shared/hooks/timer/useCountdownTimer.hook";
import { useGameSounds } from "../../shared/hooks/game/useGameSounds.hook";

export default function InitialCountdown() {
  const [hasFinished, setHasFinished] = useState(false);
  const { currentTime, startTimer } = useCountdownTimer(3000);
  const { playSound } = useGameSounds();
  const intervalRef = useRef(0);

  useEffect(() => {
    startTimer();
    intervalRef.current = setInterval(() => {
      playSound("timerBeep");
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (currentTime === 0) {
      clearInterval(intervalRef.current);
      setHasFinished(true);
    }
  }, [currentTime]);

    if (hasFinished) return null;

  return (
    <>
      <Stack
        alignItems={"center"}
        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <CircularProgress variant="determinate" size={80} value={(currentTime / 3000) * 100} />
        <Typography variant="h4">
          {currentTime === 0 ? "Los gehts!" : Math.floor(currentTime / 1000)}
        </Typography>
      </Stack>
    </>
  );
}
