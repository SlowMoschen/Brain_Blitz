import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import { IQuiz } from "../../../../../shared/types/Quiz";
import { AdminOutletContext } from "../AdminDasbordLayout";
import DataTable from "./DataTable";

interface QuizzesTableProps {
  category?: string | null;
}

export default function QuizzesTable({ category }: QuizzesTableProps) {
  const redirect = useNavigate();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const { allQuizzes } = useOutletContext<AdminOutletContext>();

  useEffect(() => {
    if (allQuizzes) {
      if (category) {
        const filteredQuizzes = allQuizzes.filter((quiz) => quiz.category === category);
        setQuizzes(filteredQuizzes);
      } else {
        setQuizzes(allQuizzes);
      }
    }
  }, [allQuizzes, category]);

  const columns = [
    { key: "category", title: "Kategorie" },
    { key: "id", title: "ID" },
    { key: "title", title: "Titel" },
    { key: "created_at", title: "Erstellt am" },
  ];

  return (
    <DataTable<IQuiz>
      columns={columns}
      rows={quizzes}
      onRowClick={(e, id) => {
        if (e.target instanceof HTMLInputElement) return;
        redirect(URLS.ADMIN_ROUTES.QUIZ + `/${id}`);
      }}
    />
  )
}
