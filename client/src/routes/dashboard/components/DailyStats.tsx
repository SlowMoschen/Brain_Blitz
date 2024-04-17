import { Grid, Stack, Typography } from "@mui/material";
import ContainerWithHeader from "./ContainerWithHeader";
import { IDailyStats, useDailyStatsTracker } from "../../../shared/hooks/localStorage/useDailyStatsTracker.hook";
import { useTimeParser } from "../../../shared/hooks/timer/useTimeParser.hook";

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

export default function DailyStats() {
  const { dailyStats } = useDailyStatsTracker();
  const { parseMinuteString } = useTimeParser();
  const stats: IDailyStats = dailyStats;

  return (
    <ContainerWithHeader header="Tägliche Statistik" caption="erspielt auf diesem Gerät" sx={{ mt: 3, width: "90%" }}>
      <Stack>
        <Grid container spacing={2} p={2}>
          {content.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>{item.title}</Typography>
                <Typography color='accent.main'>
                  {item.value === "timePlayed"
                    ? parseMinuteString(stats[item.value])
                    : stats[item.value]}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWithHeader>
  );
}
