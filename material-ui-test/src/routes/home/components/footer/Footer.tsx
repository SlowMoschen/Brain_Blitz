import { Box, Divider, Typography } from "@mui/material";
import Logo from "../../../../shared/components/Logo";
import RouterButton from "../../../../shared/components/buttons/RouterButton";
import { accountLinks, legalLinks, navigationLinks } from "./links";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";

export default function Footer() {
  const { width } = useScreenSize();

  const isMobile = width < BREAKPOINTS.md;

  const footerStyles = {
    bgcolor: "background.secondary",
    mx: 1,
    py: 2,
    borderRadius: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
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
    "&:hover": {
      bgcolor: "transparent",
      color: "primary.main",
    },
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          p: 2,
          width: "100%",
        }}
      >
        <Typography>© {new Date().getFullYear()} Brain Blitz</Typography>
        <Typography>Made with ❤️ by Philipp Millner</Typography>
      </Box>
    </Box>
  );
}
