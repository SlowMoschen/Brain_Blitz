import { useParams } from "react-router-dom";
import InitialCountdown from "./InitialCountdown";
import { useCountdownTimer } from "../../shared/hooks/timer/useCountdownTimer.hook";
import { useEffect } from "react";
import { useGameSounds } from "../../shared/hooks/useGameSounds";
import { useQuizFetch } from "../../shared/hooks/api/useQuizFetch.hook";

export default function Quiz() {
  const { quizID } = useParams();
  const { quizData, isPending, isError } = useQuizFetch(quizID!);
  const { currentTime, startTimer } = useCountdownTimer(4000);
  const { playSound } = useGameSounds();

    console.log(quizData, isPending, isError);

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (currentTime === 0) {
      playSound("startBeep");
    }
  }, [currentTime]);
  

  return (
    <>
        <InitialCountdown/>
        {
            currentTime === 0 ? <h1>START</h1> : null
        }
    </>
  );
}
