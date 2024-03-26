import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "../../shared/constants/breakpoints";
import RootFooter from "./components/Footer/Footer";
import MobileRootNavbar from "./components/Navbar/MobileNavbar";
import RootNavbar from "./components/Navbar/Navbar";

export default function RootLayout() {
  const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setDeviceWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setDeviceWidth(window.innerWidth));
    };
  }, []);

  return (
    <>
      {deviceWidth <= BREAKPOINTS.md ? <MobileRootNavbar /> : <RootNavbar />}
      <main id="content" className="h-fit flex flex-col items-center">
        <Outlet />
      </main>
      <RootFooter />
    </>
  );
}
