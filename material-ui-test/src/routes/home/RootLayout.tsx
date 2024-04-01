import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import useScreenSize from "../../shared/hooks/useScreenSize";
import Footer from "./components/footer/Footer";
import MobileNavbar from "./components/navbar/_MobileNavbar.main";
import Navbar from "./components/navbar/_Navbar.main";

export default function RootLayout() {
  const { width } = useScreenSize();

  return (
    <>
      {width > BREAKPOINTS.md ? <Navbar /> : <MobileNavbar />}
        <Outlet />
      <Footer />
    </>
  );
}
