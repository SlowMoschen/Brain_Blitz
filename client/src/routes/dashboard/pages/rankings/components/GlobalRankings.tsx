import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import { useGlobalRankings } from "../../../../../shared/hooks/useGlobalRankings.hook";
import OlympicPodestCard, { OlympicPodestCardProps } from "./OlympicPodestCard";

export default function GlobalRankings() {
  const { mostPoints, mostPlaytime, mostPlayedQuizzes } = useGlobalRankings();
  const redirect = useNavigate();

  const podestCards: OlympicPodestCardProps[] = [
    {
      title: "Gesamtpunktezahl",
      data: mostPoints,
      onClick: () => redirect(URLS.MOST_POINTS_RANKING),
      valueType: "number",
    },
    {
      title: "Gesamtspielzeit",
      data: mostPlaytime,
      onClick: () => redirect(URLS.MOST_PLAYTIME_RANKING),
      valueType: "milliseconds",
    },
    {
      title: "Meist gespielten Quizze",
      data: mostPlayedQuizzes,
      onClick: () => redirect(URLS.MOST_PLAYED_QUIZZES_RANKING),
      valueType: "number",
    },
  ];

  return (
    <Stack alignItems={"center"} width={"100%"} pb={5} my={2} gap={2}>
      {podestCards.map((podestCard, index) => (
        <OlympicPodestCard
          key={index}
          title={podestCard.title}
          data={podestCard.data}
          onClick={podestCard.onClick}
          valueType={podestCard.valueType}
        />
      ))}
    </Stack>
  );
}
