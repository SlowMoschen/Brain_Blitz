import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import CountUp from "react-countup";
import LoadingSpinner from "../../../../../../shared/components/LodingSpinner";
import {
  APPLICATION,
  COLORS,
} from "../../../../../../shared/constants/application";
import { BREAKPOINTS } from "../../../../../../shared/constants/breakpoints";
import { TIMES } from "../../../../../../shared/constants/times";
import useScreenSize from "../../../../../../shared/hooks/useScreenSize";
import { HttpService } from "../../../../../../shared/services/httpService";

interface IQuizData {
  uniqueCategories: number;
  totalQuestions: number;
  totalQuizzes: number;
  categoryStats: {
    category: string;
    totalQuestions: number;
    totalQuizzes: number;
  };
}

interface ContainerProps {
  children?: ReactNode;
}

export default function QuizDataCard(): JSX.Element {
  const [quizData, setQuizData] = useState<IQuizData>();
  const screenSize = useScreenSize();

  const fetchQuizData = async () => {
    const httpService = new HttpService();
    return httpService.get(APPLICATION.QUIZ_DATA_ENDPOINT);
  };

  const Container = ({ children }: ContainerProps): JSX.Element => {
    return (
      <section
        className={clsx(
          "bg-bg-secondary text-bg-secondary rounded-lg my-10 mx-5 p-5 w-5/6 min-h-24 relative",
          isError ||
            (isPending && "flex justify-center items-center text-xl font-bold"),
          screenSize.width <= BREAKPOINTS.sm && "flex flex-col gap-3",
          screenSize.width >= BREAKPOINTS.md &&
            !isError &&
            "grid grid-cols-7 grid-rows-2 gap-3"
        )}
      >
        {children}
      </section>
    );
  };

  const { isPending, isError, data } = useQuery({
    queryKey: ["quizData"],
    queryFn: fetchQuizData,
  });
  if (data) setQuizData(data);

  if (isPending)
    return (
      <Container>
        <LoadingSpinner
          className="absolute right-2/4"
          color={COLORS.ACCENT}
          size={30}
        />
      </Container>
    );

  return (
    <Container>
      {quizData ? (
        <>
          {/* Total Quizzes */}
          <div
            className={clsx(
              "bg-primary p-5 rounded-md h-52 flex justify-center items-center md:col-span-5",
              screenSize.width <= BREAKPOINTS.sm && "flex-col"
            )}
          >
            <CountUp
              end={quizData.totalQuizzes}
              duration={TIMES.COUNT_UP_DURATION}
              delay={TIMES.COUNT_UP_DELAY}
              className="text-5xl font-bold md:text-6xl lg:text-7xl mx-3"
            />
            <p className="text-xl mx-3 md:text-2xl lg:text-4xl">
              spielbare Quizzes
            </p>
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
            <p className="text-xl mx-3 md:text-2xl lg:text-3xl">
              Fragen zu beantworten
            </p>
          </div>

          {/* Total Categories */}
          <div
            className={clsx(
              "bg-accent-light p-5 rounded-md h-52 flex justify-center items-center text-center md:col-span-4",
              screenSize.width <= BREAKPOINTS.sm && "flex-col"
            )}
          >
            <CountUp
              end={quizData.uniqueCategories}
              duration={TIMES.COUNT_UP_DURATION}
              delay={TIMES.COUNT_UP_DELAY}
              className="text-5xl font-bold md:text-6xl lg:text-7xl mx-3"
            />
            <p className="text-xl mx-3 md:text-2xl lg:text-3xl">
              einzigartige Kategorien
            </p>
          </div>

          <div
            className={clsx(
              "bg-primary-light text-accent p-5 rounded-md h-52 flex flex-col justify-center items-center text-center md:col-span-3"
            )}
          >
            <p className="underline text-4xl font-bold lg:text-5xl">
              100% Gratis
            </p>
            <p className="text-xl lg:text-2xl">für immer...</p>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center text-center text-2xl text-primary">
          Fehler beim laden der Quiz-daten
        </div>
      )}
    </Container>
  );
}
