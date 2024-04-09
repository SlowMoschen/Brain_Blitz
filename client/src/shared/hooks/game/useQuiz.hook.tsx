import { useEffect, useState } from "react";
import { GAME } from "../../../configs/Application";
import { Question, Quiz } from "../../types/Quiz";
import { useCountdownTimer } from "../timer/useCountdownTimer.hook";
import { useGameSounds } from "./useGameSounds.hook";
import { useScoreTracker } from "./useScoreTracker.hook";

/**
 * @description Custom hook to manage the quiz game logic
 * - Handles everything related to the quiz game - starting the quiz, checking answers, etc.
 * - Uses the useCountdownTimer hook to manage the quiz timer
 * - Uses the useScoreTracker hook to manage the score
 * - Uses the useGameSounds hook to play sounds
 * @param quizData - The quiz data to be used in the game
 * @returns Object containing the current question, whether the quiz is complete, function to check answers, function to start the quiz, current score, current quiz time, and whether the quiz was successful
 */
export function useQuiz(quizData: Quiz) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { currentScore, increaseScore, decreaseScore, calculateTimeBonus } = useScoreTracker();
  const { currentTime: quizTime, startTimer: startQuizTimer } = useCountdownTimer(
    GAME.TIME_PER_QUIZ
  );
  const { currentTime: initialCountdownTime, startTimer: startInitialCountdown } =
    useCountdownTimer(4000);
  const { playSound } = useGameSounds();

  const nextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= quizData.questions.length) return setIsQuizComplete(true);

    setCurrentIndex(nextIndex);
    setCurrentQuestion(quizData.questions[currentIndex]);
  };

  const checkAnswer = (answer: string) => {
    if (answer === currentQuestion?.correct_answer) {
      increaseScore();
      playSound("correct");
    } else {
      decreaseScore();
      playSound("wrong");
    }
    nextQuestion();
  };

  const startQuiz = () => {
    startInitialCountdown();
  };

  // Prevents the game from breaking if the quiz data is not loaded yet
  // Sets the current question to the first question in the quiz data
  useEffect(() => {
    if (quizData) setCurrentQuestion(quizData.questions[currentIndex]);
  }, [quizData]);


  // Starts the quiz timer when the initial countdown timer reaches 0
  useEffect(() => {
    if (initialCountdownTime === 0) {
      setHasStarted(true);
      startQuizTimer();
      playSound("startBeep");
    }
  }, [initialCountdownTime]);

  // Checks if the quiz time has reached 0
  useEffect(() => {
    if (quizTime === 0) {
      setIsQuizComplete(true);
    }
  }, [quizTime]);

  // Checks if the quiz is complete and if the user has reached the threshold score
  useEffect(() => {
    if (isQuizComplete) {
      calculateTimeBonus(quizTime / 1000);
      if (currentScore >= GAME.QUIZ_COMPLETE_THRESHOLD) setIsSuccess(true);
    }
  }, [isQuizComplete]);

  return {
    currentQuestion,
    isQuizComplete,
    checkAnswer,
    startQuiz,
    currentScore,
    quizTime,
    isSuccess,
    hasStarted,
  };
}
