import { useParams } from "react-router-dom";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import { useRankingQueries } from "../../../../shared/hooks/api/useRankingQueries.hook";
import { useEffect, useState } from "react";
import RankingTable, { ITableProps } from "./components/RankingTable";
import {
  IMostPlayedQuizRanking,
  IPlaytimeRanking,
  IPointsRanking,
} from "../../../../shared/types/Rankings";

export default function GlobalRankingTable() {
  const [tableProps, setTableProps] = useState<ITableProps | null>(null);
  const { ranking } = useParams<{ ranking: string }>();
  const { mostPlayedQuizzes, mostPlaytime, mostPoints, isPending } = useRankingQueries().useGlobalRankings();

  const transformData = (data: (IPlaytimeRanking | IPointsRanking | IMostPlayedQuizRanking)[]) => {
    return data?.map((ranking: IPlaytimeRanking | IPointsRanking | IMostPlayedQuizRanking) => ({
      user_id: "userID" in ranking ? ranking.userID : "",
      name: "first_name" in ranking ? ranking.first_name : ranking.quiz_name,
      value:
        "points" in ranking
          ? ranking.points
          : "playtime" in ranking
          ? ranking.playtime
          : ranking.times_played,
      additionalInfo: "",
    }));
  };

  const setProps = (ranking: string) => {
    switch (ranking) {
      case "points":
        setTableProps({
          data: transformData(mostPoints),
          tableHeader: "Bestenliste Punkte",
          valueString: "Punkte",
          additionalInfoString: "",
        });
        break;
      case "playtime":
        setTableProps({
          data: transformData(mostPlaytime),
          tableHeader: "Bestenliste Spielzeit",
          valueString: "spielzeit",
          additionalInfoString: "",
        });
        break;
      case "most-played-quizzes":
        setTableProps({
          data: transformData(mostPlayedQuizzes),
          tableHeader: "Meistgespielte Quizze",
          valueString: "Anzahl",
          additionalInfoString: "",
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setProps(ranking!);
  }, [isPending]);

  return (
    <>
      <HeaderMenu />
      <RankingTable {...tableProps!} />
    </>
  );
}
