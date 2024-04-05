import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {

    const containerStyles = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "90%",
    };
  return (
    <Box sx={{ ...containerStyles }}>
      <Outlet />
    </Box>
  );
}
