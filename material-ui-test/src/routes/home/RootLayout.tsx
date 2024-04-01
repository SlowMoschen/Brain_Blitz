import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import useScreenSize from "../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import Footer from "./components/Footer";
import Navbar from "./components/navbar/_Navbar.main";
import MobileNavbar from "./components/navbar/_MobileNavbar.main";

export default function RootLayout() {
  const { width } = useScreenSize();

  return (
    <>
      {width > BREAKPOINTS.md ? <Navbar /> : <MobileNavbar />}
      <Container sx={{ height: '100vh', p: 2 }}>
        <Outlet />
      <Footer />
      </Container>
    </>
  );
}
