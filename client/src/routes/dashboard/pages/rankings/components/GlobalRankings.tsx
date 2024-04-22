import { Stack } from "@mui/material";
import RankingBarTable from "./RankingBarTable";
import {
  IMostPlayedQuizRanking,
  IPlaytimeRanking,
  IPointsRanking,
} from "../../../../../shared/types/Rankings";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";

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
  const redirect = useNavigate();

  return (
    <Stack alignItems={"center"} width={"100%"} pb={5} my={2} gap={2}>
      <RankingBarTable<IPointsRanking>
        title="Gesamtpunktezahl"
        data={overallPointsRankings}
        onClick={() => redirect(URLS.MOST_POINTS_RANKING)}
      />
      <RankingBarTable<IPlaytimeRanking>
        title="Gesamtspielzeit"
        data={overallPlaytimeRankings}
        onClick={() => redirect(URLS.MOST_PLAYTIME_RANKING)}
      />
      <RankingBarTable<IMostPlayedQuizRanking>
        title="Meist gespielten Quizze"
        data={overallMostPlayedQuizzesRankings}
        onClick={() => redirect(URLS.MOST_PLAYED_QUIZZES_RANKING)}
      />
    </Stack>
  );
}
