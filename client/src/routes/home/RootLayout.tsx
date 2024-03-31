import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../shared/components/ScrollToTop";
import { APPLICATION } from "../../shared/constants/application";
import { BREAKPOINTS } from "../../shared/constants/breakpoints";
import useScreenSize from "../../shared/hooks/useScreenSize";
import { HttpService } from "../../shared/services/httpService";
import RootFooter from "./components/Footer/Footer";
import MobileRootNavbar from "./components/Navbar/MobileNavbar";
import RootNavbar from "./components/Navbar/Navbar";

export default function RootLayout() {
  const screenSize = useScreenSize();

  const fetchQuizData = async () => {
    const httpService = new HttpService();
    return await httpService.get(APPLICATION.QUIZ_DATA_ENDPOINT);
  }

  const { data: response } = useQuery({ queryKey: ["quizData"], queryFn: fetchQuizData });

  return (
    <>
      <ScrollToTop />
      {screenSize.width <= BREAKPOINTS.md ? <MobileRootNavbar /> : <RootNavbar />}
      <main id="content" className="h-fit flex flex-col items-center relative">
        <Outlet context={{ quizData: response?.data }} />
      </main>
      <RootFooter />
    </>
  );
}
