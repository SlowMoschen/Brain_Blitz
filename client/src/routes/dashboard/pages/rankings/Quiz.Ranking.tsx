import { useParams } from "react-router-dom";
import { useDocumentTitle } from "../../../../shared/hooks/useDocumentTitle.hook";
import { useRankingQueries } from "../../../../shared/hooks/api/useRankingQueries.hook";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import RankingTable from "./components/RankingTable";

export default function QuizRanking() {
  const { quizID } = useParams<{ quizID: string }>();
  const { singleQuizRankings } = useRankingQueries().useSingleQuizRankings(quizID!);
  const tableHeader = singleQuizRankings?.[0]?.quiz_name;
  useDocumentTitle(tableHeader || "Quiz Bestenliste");

  const tableData = singleQuizRankings?.map((ranking) => ({
    id: ranking.user_id,
    name: ranking.first_name,
    value: ranking.points,
    additionalInfo: ranking.created_at,
  }));

  return (
    <>
      <HeaderMenu />
      <RankingTable
        data={tableData}
        tableHeader={tableHeader}
        valueString="Punkte"
        additionalInfoString="Erspielt"
        type="player"
      />
    </>
  );
}
