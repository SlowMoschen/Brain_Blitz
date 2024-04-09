import { Stack, Typography } from "@mui/material";
import { useCountdownTimer } from "../../shared/hooks/timer/useCountdownTimer.hook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface RedirectErrorPageProps {
  redirectTo: string;
  redirectUrl: string;
  message: string;
}

export default function RedirectErrorPage({
  redirectTo,
  redirectUrl,
  message,
}: RedirectErrorPageProps) {
  const redirect = useNavigate();
  const redirectDelay = 3000;
  const { currentTime, startTimer } = useCountdownTimer(redirectDelay);

  useEffect(() => {
    setTimeout(() => {
      startTimer();
    }, 1000);
  }, []);

  useEffect(() => {
    if (currentTime === 0) redirect(redirectUrl);
  }, [currentTime]);

  return (
    <>
      <Stack alignItems={"center"} height={"100vh"} justifyContent={"center"}>
        <Typography variant="h4">{message}</Typography>
        <Typography variant="body1">
          Du wirst in {currentTime / 1000} Sekunden zurück {redirectTo} geleitet...
        </Typography>
      </Stack>
    </>
  );
}
