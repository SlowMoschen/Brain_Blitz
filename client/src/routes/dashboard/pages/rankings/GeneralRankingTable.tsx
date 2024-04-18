import { useParams } from "react-router-dom";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import { useRankingQueries } from "../../../../shared/hooks/api/useRankingQueries.hook";
import { useEffect, useState } from "react";
import RankingTable, { ITableProps } from "./components/RankingTable";

export default function GeneralRankingTable() {
  const [tableProps, setTableProps] = useState<ITableProps | null>(null);
  const { ranking } = useParams<{ ranking: string }>();
  const { overallPointsRankings } = useRankingQueries().useOverallPointsRankings();
  const { overallPlaytimeRankings } = useRankingQueries().useOverallPlaytimeRankings();
  const { overallMostPlayedQuizzesRankings } =
    useRankingQueries().useOverallMostPlayedQuizzesRankings();

  const setProps = (ranking: string) => {
    switch (ranking) {
      case "points":
        setTableProps({
          data: overallPointsRankings?.map((ranking) => ({
            user_id: ranking.userID,
            name: ranking.first_name,
            value: ranking.points,
            additionalInfo: "",
          })),
          tableHeader: "Bestenliste Punkte",
          valueString: "Punkte",
          additionalInfoString: "",
        });
        break;
      case "playtime":
        setTableProps({
          data: overallPlaytimeRankings?.map((ranking) => ({
            user_id: ranking.userID,
            name: ranking.first_name,
            value: ranking.playtime,
            additionalInfo: "",
          })),
          tableHeader: "Bestenliste Spielzeit",
          valueString: "spielzeit",
          additionalInfoString: "",
        });
        break;
      case "most-played-quizzes":
        setTableProps({
          data: overallMostPlayedQuizzesRankings?.map((ranking) => ({
            user_id: ranking.quiz_id,
            name: ranking.quiz_name,
            value: ranking.times_played,
            additionalInfo: "",
          })),
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
  }, [ranking]);

  return (
    <>
      <HeaderMenu />
      <RankingTable {...tableProps!} />
    </>
  );
}
