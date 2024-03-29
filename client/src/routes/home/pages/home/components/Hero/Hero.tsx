import { useNavigate } from "react-router-dom";
import Button from "../../../../../../shared/components/Button";

export default function HeroSection(): JSX.Element {
  const redirect = useNavigate();

  return (
    <section className="bg-bg-primary w-full h-screen flex flex-col items-center justify-evenly px-5 lg:flex-row">
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
        <div className="bg-accent-light h-[200px] w-[200px] md:h-[400px] md:w-[400px]"></div>
      </section>
    </section>
  );
}
