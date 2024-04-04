import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import brainPNG from "../../../../../assets/brain.png";
import { URLS } from "../../../../../configs/Links";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../../shared/components/buttons/SecondaryButton";

/**
 * This component represents the hero section.
 * It displays a title, a subtitle, two buttons and an image.
 * The title and subtitle are displayed in a column on mobile and in a row on desktop.
 * The buttons are displayed in a row on mobile and in a column on desktop.
 * The image is displayed below the text on mobile and to the right on desktop.
 */
export default function Herosection() {
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

  const mainContainerStyle = {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    justifyContent: { lg: "space-evenly", xs: "center" },
    alignItems: "center",
    height: "100vh",
    width: "100%",
    mt: { xs: 10, lg: 0 },
  };

  const containerStyle = {
    display: "flex",
    flexDirection: { lg: "row", xs: "column" },
    justifyContent: { lg: "flex-start", xs: "center" },
    alignItems: "center",
  };

  const titleStyle = {
    fontWeight: "600",
    textAlign: { lg: "left", xs: "center" },
    fontSize: { xl: "10rem", lg: "8rem", xs: "6rem" },
  };

  const subTitleStyle = {
    fontWeight: "400",
    textAlign: { lg: "left", xs: "center" },
    fontSize: { xl: "2.5rem", lg: "2.2rem", xs: "2rem" },
  };

  const buttonStyle = {
    width: { xl: "350px", xs: "300px" },
    m: 0.5,
    p: 1,
    fontWeight: "600",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    maxWidth: { xl: "450px", lg: "300px", xs: "200px" },
    my: 1,
  };

  return (
    <>
      <Box sx={mainContainerStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h1" sx={titleStyle} className="animated-bg">
            Brain Blitz
          </Typography>
          <Typography variant="h4" sx={subTitleStyle}>
            Baue dein Wissen auf, Kategorie für Kategorie
          </Typography>
          <Box sx={containerStyle}>
            <SecondaryButton
              text="Wie funktioniert Brain Blitz?"
              sx={buttonStyle}
              onClick={() => scrollTo("how-section", 200)}
            />
            <CallToAction
              text="Jetzt loslegen!"
              sx={buttonStyle}
              onClick={() => redirect(URLS.SIGNUP)}
            />
          </Box>
        </Box>
        <Box
          sx={imageStyle}
          component={"img"}
          src={brainPNG}
          alt="Wired Brain Header"
        ></Box>
      </Box>
    </>
  );
}
