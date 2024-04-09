import { Stack } from "@mui/material";

interface InfoContainerProps {
  children: React.ReactNode;
}

export default function InfoContainer({ children }: InfoContainerProps) {
  const container = {
    bgcolor: "primary.light",
    borderRadius: ".375rem",
    height: "50px",
    width: "100%",
    my: 1,
    p: 2,
  };

  return (
    <Stack direction={"row"} justifyContent={"space-evenly"} alignItems={"center"} sx={container}>
      {children}
    </Stack>
  );
}
