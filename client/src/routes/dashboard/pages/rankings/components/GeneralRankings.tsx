import { Stack } from "@mui/material";
import RankingBarTable from "./RankingBarTable";
import {
  IMostPlayedQuizRanking,
  IPlaytimeRanking,
  IPointsRanking,
} from "../../../../../shared/types/Rankings";

interface GeneralRankingsProps {
  overallPointsRankings: IPointsRanking[];
  overallPlaytimeRankings: IPlaytimeRanking[];
  overallMostPlayedQuizzesRankings: IMostPlayedQuizRanking[];
}

export default function GeneralRankings({
  overallPointsRankings,
  overallPlaytimeRankings,
  overallMostPlayedQuizzesRankings,
}: GeneralRankingsProps) {
  return (
    <Stack alignItems={"center"} width={"100%"} pb={5} my={2} gap={2}>
      <RankingBarTable<IPointsRanking> title="Gesamtpunktezahl" data={overallPointsRankings} />
      <RankingBarTable<IPlaytimeRanking> title="Gesamtspielzeit" data={overallPlaytimeRankings} />
      <RankingBarTable<IMostPlayedQuizRanking>
        title="Meist gespielten Quizze"
        data={overallMostPlayedQuizzesRankings}
      />
    </Stack>
  );
}
