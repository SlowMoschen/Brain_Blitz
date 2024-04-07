import { Box, Typography } from "@mui/material";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { privacySteps } from "./content";

interface StepProps {
  number: number;
  headerTitle: string;
  mainText?: string;
  subSteps?: SubStepProps[];
}

interface SubStepProps {
  title: string;
  text: string;
}

/**
 * This component represents a single step in the privacy policy.
 * It can contain a main text and multiple sub steps.
 */
function Step({ number, headerTitle, mainText, subSteps }: StepProps) {
  return (
    <Box my={5}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography
          variant="h5"
          sx={{ color: "accent.main", mr: 1, fontWeight: "600" }}
        >
          {number}.
        </Typography>
        <Typography variant="subtitle1" fontWeight={600}>
          {headerTitle}
        </Typography>
      </Box>

      {/* Render sub steps if available */}
      {subSteps &&
        subSteps.map((subStep, index) => (
          <Box key={index} my={3}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "accent.main", mr: 1, fontWeight: "500" }}
              >
                {number}.{index + 1}
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={600}
              >
                {subStep.title}
              </Typography>
            </Box>
            <Typography variant="body2">{subStep.text}</Typography>
          </Box>
        ))}

      {/* Render Maintext if no subSteps are defined */}
      {mainText && !subSteps && <Typography variant="body2">{mainText}</Typography>}
    </Box>
  );
}

export default function Privacy() {
  const containerStyles = {
    p: 4,
    my: 15,
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    width: "90%",
    maxWidth: BREAKPOINTS.lg,
  };

  return (
    <Box sx={ containerStyles }>
      <Typography variant="h5" textAlign={"center"} className="border-b-accent">
        Datenschutzerklärung
      </Typography>
      <Typography variant="body1" my={2}>
        Wir bei Brain Blitz, erreichbar unter der E-Mail-Adresse
        service@brain-blitz.com, legen großen Wert auf den Schutz deiner
        persönlichen Daten. Diese Datenschutzerklärung erläutert, wie wir deine
        Informationen sammeln, verwenden, offenlegen und schützen, wenn du
        unsere Quiz-App nützt.
      </Typography>
      {privacySteps.map((step, index) => (
        <Step
          key={index}
          number={index + 1}
          headerTitle={step.headerTitle}
          mainText={step.mainText}
          subSteps={step.subSteps}
        />
      ))}

      <Typography sx={{ opacity: ".5", fontSize: ".8rem" }}>
        Diese Datenschutzerklärung wurde zuletzt am 02.04.2024 aktualisiert.
      </Typography>
    </Box>
  );
}
