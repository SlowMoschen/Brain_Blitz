import { Outlet } from "react-router-dom";
import MobileRootNavbar from "./components/Navbar/MobileNavbar";
import RootFooter from "./components/Footer/Footer";
import { BREAKPOINTS } from "../../shared/constants/breakpoints";
import RootNavbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";

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
