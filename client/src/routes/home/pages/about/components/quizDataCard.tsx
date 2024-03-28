import clsx from "clsx";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { APPLICATION } from "../../../../../shared/constants/application";
import useError from "../../../../../shared/hooks/useError";
import useScreenSize from "../../../../../shared/hooks/useScreenSize";
import { HttpService } from "../../../../../shared/services/httpService";
import { BREAKPOINTS } from "../../../../../shared/constants/breakpoints";
import { TIMES } from "../../../../../shared/constants/times";

interface IQuizData {
  uniqueCategories: number;
  totalQuestions: number;
  totalQuizzes: number;
  categoryStats: {
    category: string;
    totalQuestions: number;
    totalQuizzes: number;
  }[];
}

export default function QuizDataCard(): JSX.Element {
  const [quizData, setQuizData] = useState<IQuizData>();
  const [error, handleError] = useError(false);
  const screenSize = useScreenSize();

  const fetchQuizData = async () => {
    const httpService = new HttpService();
    try {
      const data = await httpService.get(APPLICATION.QUIZ_DATA_ENDPOINT);
      setQuizData(data?.data);
    } catch (error) {
      handleError("Beim Laden der Quiz-Daten ist ein Fehler aufgetreten.");
    }
  };

  useEffect(() => {
    fetchQuizData();
    // disable the eslint warning for the next line - it's intentional - we only want to run this effect once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className={clsx(
        "bg-bg-secondary text-bg-secondary rounded-lg my-10 mx-5 p-5 w-5/6",
        screenSize.width <= BREAKPOINTS.sm && "grid grid-cols-1 grid-rows-4 gap-3",
        screen.width >= BREAKPOINTS.md && "grid grid-cols-7 grid-rows-2 gap-3",
        error && "bg-primary"
      )}
    >
      {quizData ? (
        <>
          {/* Total Quizzes */}
          <div
            className={clsx(
              "bg-primary p-5 rounded-md h-52 flex justify-center items-center md:col-span-5",
              screenSize.width <= BREAKPOINTS.sm && "flex-col",
            )}
          >
            <CountUp
              end={quizData.totalQuizzes}
              duration={TIMES.COUNT_UP_DURATION}
              delay={TIMES.COUNT_UP_DELAY}
              className="text-5xl font-bold md:text-6xl lg:text-7xl mx-3"
            />
            <p className="text-xl mx-3 md:text-2xl lg:text-4xl">spielbare Quizzes</p>
          </div>

          {/* Total Questions */}
          <div
            className={clsx(
              "bg-secondary p-5 rounded-md h-52 flex flex-col justify-center items-center text-center md:col-span-2",
              screenSize.width <= BREAKPOINTS.sm && "flex-col"
            )}
          >
            <CountUp
              end={quizData.totalQuestions}
              duration={TIMES.COUNT_UP_DURATION}
              delay={TIMES.COUNT_UP_DELAY}
              className="text-5xl font-bold md:text-6xl lg:text-7xl mx-3"
            />
            <p className="text-xl mx-3 md:text-2xl lg:text-3xl">Fragen zu beantworten</p>
          </div>

          {/* Total Categories */}
          <div
            className={clsx(
              "bg-accent-light p-5 rounded-md h-52 flex justify-center items-center text-center md:col-span-4",
              screenSize.width <= BREAKPOINTS.sm && "flex-col",
            )}
          >
            <CountUp
              end={quizData.uniqueCategories}
              duration={TIMES.COUNT_UP_DURATION}
              delay={TIMES.COUNT_UP_DELAY}
              className="text-5xl font-bold md:text-6xl lg:text-7xl mx-3"
            />
            <p className="text-xl mx-3 md:text-2xl lg:text-3xl">einzigartige Kategorien</p>
          </div>

          <div
            className={clsx(
              "bg-primary-light text-accent p-5 rounded-md h-52 flex flex-col justify-center items-center text-center md:col-span-3"
            )}
          >
            <p className="underline text-4xl font-bold lg:text-5xl">100% Gratis</p>
            <p className="text-xl lg:text-2xl">für immer...</p>
          </div>
        </>
      ) : (
        <div>{error}</div>
      )}
    </section>
  );
}
