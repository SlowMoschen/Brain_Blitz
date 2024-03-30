import { useNavigate } from "react-router-dom";
import Button from "../../../../../../shared/components/Button";
import brainPNG from '../../../../../../assets/brain.png';
import useScreenSize from "../../../../../../shared/hooks/useScreenSize";
import clsx from "clsx";
import { BREAKPOINTS } from "../../../../../../shared/constants/breakpoints";

export default function HeroSection(): JSX.Element {
  const redirect = useNavigate();
  const screenSize = useScreenSize();

  return (
    <section className="bg-bg-primary w-full h-screen flex flex-col items-center justify-evenly mt-10 mb-20 px-5 lg:flex-row">
      {/* Titles */}
      <section className="flex flex-col justify-center items-center text-center lg:text-left">
        <h1 className="animated-bg text-8xl 2xl:text-9xl tracking-wide font-bold w-full">
          Brain Blitz
        </h1>
        <p className="text-4xl 2xl:text-5xl">Baue dein Wissen auf, Kategorie für Kategorie</p>
        <section className="my-5 w-full">
          <Button className="secondary min-w-[300px] lg:w-[400px]" onClick={() => redirect("/faq")}>
            Wie funktioniert Brain Blitz?
          </Button>
          <Button
            className="primary min-w-[300px] lg:w-[400px]"
            onClick={() => redirect("/auth/register")}
          >
            Jetzt loslegen!
          </Button>
        </section>
      </section>

      {/* Pictures */}
      <section className="flex items-center justify-center mx-2">
        <a href="https://www.glazestock.com/image/9vabNnwyy" target="_blank">
        <img src={brainPNG} alt="Brain" className={clsx(
          screenSize.width <= BREAKPOINTS.sm ? 'w-64' : ''
        )} />
        </a>
      </section>
    </section>
  );
}
