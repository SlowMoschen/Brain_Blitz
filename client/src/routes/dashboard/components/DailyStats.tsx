import { Grid, Typography } from "@mui/material";
import ContainerWithHeader from "./ContainerWithHeader";
import { IDailyStats } from "../../../shared/hooks/localStorage/useDailyStatsTracker.hook";

interface DailyStatsProps {
  stats: IDailyStats;
}

const content = [
  {
    title: "Gespielte Quizzes:",
    value: "playedQuizzes",
  },
  {
    title: "Gesammelte Punkte:",
    value: "points",
  },
  {
    title: "Fragen beanwortet:",
    value: "answeredQuestions",
  },
  {
    title: "Gespielte Zeit:",
    value: "timePlayed",
  },
];

export default function DailyStats({ stats }: DailyStatsProps) {
  return (
    <ContainerWithHeader header="Daily Stats" sx={{ mt: 3, width: "100%" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={6}>
          {content.map((item, i) => {
            return (
              <Typography key={i} p={1} variant="subtitle1">
                {item.title}
              </Typography>
            );
          })}
        </Grid>
        <Grid item xs={6}>
          {content.map((item, i) => {
            return (
              <Typography key={i} p={1} variant="subtitle1" color={"accent.main"} align="right">
                {stats[item.value]}
              </Typography>
            );
          })}
        </Grid>
      </Grid>
    </ContainerWithHeader>
  );
}
