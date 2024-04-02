import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "../../configs/Breakpoints";
import useScreenSize from "../../shared/hooks/useScreenSize";
import Footer from "./components/footer/Footer";
import MobileNavbar from "./components/navbar/_MobileNavbar.main";
import Navbar from "./components/navbar/_Navbar.main";
import { useQuery } from "@tanstack/react-query";
import { APPLICATION } from "../../configs/Application";

export default function RootLayout() {
  const { width } = useScreenSize();

  const fetchQuizData = async () => {
    const response = await fetch(APPLICATION.BACKEND_URL + APPLICATION.QUIZ_DATA_ENDPOINT);
    const data = await response.json();
    return data;
}

const { data: response } = useQuery({ queryKey: ['quizData'], queryFn: fetchQuizData });

  return (
    <>
      {width > BREAKPOINTS.md ? <Navbar /> : <MobileNavbar />}
        <Outlet context={response?.data} />
      <Footer />
    </>
  );
}
