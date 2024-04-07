import { Box, Stack, Typography } from "@mui/material";
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

  const howSectionOffset = 200;
  const scrollTo = (id: string, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  const mainContainer = {
    flexDirection: { xs: "column", lg: "row" },
    justifyContent: { lg: "space-evenly", xs: "center" },
    alignItems: "center",
    height: "100vh",
    width: "100%",
    mt: { xs: 10, lg: 0 },
  };

  const btnContainer = {
    flexDirection: { lg: "row", xs: "column" },
    alignItems: "center",
  };

  const buttons = {
    width: { xl: "350px", xs: "300px" },
    m: 0.5,
    p: 1,
    fontWeight: "600",
  };

  const title = {
    fontWeight: "600",
    textAlign: { lg: "left", xs: "center" },
    fontSize: { xl: "10rem", lg: "8rem", xs: "6rem" },
  };

  const subTitle = {
    fontWeight: "400",
    textAlign: { lg: "left", xs: "center" },
    fontSize: { xl: "2.5rem", lg: "2.2rem", xs: "2rem" },
  };

  const image = {
    width: "100%",
    height: "auto",
    maxWidth: { xl: "450px", lg: "300px", xs: "200px" },
    my: 1,
  };

  return (
    <>
      <Stack sx={mainContainer}>
        <Stack justifyContent={"flex-start"}>
          <Typography variant="h1" sx={title} className="animated-bg">
            Brain Blitz
          </Typography>
          <Typography variant="h4" sx={subTitle}>
            Baue dein Wissen auf, Kategorie für Kategorie
          </Typography>
          <Stack sx={btnContainer}>
            <SecondaryButton
              text="Wie funktioniert Brain Blitz?"
              sx={buttons}
              onClick={() => scrollTo("how-section", howSectionOffset)}
            />
            <CallToAction
              text="Jetzt loslegen!"
              sx={buttons}
              onClick={() => redirect(URLS.SIGNUP)}
            />
          </Stack>
        </Stack>
        <Box sx={image} component={"img"} src={brainPNG} alt="Wired Brain Header"></Box>
      </Stack>
    </>
  );
}
