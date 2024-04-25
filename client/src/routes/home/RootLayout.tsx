import { Stack } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { DEFAULT_DOCUMENT_TITLE } from "../../configs/Application";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { WindowContext } from "../../shared/context/ScreenSize.context";
import { useDocumentTitle } from "../../shared/hooks/useDocumentTitle.hook";
import CookieModal from "./components/CookieModal";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/navbar/_MobileNavbar.main";
import Navbar from "./components/navbar/_Navbar.main";

export default function RootLayout() {
  useDocumentTitle(DEFAULT_DOCUMENT_TITLE);
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
