import { Box, Typography } from "@mui/material";
import team from "../../../../assets/about.svg";
import dev from "../../../../assets/about_dev.svg";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";

interface ArticleProps {
  title: string;
  body1: string;
  body2?: string;
  body3?: string;
}

function Article({ title, body1, body2, body3 }: ArticleProps) {
  const containerStyles = {
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 3,
    maxWidth: "1024px",
  };

  const titleStyles = {
    marginBottom: "16px",
    fontWeight: "bold",
  };

  const bodyStyles = {
    my: 1,
  };

  return (
    <Box sx={{ ...containerStyles }}>
      <Typography variant="h4" sx={{ ...titleStyles }} className="border-b-accent">
        {title}
      </Typography>
      <Typography variant="body1" sx={{ ...bodyStyles }}>
        {body1}
      </Typography>
      {body2 && (
        <Typography variant="body1" sx={{ ...bodyStyles }}>
          {body2}
        </Typography>
      )}
      {body3 && (
        <Typography variant="body1" sx={{ ...bodyStyles }}>
          {body3}
        </Typography>
      )}
    </Box>
  );
}

export default function About() {
  const { width } = useScreenSize();

  const isXL = width >= BREAKPOINTS["2xl"];

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 3,
    maxWidth: "1024px",
  };

  return (
    <Box sx={{ ...containerStyles }}>
      {isXL && (
        <>
          <img
            src={dev}
            alt="dev"
            style={{ maxWidth: "250px", position: "absolute", right: "2%", bottom: "10%"}}
          />
          <img
            src={team}
            alt="team"
            style={{ maxWidth: "250px", position: "absolute", left: "2%", top: "10%"}}
          />
        </>
      )}
      <Article
        title="Über Brain Blitz"
        body1="Hier findest du eine vielfältige Auswahl an Quiz-Kategorien, darunter Geschichte, Popkultur, Biologie, das Universum, Geopolitik und vieles mehr. Jedes Quiz ist mit einer Zeitbegrenzung versehen, bei der richtige Antworten Punkte bringen und falsche Antworten Punkte abziehen. Zusätzlich erhalten Spieler für jede verbleibende Sekunde Extra-Punkte, um die Rangliste des jeweiligen Quiz spannend zu gestalten."
        body2="Nach Abschluss eines Quiz wird der Highscore des Benutzers gespeichert, und die Rangliste wird aktualisiert, sodass jeder Benutzer seine Leistung vergleichen kann. Tauche ein in ein interaktives Quiz-Erlebnis, das Wissen und Unterhaltung vereint - viel Spaß beim Spielen!"
      />

      <Article
        title="Über die Entwicklung von Brain Blitz"
        body1="Ich bin Philipp, und es erfüllt mich mit Stolz, diese Quiz-App als Abschlussprojekt meines Softwareentwicklungs-Kurses allein entwickelt zu haben. Im Laufe von etwa zwei Monaten habe ich meine Zeit und Energie in das Design und die Programmierung dieses Projekts investiert. Als langjähriger Liebhaber von Quiz-Apps habe ich mich schon immer gerne in triviales Wissen vertieft, was mich zusätzlich motiviert hat, diese App zu kreieren."
        body2="Bei der Entwicklung dieser Quiz-App entschied ich mich für die leistungsfähige Kombination aus NestJS im Backend und React im Frontend. Durch die Verwendung von NestJS, einem robusten Backend-Framework, konnte ich eine zuverlässige REST-API aufbauen, die Sicherheit und Skalierbarkeit gewährleistet. Gleichzeitig ermöglichte mir React als moderne Frontend-Bibliothek eine dynamische und ansprechende Benutzeroberfläche zu gestalten, die reibungslos auf verschiedenen Endgeräten läuft. Diese Technologieauswahl reflektiert meine Priorität, eine hochwertige technische Lösung zu bieten, die gleichzeitig intuitiv und ansprechend für die Benutzer ist."
        body3="Ich hoffe, dass du beim Spielen von Brain Blitz genauso viel Freude haben wie ich bei der Entwicklung dieser App. Vielen Dank für dein Interesse und deine Unterstützung!"
      />
    </Box>
  );
}
