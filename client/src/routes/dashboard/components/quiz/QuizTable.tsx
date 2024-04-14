import { IQuiz } from "../../../../shared/types/Quiz";
import { IQuizJoinTable } from "../../../../shared/types/User";
import ContainerWithHeader from "../ContainerWithHeader";
import QuizTableCard from "./QuizTableCard";

interface QuizTableProps {
  unlockedJoinTable: IQuizJoinTable[];
  completedJoinTable: IQuizJoinTable[];
}

export default function QuizTable({
  unlockedJoinTable: unlockedJoinTable,
  completedJoinTable: completeJoinTable,
}: QuizTableProps) {
  const unlockedQuizzes: IQuiz[] = unlockedJoinTable.map((table) => table.quiz);
  const completedQuizzes: IQuiz[] = completeJoinTable.map((table) => table.quiz);

  return (
    <ContainerWithHeader header="Deine spielbaren Quizze" caption={`${completedQuizzes.length}/${unlockedQuizzes.length}`} sx={{ pb: 2 }}>
      {unlockedQuizzes.reverse().map((quiz) => {
        return (
          <QuizTableCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            category={quiz.category}
            description={quiz.description}
            isCompleted={completedQuizzes.some((completedQuiz) => completedQuiz.id === quiz.id)}
          />
        );
      })}
    </ContainerWithHeader>
  );
}
