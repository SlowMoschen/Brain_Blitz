import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import { useAdminQuery } from "../../../../../shared/hooks/api/useAdminAPI.hook";
import { IQuiz } from "../../../../../shared/types/Quiz";
import DataTable from "./DataTable";
import { IconButton, Menu, MenuItem, Stack } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function QuizzesTable() {
  const redirect = useNavigate();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const { allQuizzes } = useAdminQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const anchorEl = useRef<HTMLButtonElement>(null);

  const handleFilterChange = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const filter = e.currentTarget.dataset.filter;
    if (filter) setFilter(filter);
    setIsMenuOpen(false);
  };

  const filterQuizzes = (filter: string | null) => {
    if (!filter) return allQuizzes;

    switch (filter) {
      case "category":
        return allQuizzes.sort((a: IQuiz, b: IQuiz) => a.category.localeCompare(b.category));
      case "id":
        return allQuizzes.sort((a: IQuiz, b: IQuiz) => a.id.localeCompare(b.id));
      case "title":
        return allQuizzes.sort((a: IQuiz, b: IQuiz) => a.title.localeCompare(b.title));
      case "created_at":
        return allQuizzes.sort((a: IQuiz, b: IQuiz) => a.created_at.localeCompare(b.created_at));
      default:
        return allQuizzes;
    }
  };

  useEffect(() => {
    if (allQuizzes) {
      setQuizzes(allQuizzes);
    }

    if (filter) {
      setQuizzes(filterQuizzes(filter));
    }
  }, [allQuizzes, filter]);

  const columns = [
    { key: "category", title: "Kategorie" },
    { key: "id", title: "ID" },
    { key: "title", title: "Titel" },
    { key: "created_at", title: "Erstellt am" },
  ];

  const filterOptions = [
    { title: "Alle", filter: null },
    { title: "Kategorie", filter: "category" },
    { title: "ID", filter: "id" },
    { title: "Titel", filter: "title" },
    { title: "Erstellt am", filter: "created_at" },
  ];

  return (
    <>
      <Stack gap={2} my={2} direction={'row'} justifyContent={'space-between'}>
        <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)} ref={anchorEl}>
          <SortIcon sx={{ color: "text.main" }} />
        </IconButton>
        <CallToAction onClick={() => redirect(URLS.ADMIN_ROUTES.CREATE_QUIZ)}>
          <AddCircleIcon sx={{ mr: 1 }} />
          Quiz erstellen
        </CallToAction>
        <Menu
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(!isMenuOpen)}
          anchorEl={anchorEl.current}
        >
          {filterOptions.map((option, index) => (
            <MenuItem key={index} onClick={handleFilterChange} data-filter={option.filter}>
              {option.title}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
      <DataTable<IQuiz>
        columns={columns}
        rows={quizzes}
        onRowClick={(e, id) => {
          if (e.target instanceof HTMLInputElement) return;
          redirect(URLS.ADMIN_ROUTES.QUIZZES + `/edit` + `/${id}`);
        }}
      />
    </>
  );
}
