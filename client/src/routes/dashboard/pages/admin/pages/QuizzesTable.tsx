import { useNavigate, useOutletContext } from "react-router-dom";
import { AdminOutletContext } from "../AdminDasbordLayout";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
} from "@mui/material";
import QuizCategoryIcon from "../../../components/quiz/QuizCategoryIcon";
import { useEffect, useState } from "react";
import { IQuiz } from "../../../../../shared/types/Quiz";
import { URLS } from "../../../../../configs/Links";

interface QuizzesTableProps {
  category?: string | null;
}

export default function QuizzesTable({ category }: QuizzesTableProps) {
  const redirect = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
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
    { field: "id", headerName: "ID" },
    { field: "category", headerName: "Category" },
    { field: "title", headerName: "Title" },
    { field: "createdAt", headerName: "Created at" },
    { field: "updatedAt", headerName: "Updated at" },
  ];

  const handleRowClick = (id: string) => {
    console.log(id);
    redirect(URLS.ADMIN_ROUTES.QUIZ + `/${id}`)
  };

  const handleSelectAllClick = () => {
    if (selected.length === quizzes.length) {
      setSelected([]);
    } else {
      setSelected(quizzes.map((quiz) => quiz.id));
    }
  };

  const handleSelectClick = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ flexGrow: 1, maxWidth: "100vw" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < quizzes.length}
                checked={selected.length === quizzes.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.field} align="center">
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow
              key={quiz.id}
              onClick={() => handleRowClick(quiz.id)}
              sx={{
                bgcolor: selected.includes(quiz.id) ? "accent.light" : "inherit",
                "&:hover": { bgcolor: "background.default", cursor: "pointer" },
              }}
            >
              <TableCell>
                <Checkbox
                  checked={selected.includes(quiz.id)}
                  onChange={() => handleSelectClick(quiz.id)}
                />
              </TableCell>
              <TableCell align="center">{quiz.id}</TableCell>
              <TableCell align="center">
                <QuizCategoryIcon
                  category={quiz.category}
                  sx={{ borderRadius: 0, fontSize: 40, pt: 1 }}
                />
              </TableCell>
              <TableCell align="center">{quiz.title}</TableCell>
              <TableCell align="center">{new Date(quiz.created_at).toDateString()}</TableCell>
              <TableCell align="center">{new Date(quiz.updated_at).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
