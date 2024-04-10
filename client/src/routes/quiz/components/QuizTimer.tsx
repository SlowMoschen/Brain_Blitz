import { LinearProgress, Stack, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useTimeParser } from "../../../shared/hooks/timer/useTimeParser.hook";

interface TimerProps {
  time: number;
}

/**
 * @description Overrides the default LinearProgress component to style the timer bar
 */
const LinearTimerBar = styled(LinearProgress)(({ value, theme }) => ({
  borderRadius: 8,
  height: 8,
  [`& .MuiLinearProgress-bar`]: {
    transition: "all 1s linear",
    backgroundColor:
      value! < 20
        ? theme.palette.error.main
        : value! < 50
        ? theme.palette.warning.main
        : theme.palette.success.main,
  },
}));

/**
 * @description A component to display the time left in a quiz
 * @param {number} time - The time left in the quiz
 */
export default function QuizTimer({ time }: TimerProps) {
  const [progress, setProgress] = useState<number>(100);
  const { parseMinuteString } = useTimeParser();

  // Calculate the time in milliseconds to a percentage
  const calculateTime = () => {
    return (time / 3 / 60000) * 100;
  };

  useEffect(() => {
    setProgress(calculateTime());
  }, [time]);

  return (
    <Stack width={"100%"} alignItems={"center"} direction={{ xs: "column", lg: "row" }} gap={1}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {parseMinuteString(time)}
      </Typography>
      <LinearTimerBar variant="determinate" value={progress} sx={{ width: "100%" }} />
    </Stack>
  );
}
