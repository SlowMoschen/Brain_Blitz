import { useParams } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import LoadingScreen from "../../../../../shared/components/LoadingScreen";
import { useQueryFactory } from "../../../../../shared/hooks/api/_useQueryFactory";

export default function EditQuiz() {
  const { quizID } = useParams();

  const { data: respone, isPending } = useQueryFactory({
    endpoint: URLS.API_ENDPOINTS.QUIZ.QUIZ + `${quizID}`,
    queryKey: ["editQuiz"],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  const quizData = respone?.data;
  console.log(quizData);


  if (isPending) return <LoadingScreen />;

  if (quizID === "create") return <div>Create</div>;

  return (
    <>
        <h1>Edit</h1>
    </>
  );
}
