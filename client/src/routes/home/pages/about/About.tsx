import QuizDataCard from "./components/quizDataCard";

export default function AboutPage(): JSX.Element {
  
  return (
    <>
    <h1>Willkommen bei Brain Blitz!</h1>
    <p>Hier finden Sie eine vielfältige Auswahl an Quiz-Kategorien, darunter Geschichte, Popkultur, Biologie, das Universum, Geopolitik und vieles mehr. Jedes Quiz ist mit einer Zeitbegrenzung versehen, bei der richtige Antworten Punkte bringen und falsche Antworten Punkte abziehen. Zusätzlich erhalten Spieler für jede verbleibende Sekunde Extra-Punkte, um die Rangliste des jeweiligen Quiz spannend zu gestalten. Nach Abschluss eines Quiz wird der Highscore des Benutzers gespeichert, und die Rangliste wird aktualisiert, sodass jeder Benutzer seine Leistung vergleichen kann. Tauchen Sie ein in ein interaktives Quiz-Erlebnis, das Wissen und Unterhaltung vereint - viel Spaß beim Spielen!</p>
      <QuizDataCard />
    </>
  )
}
