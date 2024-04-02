import { Box, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";
import { useOutletContext } from "react-router-dom";
import { TIMES } from "../../../../../configs/Application";
import useScreenSize from "../../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../../configs/Breakpoints";

interface DataCountUpCardProps {
  count: number;
  textContent: string;
  bgColor: "primary.main" | "primary.light" | "secondary.main" | "accent.light";
  isColumn?: boolean;
}

interface IQuizData {
  uniqueCategories: number;
  totalQuestions: number;
  totalQuizzes: number;
  categoryStats: {
    category: string;
    totalQuestions: number;
    totalQuizzes: number;
  }[];
}

function DataCountUpCard({ count, textContent, bgColor, isColumn }: DataCountUpCardProps) {
  const { width } = useScreenSize();
  const isMobile = width <= BREAKPOINTS.md;

  const containerStyles = {
    backgroundColor: bgColor,
    borderRadius: ".375rem",
    display: "flex",
    flexDirection: isMobile || isColumn ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#1a1a1a",
    fontSize: "1.5rem",
    height: "208px",
    p: 5,
  };

  const countUpStyles = {
    fontSize: isMobile ? "3rem" : "4.5rem",
    fontWeight: 600,
  };

  const textStyles = {
    fontSize: isMobile ? "1.5rem" : "2rem",
    textAlign: "center",
    ml: 1,
  };

  return (
    <Box sx={{ ...containerStyles }}>
      <CountUp
        end={count}
        enableScrollSpy
        scrollSpyOnce
        scrollSpyDelay={TIMES.COUNT_UP_DELAY}
        duration={TIMES.COUNT_UP_DURATION}
        style={countUpStyles}
      />
      <Typography variant="h5" sx={{ ...textStyles }}>
        {textContent}
      </Typography>
    </Box>
  );
}

export default function QuizData() {
  const data = useOutletContext<IQuizData>();

  if (!data) {
    return (
      <Typography variant="h4" textAlign="center" color="error.main">
        Daten konnten nicht geladen werden
      </Typography>
    );
  }

  const containerStyles = {
    flexGrow: 1,
    width: "90%",
    bgcolor: "background.secondary",
    p: 3,
    m:10,
    borderRadius: ".375rem",
    maxWidth: "1500px",
  };

  const freeContainerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    color: "accent.main",
    bgcolor: "primary.light",
    borderRadius: ".375rem",
    height: "208px",
  };

  return (
    <Box sx={{ ...containerStyles }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <DataCountUpCard
            count={data.totalQuizzes}
            textContent="spielbare Quizzes"
            bgColor="primary.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DataCountUpCard
            count={data.totalQuestions}
            textContent="Fragen zu beantworten"
            bgColor="secondary.main"
            isColumn
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <DataCountUpCard
            count={data.uniqueCategories}
            textContent="einzigartige Kategorien"
            bgColor="accent.light"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ ...freeContainerStyles }}>
            <Typography variant="h4" fontWeight={500} sx={{ textDecoration: "underline", fontSize: '3rem' }}>
              100% Gratis
            </Typography>
            <Typography variant="body1">für immer...</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
