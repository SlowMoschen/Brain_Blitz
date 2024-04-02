import { Box, Typography } from "@mui/material";
import brainPNG from "../../../../../assets/brain.png";
import { BREAKPOINTS } from "../../../../../configs/Breakpoints";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../../shared/components/buttons/SecondaryButton";
import useScreenSize from "../../../../../shared/hooks/useScreenSize";
import { useNavigate } from "react-router-dom";


/**
 * This component represents the hero section.
 * It displays a title, a subtitle, two buttons and an image.
 * The title and subtitle are displayed in a column on mobile and in a row on desktop.
 * The buttons are displayed in a row on mobile and in a column on desktop.
 * The image is displayed below the text on mobile and to the right on desktop.
 */
export default function Herosection() {
  const { width } = useScreenSize();
  const redirect = useNavigate();

  const scrollTo = (id: string, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  const isDesktop = width >= BREAKPOINTS.lg;
  const isMobile = width <= BREAKPOINTS.md;
  const isXL = width >= BREAKPOINTS.xl;

  const mainContainerStyle = {
    display: "flex",
    flexDirection: isDesktop ? "row" : "column",
    justifyContent: isDesktop ? "space-evenly" : "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    mt: isDesktop ? 0 : 10,
  };

  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: isDesktop ? "flex-start" : "center",
    alignItems: "center",
  };

  const titleStyle = {
    fontWeight: "600",
    textAlign: isDesktop ? "left" : "center",
    fontSize: isXL ? "10rem" : isDesktop ? "8rem" : "6rem",
  };

  const subTitleStyle = {
    fontWeight: "400",
    textAlign: isDesktop ? "left" : "center",
    fontSize: isXL ? "2.5rem" : isDesktop ? "2.2rem" : "2rem",
  };

  const buttonStyle = {
    width: isXL ? "350px" : "300px",
    m: 0.5,
    p: 1,
    fontWeight: "600",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    maxWidth: isXL ? "450px" : isDesktop ? "300px" : "200px",
  };

  return (
    <>
      <Box sx={{ ...mainContainerStyle }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <Typography variant="h1" sx={{ ...titleStyle }} className="animated-bg">
            Brain Blitz
          </Typography>
          <Typography variant="h4" sx={{ ...subTitleStyle }}>
            Baue dein Wissen auf, Kategorie für Kategorie
          </Typography>
          <Box sx={{ ...containerStyle, my: 1 }}>
            <SecondaryButton
              text="Wie funktioniert Brain Blitz?"
              sx={{ ...buttonStyle }}
              onClick={() => scrollTo("how-section", 200)}
            />
            <CallToAction
              text="Jetzt loslegen!"
              sx={{ ...buttonStyle }}
              onClick={() => redirect("/auth/register")}
            />
          </Box>
        </Box>
        <Box sx={{ my: 1 }}>
          <img src={brainPNG} style={{ ...imageStyle }} />
        </Box>
      </Box>
    </>
  );
}
