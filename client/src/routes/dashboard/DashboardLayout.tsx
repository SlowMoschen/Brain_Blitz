import { Outlet } from "react-router-dom";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { Box } from "@mui/material";

export default function DashboardLayout() {
  return (
    <>
      <ScrollToTop />
      <Box>
        <Outlet />
      </Box>
    </>
  );
}
