import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";

interface AnswerProps {
  answer: string;
  isCorrect: boolean;
  onClick: () => void;
  isDisabled: boolean;
  isRevealed: boolean;
}

type AnswerState = "default" | "selected";

export default function Answer({
  answer,
  isCorrect,
  onClick,
  isDisabled,
  isRevealed,
}: AnswerProps) {
  const [state, setState] = useState<AnswerState>("default");

  const handleClick = () => {
    if (state === "default") setState("selected");
    onClick();
    setTimeout(setState, 2000, "default");
  };

  const getBGColor = () => {
    if (isRevealed) return isCorrect ? "success.main" : "error.main";
    return "secondary.main";
  };

  const hoverStyle = useMediaQuery("(hover: hover)") ? { bgcolor: "secondary.dark" } : "";

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
    "&:active": {
      bgcolor: "secondary.dark",
    },
    "&:hover": hoverStyle,
  };

  return (
    <Stack sx={containerStyle} onClick={handleClick}>
      <Typography variant="h5" color={"text.dark"} align="center">
        {answer}
      </Typography>
    </Stack>
  );
}
