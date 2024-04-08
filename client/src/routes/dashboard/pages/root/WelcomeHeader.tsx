import { Stack, Typography } from "@mui/material";

interface WelcomeHeaderProps {
  name: string;
}

export default function WelcomeHeader({ name }: WelcomeHeaderProps) {
  return (
    <Stack alignItems={'center'} my={{ xs: 5, lg: 0 }}>
      <Typography variant="h5">Willkommen zurück</Typography>
      <Typography component="span" variant="h2" className="animated-bg" fontWeight={500}>
        {name}
      </Typography>
    </Stack>
  );
}
