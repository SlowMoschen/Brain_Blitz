import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRankingQueries } from "../../../../shared/hooks/api/useRankingQueries.hook";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import RankingTable, { ITableProps } from "./components/RankingTable";

export default function GlobalRankingTable() {
  const [tableProps, setTableProps] = useState<ITableProps>();
  const { rankingParam } = useParams<{ rankingParam: string }>();
  const { mostPlayedQuizzes, mostPlaytime, mostPoints, isPending } = useRankingQueries().useGlobalRankings();

  const setProps = (rankingParam: string) => {
    switch (rankingParam) {
      case "points":
        setTableProps({
          data: mostPoints,
          tableHeader: "Bestenliste Punkte",
          valueString: "Punkte",
          type: "player",
        });
        break;
      case "playtime":
        setTableProps({
          data: mostPlaytime,
          tableHeader: "Bestenliste Spielzeit",
          valueString: "spielzeit",
          type: "player",
        });
        break;
      case "most-played-quizzes":
        setTableProps({
          data: mostPlayedQuizzes,
          tableHeader: "Meistgespielte Quizze",
          valueString: "Anzahl",
          type: "quiz",
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setProps(rankingParam!);
  }, [isPending]);

  return (
    <>
      <HeaderMenu />
      <RankingTable {...tableProps!} />
    </>
  );
}
