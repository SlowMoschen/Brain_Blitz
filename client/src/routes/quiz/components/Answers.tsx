import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Answer from "./Answer";

interface AnswerProps {
  answers: string[];
  correctAnswer: string;
  checkAnswer: (answer: string) => void;
}

export default function Answers({ answers, correctAnswer, checkAnswer }: AnswerProps) {
  const [isSelected, toggleIsSelected] = useState<boolean>(false);

  const handleAnswerClick = (answer: string) => {
    toggleIsSelected(true);
    setTimeout(checkAnswer, 1000, answer);
  };

  useEffect(() => {
    toggleIsSelected(false);
  }, [answers]);

  const containerStyle = {
    gap: 2,
    p: 2,
    width: "100%",
    bgcolor: 'background.secondary',
    borderRadius: ".375rem",
  };

  return (
    <Stack sx={containerStyle}>
      {answers.map((answer, index) => (
        <Answer
          key={index}
          answer={answer}
          isCorrect={answer === correctAnswer}
          isDisabled={isSelected}
          onClick={() => handleAnswerClick(answer)}
        />
      ))}
    </Stack>
  );
}
