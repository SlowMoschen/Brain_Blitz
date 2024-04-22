import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import Logo from "../../../../shared/components/Logo";
import RouterButton from "../../../../shared/components/buttons/RouterButton";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";
import ServerStatus from "../../../../shared/components/ServerStatus";
import { accountLinks, legalLinks, navigationLinks } from "./links";

export default function Footer() {
  const { width } = useContext(WindowContext);

  const isMobile = width < BREAKPOINTS.md;

  const footerStyles = {
    bgcolor: "background.secondary",
    mx: 1,
    py: 2,
    borderRadius: ".375rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: isMobile ? "flex-start" : "center",
    flexDirection: isMobile ? "column" : "row",
    p: 2,
    width: "100%",
  };

  const linkContainerStyles = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "flex-start",
    width: "70%",
  };

  const imgContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "100%" : "30%",
  };

  const linkBoxStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    p: 2,
    width: "100%",
  };

  const linkBoxHeaderStyles = {
    opacity: "50%",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    mb: 1,
  };

  const btnStyles = {
    p: 0,
    textAlign: "left",
    my: 0.2,
    justifyContent: "flex-start",
  };

  return (
    <Box sx={{ ...footerStyles }}>
      <Box sx={{ ...containerStyles }}>
        <Box sx={{ ...imgContainerStyles }}>
          <Logo maxWidth="200px" />
        </Box>
        <Box sx={{ ...linkContainerStyles }}>
          <Box sx={{ ...linkBoxStyles }}>
            <Typography sx={{ ...linkBoxHeaderStyles }}>Navigation</Typography>
            {navigationLinks.map((link, index) => (
              <RouterButton
                key={index}
                to={link.to}
                variant="text"
                text={link.text}
                color="text"
                sx={{ ...btnStyles }}
              />
            ))}
          </Box>
          <Box sx={{ ...linkBoxStyles }}>
            <Typography sx={{ ...linkBoxHeaderStyles }}>Account</Typography>
            {accountLinks.map((link, index) => (
              <RouterButton
                key={index}
                to={link.to}
                variant="text"
                text={link.text}
                color="text"
                sx={{ ...btnStyles }}
              />
            ))}
          </Box>
          <Box sx={{ ...linkBoxStyles }}>
            <Typography sx={{ ...linkBoxHeaderStyles }}>Rechtliches</Typography>
            {legalLinks.map((link, index) => (
              <RouterButton
                key={index}
                to={link.to}
                variant="text"
                text={link.text}
                color="text"
                sx={{ ...btnStyles }}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Divider sx={{ width: "98%", opacity: "50%", bgcolor: "secondary.main" }} />
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent={{ xs: "center", lg: "space-between" }}
        alignItems={{ xs: "flex-start", lg: "center" }}
        p={2}
        width={"100%"}
      >
        <Stack my={1}>
          <Typography>© {new Date().getFullYear()} Brain Blitz</Typography>
          <Typography>Made with ❤️ by Philipp Millner</Typography>
          <Typography variant="caption">
            Design Inspiration von
            <RouterButton
              color="primary"
              to="https://www.realtimecolors.com/"
              text="RealTimeColors"
              sx={{
                px: 1,
                fontSize: "0.75rem",
                textDecoration: "underline",
                color: "primary.main",
              }}
            />
          </Typography>
        </Stack>
        <ServerStatus />
      </Stack>
    </Box>
  );
}
