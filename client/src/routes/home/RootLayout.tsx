import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import ScrollToTop from "../../shared/components/ScrollToTop";
import useScreenSize from "../../shared/hooks/useScreenSize";
import MobileNavbar from "./components/navbar/_MobileNavbar.main";
import Navbar from "./components/navbar/_Navbar.main";
import Footer from "./components/Footer/Footer";

export default function RootLayout() {
  const { width } = useScreenSize();

  return (
    <>
      <ScrollToTop />
      {width > BREAKPOINTS.md ? <Navbar /> : <MobileNavbar />}
      <Box
        sx={{
          height: "fit-content",
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
