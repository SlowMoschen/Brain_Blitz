import Header from "../../../shared/components/Header";
import HeroSection from "../components/Hero/Hero";
import WhyCard from "../components/WhyCard/WhyCard";

export default function Home(): JSX.Element {
  return (
    <>
      <HeroSection />
      <section id="why-section" className="p-5 m-5">
        <Header content="Warum Brain Blitz?" className="big" />
        <section className="flex flex-col lg:flex-row justify-center items-center my-2">
          <WhyCard
            title="Wissen erweitern"
            description="Spielerisch Wissen in verschiedenen Kategorien erweitern!"
            icon="local_library"
          />
          <WhyCard
            title="Jederzeit und Überall"
            description="Lernen leicht gemacht, überall und jederzeit!"
            icon="location_on"
          />
          <WhyCard
            title="Bildung und Unterhaltung Kombiniert"
            description="Faszinierende Fakten entdecken, Bildung und Unterhaltung vereint!"
            icon="cast_for_education"
          />
        </section>
      </section>
    </>
  );
}
