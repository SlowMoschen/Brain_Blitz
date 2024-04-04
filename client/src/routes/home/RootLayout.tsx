import { Box } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { WindowContext } from "../../shared/context/ScreenSize.context";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/navbar/_MobileNavbar.main";
import Navbar from "./components/navbar/_Navbar.main";

export default function RootLayout() {
  const { width } = useContext(WindowContext);

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
