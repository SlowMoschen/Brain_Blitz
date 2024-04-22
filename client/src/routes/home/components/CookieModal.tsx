import { Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CallToAction from "../../../shared/components/buttons/CallToAction";
import { useCookies } from "../../../shared/hooks/useCookies";

export default function CookieModal() {
  const [open, setOpen] = useState(false);
  const { getCookie, setCookie } = useCookies();
  const cookieTag = "bb-cookie-consent";

  useEffect(() => {
    if (!getCookie(cookieTag)) setOpen(true);
  }, []);

  const handleCookieConsent = () => {
    setCookie(cookieTag, "true", 365);
    setOpen(false);
  };

  return (
      <Paper
        role="dialog"
        square
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, bgcolor: "background.secondary" }}
        hidden={!open}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
          sx={{ p: 2 }}
        >
          <Typography variant={"body2"}>
            Diese Website verwendet Session-Cookies, um die Nutzererfahrung zu verbessern. Durch die
            Nutzung der Website stimmst du der Verwendung von Cookies zu.
          </Typography>
          <Box>
            <CallToAction onClick={() => handleCookieConsent()} text="Verstanden" />
          </Box>
        </Stack>
      </Paper>
  );
}
