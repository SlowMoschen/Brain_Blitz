import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  const containerStyles = {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "90%",
  };
  return (
    <Stack sx={containerStyles}>
      <Outlet />
    </Stack>
  );
}
