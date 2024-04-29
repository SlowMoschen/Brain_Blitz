import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAppQuery } from "../hooks/api/useAppQuery.hook";

interface ServerStatusProps {
  size?: "small" | "medium" | "large";
  direction?: "row" | "column";
}

export default function ServerStatus({ size = "medium", direction = "column" }: ServerStatusProps) {
  const { isSuccess } = useAppQuery({
    type: 'HEALTH',
    queryProps: {
      queryKey: ['health'],
    },
  })
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.setProperty("--status-dot", isSuccess ? "green" : "red");
      dotRef.current.style.backgroundColor = isSuccess ? "green" : "red";
    }
  }, [isSuccess]);

  const headerSize = size === "small" ? 15 : size === "medium" ? 20 : 30;
  const dotSize = size === "small" ? "5px" : size === "medium" ? "10px" : "15px";
  const dotTextSize = size === "small" ? 10 : size === "medium" ? 15 : 20;

  return (
    <Stack alignItems={"center"} direction={direction}>
      <Typography fontSize={headerSize}>Server Status:</Typography>
      <Typography
        variant="subtitle1"
        fontSize={dotTextSize}
        color={isSuccess ? "success" : "error"}
      >
        <Box
          className="pluse-status-dot"
          ref={dotRef}
          component="span"
          sx={{
            display: "inline-block",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            mx: 1,
          }}
        ></Box>
        {isSuccess ? "Online" : "Offline"}
      </Typography>
    </Stack>
  );
}
