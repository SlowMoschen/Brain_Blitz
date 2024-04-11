import { useParams } from "react-router-dom";
import { useQuizRankingsFetch } from "../../../../shared/hooks/api/useQuizRankingsFetch.hook";
import HeaderMenu from "../../components/navigation/HeaderMenu";
import QuizRankingTable from "./components/QuizRankingTable";

export default function QuizRanking() {
  const { quizID } = useParams<{ quizID: string }>();
    const { quizRankings } = useQuizRankingsFetch(quizID!);
    
  return (
    <>
      <HeaderMenu />
      <QuizRankingTable data={quizRankings} />
    </>
  );
}
