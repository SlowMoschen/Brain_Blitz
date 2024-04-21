import { Box } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { URLS } from "../../../../configs/Links";
import CallToAction from "../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../shared/components/buttons/SecondaryButton";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";

export default function AuthMenu() {
  const redirect = useNavigate();
  const { width } = useContext(WindowContext);

  const isMobile = width <= BREAKPOINTS.sm;
  const defaultStyles = {
    mx: 1,
    width: isMobile ? "100%" : "120px",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SecondaryButton
        text="Login"
        onClick={() => redirect(URLS.SIGNIN)}
        sx={{ ...defaultStyles }}
      />
      <CallToAction
        text="Registrieren"
        onClick={() => redirect(URLS.SIGNUP)}
        sx={{ ...defaultStyles }}
      />
    </Box>
  );
}
