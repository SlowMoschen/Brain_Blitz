import EndSection from "./components/EndSection/EndSection";
import HeroSection from "./components/Hero/Hero";
import HowSection from "./components/HowSection/HowSection";
import WhySection from "./components/WhySection/WhySection";

export default function Home(): JSX.Element {
  return (
    <>
      <HeroSection />
      <WhySection />
      <HowSection />
      <EndSection />
    </>
  );
}
