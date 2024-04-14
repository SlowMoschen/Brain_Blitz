import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

interface ScoreProps {
  score: number;
}

type Color = 'correct' | 'wrong' | 'default';

/**
 * @description Displays the current score of the user
 * - If the score increases, the text color will be green
 * - If the score decreases, the text color will be 
 * @param {number} score - The current score of the user
 */
export default function Score({ score: newScore }: ScoreProps) {
    const [score, setScore] = useState<number>(0);
  const [textColor, setTextColor] = useState<Color>("default");

    useEffect(() => {
        setScore((prev: number) => {
            if (newScore > prev) setTextColor("correct");
            if (newScore < prev) setTextColor("wrong");

            setTimeout(() => {
                setTextColor("default");
            }, 1000);
            return newScore;
        });
    }, [newScore]);

    const styles = {
        color: textColor === "default" ? "text.main" : textColor === "correct" ? "green" : "red",
    };

  return (
    <Typography variant="h3" sx={styles}>
      <CountUp end={score} duration={1} />
    </Typography>
  );
}
