import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ReactNode } from "react";
import LoadingSpinner from "../../../../../../shared/components/LodingSpinner";
import { APPLICATION, COLORS } from "../../../../../../shared/constants/application";
import { BREAKPOINTS } from "../../../../../../shared/constants/breakpoints";
import useScreenSize from "../../../../../../shared/hooks/useScreenSize";
import { HttpService } from "../../../../../../shared/services/httpService";
import DataCountCard from "./DataCard";

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
  const screenSize = useScreenSize();

  const fetchQuizData = async () => {
    const httpService = new HttpService();
    return httpService.get(APPLICATION.QUIZ_DATA_ENDPOINT);
  };

  const { isPending, isError, data } = useQuery({
    queryKey: ["quizData"],
    queryFn: fetchQuizData,
  });
  const quizData: IQuizData = data?.data;

  const Container = ({ children }: ContainerProps): JSX.Element => {
    return (
      <section
        className={clsx(
          "bg-bg-secondary text-bg-secondary rounded-lg my-10 mx-5 p-5 w-11/12 max-w-[1500px] min-h-24 relative",
          isError || (isPending && "flex justify-center items-center text-xl font-bold"),
          screenSize.width <= BREAKPOINTS.sm && "flex flex-col gap-3",
          screenSize.width >= BREAKPOINTS.md && !isError && "grid grid-cols-7 grid-rows-2 gap-3"
        )}
      >
        {children}
      </section>
    );
  };

  if (isPending)
    return (
      <Container>
        <LoadingSpinner className="absolute right-2/4" color={COLORS.ACCENT} size={30} />
      </Container>
    );

  return (
    <Container>
      {quizData ? (
        <>
          {/* Total Quizzes */}
          <DataCountCard
            containerProps={{ className: "bg-primary md:col-span-5", flexCol: true }}
            counterProps={{ countEnd: quizData.totalQuizzes }}
            textProps={{ content: "spielbare Quizzes" }}
          />

          {/* Total Questions */}
          <DataCountCard
            containerProps={{
              className: "bg-secondary flex-col text-center md:col-span-2",
              flexCol: false,
            }}
            counterProps={{ countEnd: quizData.totalQuestions }}
            textProps={{ content: "Fragen zu beantworten" }}
          />

          {/* Total Categories */}
          <DataCountCard
            containerProps={{
              className: "bg-accent-light text-center md:col-span-4",
              flexCol: true,
            }}
            counterProps={{ countEnd: quizData.uniqueCategories }}
            textProps={{ content: "einzigartige Kategorien" }}
          />

          {/* Free */}
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
        <div className="flex justify-center items-center text-center text-2xl text-primary">
          Fehler beim laden der Quiz-daten
        </div>
      )}
    </Container>
  );
}
