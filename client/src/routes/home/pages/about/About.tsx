import { useEffect, useState } from "react";
import { HttpService } from "../../../../shared/services/httpService";
import { APPLICATION } from "../../../../shared/constants/application";
import useError from "../../../../shared/hooks/useError";

interface QuizData {
  uniqueCategories: number;
  totalQuestions: number;
  totalQuizzes: number;
  categoryStats: {
    category: string;
    totalQuestions: number;
    totalQuizzes: number;
  }
}

export default function AboutPage(): JSX.Element {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [error, handleError] = useError(false);

  const fetchQuizData = async () => {
    const httpService = new HttpService();
    try {
      const data = await httpService.get(APPLICATION.QUIZ_DATA_ENDPOINT);
      setQuizData(data);
    } catch (error) {
      handleError("Failed to fetch quiz data");
    }
  };

  useEffect(() => {
    fetchQuizData();
    // disable the eslint warning for the next line - it's intentional - we only want to run this effect once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <h1>About</h1>;
}
