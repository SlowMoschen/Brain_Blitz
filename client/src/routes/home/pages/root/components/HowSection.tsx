import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { WindowContext } from "../../../../../shared/context/ScreenSize.context";
import { howCardContent } from "../content/HowCard.content";
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
  const numberContainer = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "accent.main",
    mr: 1,
  };

  const header = {
    fontSize: "1.3rem",
    borderBottom: "4px solid",
    borderColor: "accent.light",
    mb: 1,
    width: "fit-content",
  };

  return (
    <Stack gap={"1rem"}>
      <Box sx={numberContainer}>{number}</Box>
      <Stack>
        <Typography variant="h5" sx={header}>
          {title}
        </Typography>
        <Typography lineHeight={2}>{description}</Typography>
      </Stack>
    </Stack>
  );
}

/**
 * This component displays the steps in a grid on desktop and in a column on mobile.
 * It maps over the howCardContent array and creates a Step component for each element.
 */
function GridSteps() {
  return (
    <>
      <Grid container spacing={2}>
        {howCardContent.map((content, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Step
              key={index}
              number={content.number}
              title={content.title}
              description={content.description}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function ColumnSteps() {
  return (
    <>
      <Stack gap={2}>
        {howCardContent.map((content, index) => (
          <Step
            key={index}
            number={content.number}
            title={content.title}
            description={content.description}
          />
        ))}
      </Stack>
    </>
  );
}

/**
 * This component represents the how section.
 * It displays a header and 4 steps.
 * The steps are displayed in a grid on desktop and in a column on mobile.
 * Each step has a number, title and description.
 */
export default function HowSection() {
  const { width } = useContext(WindowContext);

  const mainContainer = {
    flexDirection: { xs: "column", lg: "row" },
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    p: 5,
    m: 5,
    width: "90%",
    maxWidth: "1500px",
    minHeight: "500px",
  };

  const header = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: { xs: "2rem", lg: "3.2rem" },
  };

  return (
    <Stack sx={mainContainer}>
      <div id="how-section"></div>
      <Box mb={2}>
        <Typography variant="h4" sx={header}>
          Wie funktioniert Brain Blitz?
        </Typography>
        <Typography textAlign={"center"}>In 4 Schritten zu mehr Wissen!</Typography>
      </Box>
      {width > BREAKPOINTS.md ? <GridSteps /> : <ColumnSteps />}
    </Stack>
  );
}
