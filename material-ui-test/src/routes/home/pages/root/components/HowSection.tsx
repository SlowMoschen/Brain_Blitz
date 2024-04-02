import { Box, Typography } from "@mui/material";
import useScreenSize from "../../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../../configs/Breakpoints";

interface StepProps {
  number: number;
  title: string;
  description: string;
}

/**
 * This component represents a step in the how section.
 * It takes a number, title and description as props.
 * The number is accent colored, the title is displayed as a heading and the description is displayed as a paragraph.
 */
function Step({ number, title, description }: StepProps) {
  const containerStyles = {
    display: "flex",
    gap: "1rem",
  };

  const numberStyles = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "accent.main",
    mr: 1,
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
  };

  const titleStyles = {
    fontSize: "1.3rem",
    borderBottom: "4px solid",
    borderColor: "accent.light",
    mb: 1,
    width: "fit-content",
    letterSpacing: "0.1rem",
  };

  return (
    <Box sx={{ ...containerStyles }}>
      <Box sx={{ ...numberStyles }}>{number}</Box>
      <Box>
        <Typography variant="h5" sx={{ ...titleStyles }}>
          {title}
        </Typography>
        <Typography lineHeight={2}>{description}</Typography>
      </Box>
    </Box>
  );
}

/**
 * This component represents the how section.
 * It displays a header and 4 steps.
 * The steps are displayed in a grid on desktop and in a column on mobile.
 * Each step has a number, title and description.
 */
export default function HowSection() {
  const { width } = useScreenSize();

  const isMobile = width < BREAKPOINTS.lg;

  const containerStyles = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    p: 5,
    m: 5,
    width: "90%",
    maxWidth: "1500px",
    minHeight: "500px",
  };

  const headerStyles = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: isMobile ? "2rem" : "3.2rem",
  };

  const stepContainerStyles = {
    display: isMobile ? "flex" : "grid",
    flexDirection: "column",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(2, 1fr)",
    width: "100%",
  };

  return (
    <Box sx={{ ...containerStyles }}>
      <div id="how-section"></div>
      <Box mb={2}>
        <Typography variant="h4" sx={{ ...headerStyles }}>
          Wie funktioniert Brain Blitz?
        </Typography>
        <Typography textAlign={"center"}>In 4 Schritten zu mehr Wissen!</Typography>
      </Box>
      <Box sx={{ ...stepContainerStyles }}>
        <Step
          number={1}
          title="Registrieren"
          description="Regestriere dich, kostenlos und unverbindlich!"
        />
        <Step
          number={2}
          title="Quiz auswählen"
          description="Wähle eines der Start-Quizzes aus, welches dich interessiert!"
        />
        <Step
          number={3}
          title="Absolviere das Quiz"
          description="Beantworte Fragen unter Zeitdruck, sammle Punkte für jede richtige Antwort und sei clever, denn falsche Antworten kosten dich wertvolle Punkte. Aber keine Sorge, die Zeit arbeitet für dich! Je schneller du bist, desto mehr Punkte kannst du zusätzlich verdienen."
        />
        <Step
          number={4}
          title="Neue Kategorien Freischalten"
          description="Nach erfolgreichem Absolvieren eines Quiz schaltest du neue faszinierende Quizzes in verschiedenen Kategorien frei, die darauf warten, von dir entdeckt zu werden."
        />
      </Box>
    </Box>
  );
}
