import { Quiz } from "../../../../shared/types/Quiz";
import { QuizJoinTable } from "../../../../shared/types/User";
import ContainerWithHeader from "../ContainerWithHeader";
import QuizTableCard from "./QuizTableCard";

interface QuizTableProps {
  unlockedJoinTable: QuizJoinTable[];
  completedJoinTable: QuizJoinTable[];
}

export default function QuizTable({
  unlockedJoinTable: unlockedJoinTable,
  completedJoinTable: completeJoinTable,
}: QuizTableProps) {
  const unlockedQuizzes: Quiz[] = unlockedJoinTable.map((table) => table.quiz);
  const completedQuizzes: Quiz[] = completeJoinTable.map((table) => table.quiz);

  return (
    <ContainerWithHeader header="Deine spielbaren Quizze" sx={{ pb: 2 }}>
      {unlockedQuizzes.map((quiz) => {
        return (
          <QuizTableCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            category={quiz.category}
            description={quiz.description}
            isCompleted={completedQuizzes.includes(quiz)}
          />
        );
      })}
    </ContainerWithHeader>
  );
}
