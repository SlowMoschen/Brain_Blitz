import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "../../shared/constants/breakpoints";
import useScreenSize from "../../shared/hooks/useScreenSize";
import RootFooter from "./components/Footer/Footer";
import MobileRootNavbar from "./components/Navbar/MobileNavbar";
import RootNavbar from "./components/Navbar/Navbar";

export default function RootLayout() {
  const screenSize = useScreenSize();

  return (
    <>
      {screenSize.width <= BREAKPOINTS.md ? <MobileRootNavbar /> : <RootNavbar />}
      <main id="content" className="h-fit flex flex-col items-center">
        <Outlet />
      </main>
      <RootFooter />
    </>
  );
}
