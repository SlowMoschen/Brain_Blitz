import clsx from "clsx";
import about from "../../../../assets/about.svg";
import about_dev from "../../../../assets/about_dev.svg";
import Article from "../../../../shared/components/Article";
import { BREAKPOINTS } from "../../../../shared/constants/breakpoints";
import useScreenSize from "../../../../shared/hooks/useScreenSize";

export default function AboutPage(): JSX.Element {

  const screenSize = useScreenSize();

  return (
    <>
      <img src={about} alt="" className={clsx(
        "absolute left-5 top-20 h-52" ,
        screenSize.width >= BREAKPOINTS["2xl"] ? '' : 'hidden'
      )}/>
      <img src={about_dev} alt="" className={clsx(
        "absolute h-60 bottom-20 right-5 -z-10",
        screenSize.width >= BREAKPOINTS["2xl"] ? '' : 'hidden'
      )} />
      <Article
        title={{
          content: "Über Brain Blitz",
          border_b: true,
        }}
        para1="Hier finden Sie eine vielfältige Auswahl an Quiz-Kategorien, darunter Geschichte, Popkultur, Biologie, das Universum, Geopolitik und vieles mehr. Jedes Quiz ist mit einer Zeitbegrenzung versehen, bei der richtige Antworten Punkte bringen und falsche Antworten Punkte abziehen. Zusätzlich erhalten Spieler für jede verbleibende Sekunde Extra-Punkte, um die Rangliste des jeweiligen Quiz spannend zu gestalten."
        para2="Nach Abschluss eines Quiz wird der Highscore des Benutzers gespeichert, und die Rangliste wird aktualisiert, sodass jeder Benutzer seine Leistung vergleichen kann. Tauchen Sie ein in ein interaktives Quiz-Erlebnis, das Wissen und Unterhaltung vereint - viel Spaß beim Spielen!"
      />
      <Article
        title={{
          content: "Über die Entwicklung von Brain Blitz",
          border_b: true,
        }}
        para1="Ich bin Philipp, und es erfüllt mich mit Stolz, diese Quiz-App als Abschlussprojekt meines Softwareentwicklungs-Kurses allein entwickelt zu haben. Im Laufe von etwa zwei Monaten habe ich meine Zeit und Energie in das Design und die Programmierung dieses Projekts investiert. Als langjähriger Liebhaber von Quiz-Apps habe ich mich schon immer gerne in triviales Wissen vertieft, was mich zusätzlich motiviert hat, diese App zu kreieren."
        para2="Bei der Entwicklung dieser Quiz-App entschied ich mich für die leistungsfähige Kombination aus NestJS im Backend und React im Frontend. Durch die Verwendung von NestJS, einem robusten Backend-Framework, konnte ich eine zuverlässige REST-API aufbauen, die Sicherheit und Skalierbarkeit gewährleistet. Gleichzeitig ermöglichte mir React als moderne Frontend-Bibliothek eine dynamische und ansprechende Benutzeroberfläche zu gestalten, die reibungslos auf verschiedenen Endgeräten läuft. Diese Technologieauswahl reflektiert meine Priorität, eine hochwertige technische Lösung zu bieten, die gleichzeitig intuitiv und ansprechend für die Benutzer ist."
        para3="Ich hoffe, dass Sie beim Spielen von Brain Blitz genauso viel Freude haben wie ich bei der Entwicklung dieser App. Vielen Dank für Ihr Interesse und Ihre Unterstützung!"
      />
    </>
  );
}
