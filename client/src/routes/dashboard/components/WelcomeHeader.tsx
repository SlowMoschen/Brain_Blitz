import { Stack, Typography } from "@mui/material";

interface WelcomeHeaderProps {
  name: string;
}

export default function WelcomeHeader({ name }: WelcomeHeaderProps) {
  return (
    <Stack alignItems={"center"} my={{ xs: 5, lg: 10 }}>
      <Typography variant="h5" fontSize={{ md: 30, xl: 40 }}>
        Willkommen zurück
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
