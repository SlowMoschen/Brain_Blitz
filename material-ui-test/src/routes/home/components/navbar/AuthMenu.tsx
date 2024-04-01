import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import SecondaryButton from "../../../../shared/components/buttons/SecondaryButton";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import CallToAction from "../../../../shared/components/buttons/CallToAction";

export default function AuthMenu() {
  const redirect = useNavigate();
  const { width } = useScreenSize();

  const isMobile = width <= BREAKPOINTS.sm;
  const defaultStyles = {
    mx: 1,
    width: isMobile ? "100%" : "120px",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SecondaryButton
        text="Login"
        onClick={() => redirect("/auth/login")}
        sx={{ ...defaultStyles }}
      />
      <CallToAction
        text="Anmelden"
        onClick={() => redirect("/auth/register")}
        sx={{ ...defaultStyles }}
      />
    </Box>
  );
}
