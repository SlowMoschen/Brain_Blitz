import Footer from "./components/Footer/Footer";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { WindowContext } from "../../shared/context/ScreenSize.context";
import MobileNavbar from "./components/navbar/_MobileNavbar.main";
import Navbar from "./components/navbar/_Navbar.main";
import CookieModal from "./components/CookieModal";

export default function RootLayout() {
  const { width } = useContext(WindowContext);

  return (
    <>
      <ScrollToTop />
      {width > BREAKPOINTS.md ? <Navbar /> : <MobileNavbar />}
      <Stack alignItems={"center"} width={"100%"} position={"relative"}>
        <Outlet />
      </Stack>
      <Footer />
      <CookieModal />
    </>
  );
}
