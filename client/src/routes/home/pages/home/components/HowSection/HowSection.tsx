import Step from "./Step";

export default function HowSection() {
  return (
    <section
      id="how-section"
      className="p-10 my-20 mx-5 bg-bg-secondary rounded-lg md:flex max-w-[1500px] justify-center"
    >
      <section className="py-5 lg:w-[30%]">
        <h1 className="text-4xl lg:text-5xl text-center font-semibold">
          Wie funktioniert Brain Blitz?
        </h1>
        <p className="text-xl text-center my-2">In 4 Schritten zu mehr Wissen!</p>
      </section>
      <section className="lg:grid lg:grid-cols-2 justify-center lg:w-[70%]">
        <Step
          step={1}
          title="Registrieren"
          description="Regestriere dich, kostenlos und unverbindlich!"
        />
        <Step
          step={2}
          title="Quiz wählen"
          description="Wähle eines der Start-Quizzes aus, welches dich interessiert!"
        />
        <Step
          step={3}
          title="Absolviere das Quiz"
          description="Beantworte Fragen unter Zeitdruck, sammle Punkte für jede richtige Antwort und sei clever, denn falsche Antworten kosten dich wertvolle Punkte. Aber keine Sorge, die Zeit arbeitet für dich! Je schneller du bist, desto mehr Punkte kannst du zusätzlich verdienen."
        />
        <Step
          step={4}
          title="Neue Kategorien Freischalten"
          description="Nach erfolgreichem Absolvieren eines Quiz schaltest du neue faszinierende Quizzes in verschiedenen Kategorien frei, die darauf warten, von dir entdeckt zu werden."
        />
      </section>
    </section>
  );
}
