import { useParams } from "react-router-dom";
import { useRankingQueries } from "../../../../shared/hooks/api/useRankingQueries.hook";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import QuizRankingTable from "./components/QuizRankingTable";

export default function QuizRanking() {
  const { quizID } = useParams<{ quizID: string }>();
  const { singleQuizRankings } = useRankingQueries().useSingleQuizRankings(quizID!);

  return (
    <>
      <HeaderMenu />
      <QuizRankingTable data={singleQuizRankings} />
    </>
  );
}
