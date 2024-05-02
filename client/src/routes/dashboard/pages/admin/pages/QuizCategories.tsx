import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import QuizCategoryIcon from "../../../components/quiz/QuizCategoryIcon";
import { AdminOutletContext } from "../AdminDasbordLayout";
import QuizzesTable from "./QuizzesTable";

function CategoryCard({ category }: { category: string }) {
    const [, setSearchParams] = useSearchParams();

  const handleClick = (category: string) => {
    setSearchParams({ category: category });
  };
  return (
    <Stack sx={{ width: 200, height: 200, bgcolor: "secondary.dark", borderRadius: 2, p: 2 }} justifyContent={'space-between'}>
      <QuizCategoryIcon category={category} sx={{ fontSize: 50, borderRadius: 0 }} />
      <CallToAction
            text="Zur Kategorie"
            onClick={() => handleClick(category)}
            color="primary"
          />
    </Stack>
  );
}

export default function QuizCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const { allQuizzes } = useOutletContext<AdminOutletContext>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (allQuizzes) {
      const categories = allQuizzes.map((quiz) => quiz.category);
      setCategories([...new Set(categories)]);
    }
  }, [allQuizzes]);

  if (searchParams.has("category")) {
    return <QuizzesTable category={searchParams.get("category")} />;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {categories.map((category) => (
        <>
          <CategoryCard key={category} category={category} />
        </>
      ))}
    </Box>
  );
}
