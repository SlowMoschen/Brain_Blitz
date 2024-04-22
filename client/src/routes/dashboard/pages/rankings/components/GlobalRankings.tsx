import { Stack } from "@mui/material";
import RankingBarCard from "./RankingBarCard";
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

export default function GlobalRankings({
  overallPointsRankings,
  overallPlaytimeRankings,
  overallMostPlayedQuizzesRankings,
}: GeneralRankingsProps) {
  const redirect = useNavigate();

  return (
    <Stack alignItems={"center"} width={"100%"} pb={5} my={2} gap={2}>
      <RankingBarCard<IPointsRanking>
        title="Gesamtpunktezahl"
        data={overallPointsRankings}
        onClick={() => redirect(URLS.MOST_POINTS_RANKING)}
      />
      <RankingBarCard<IPlaytimeRanking>
        title="Gesamtspielzeit"
        data={overallPlaytimeRankings}
        onClick={() => redirect(URLS.MOST_PLAYTIME_RANKING)}
      />
      <RankingBarCard<IMostPlayedQuizRanking>
        title="Meist gespielten Quizze"
        data={overallMostPlayedQuizzesRankings}
        onClick={() => redirect(URLS.MOST_PLAYED_QUIZZES_RANKING)}
      />
    </Stack>
  );
}
