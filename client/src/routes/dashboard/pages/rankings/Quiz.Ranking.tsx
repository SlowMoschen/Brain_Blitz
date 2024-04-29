import { useParams } from "react-router-dom";
import { useDocumentTitle } from "../../../../shared/hooks/useDocumentTitle.hook";
import { useRankingQuery } from "../../../../shared/hooks/api/useRankingQuery.hook";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import RankingTable from "./components/RankingTable";
import { IQuizRanking } from "../../../../shared/types/Rankings";

export default function QuizRanking() {
  const { quizID } = useParams<{ quizID: string }>();
  const { rankings } = useRankingQuery<IQuizRanking>({ type: "SINGLE_QUIZ", id: quizID });
  const tableHeader = rankings?.[0]?.quiz_name;
  useDocumentTitle(tableHeader || "Quiz Bestenliste");

  const tableData = rankings?.map((ranking) => ({
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
