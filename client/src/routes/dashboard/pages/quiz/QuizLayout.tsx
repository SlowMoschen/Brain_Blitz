import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function QuizLayout() {

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
