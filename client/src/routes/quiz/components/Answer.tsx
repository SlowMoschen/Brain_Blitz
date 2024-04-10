import { Stack, Typography } from "@mui/material";
import { useState } from "react";

interface AnswerProps {
  answer: string;
  isCorrect: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

type AnswerState = "default" | "selected" | "correct" | "incorrect";

export default function Answer({ answer, isCorrect, onClick, isDisabled }: AnswerProps) {
  const [state, setState] = useState<AnswerState>("default");

  const revealAnswer = () => {
    if (!isCorrect) return setState("incorrect");
    setState("correct");
  };

  const handleClick = () => {
    if (state === "default") setState("selected");
    onClick();
    setTimeout(revealAnswer, 1000);
    setTimeout(setState, 2000, "default");
  };

  const getBGColor = () => {
    switch (state) {
      case "correct":
        return "success.main";
      case "incorrect":
        return "error.main";
      default:
        return "secondary.main";
    }
  };

  const containerStyle = {
    cursor: "pointer",
    border: "5px solid",
    borderColor: state === "selected" ? "yellow" : "transparent",
    bgcolor: getBGColor(),
    borderRadius: ".375rem",
    p: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    pointerEvents: isDisabled ? "none" : "auto",
    '&:hover': {
        bgcolor: 'secondary.dark',
        },
  };

  return (
    <Stack sx={containerStyle} onClick={handleClick}>
      <Typography variant="h5" color={"text.dark"}>
        {answer}
      </Typography>
    </Stack>
  );
}
