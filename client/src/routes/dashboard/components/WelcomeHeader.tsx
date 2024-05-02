import { Stack, Typography } from "@mui/material";

interface WelcomeHeaderProps {
  name: string;
  text: string;
}

export default function WelcomeHeader({ name, text }: WelcomeHeaderProps) {
  return (
    <Stack alignItems={"center"} my={{ xs: 5, lg: 10 }}>
      <Typography variant="h5" fontSize={{ md: 30, xl: 40 }}>
        {text}
      </Typography>
      <Typography
        component="span"
        variant="h2"
        className="animated-bg"
        fontWeight={500}
        fontSize={{ md: 80, xl: 90 }}
        textTransform={"capitalize"}
      >
        {name}
      </Typography>
    </Stack>
  );
}
