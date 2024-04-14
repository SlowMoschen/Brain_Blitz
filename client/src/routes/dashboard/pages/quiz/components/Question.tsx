import { Stack, Typography } from "@mui/material";

interface QuestionProps {
  question: string;
}

export default function Question({ question }: QuestionProps) {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={"background.secondary"}
      width={"100%"}
      minHeight={100}
      borderRadius={'.375rem'}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {question}
      </Typography>
    </Stack>
  );
}
