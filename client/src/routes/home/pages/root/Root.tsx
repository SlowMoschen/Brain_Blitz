import EndSection from "./components/EndSection";
import Herosection from "./components/Herosection";
import HowSection from "./components/HowSection";
import QuizData from "./components/QuizData";
import WhySection from "./components/WhySection";

export default function Home() {
  return (
    <>
      <Herosection />
      <QuizData />
      <WhySection />
      <HowSection />
      <EndSection />
    </>
  );
}
