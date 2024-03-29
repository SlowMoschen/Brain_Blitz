import Article from "../../../../shared/components/Article";
import FaqAccordion from "./FAQAccordion";
import faq_person from "../../../../assets/faq_person.svg";
import faq_question from "../../../../assets/faq_question_mark.svg";
import clsx from "clsx";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../shared/constants/breakpoints";

export default function FAQ(): JSX.Element {

  const screenSize = useScreenSize();

  return (
    <>
    <img src={faq_person} alt="" className={clsx(
      'absolute right-10 top-10 h-96',
      screenSize.width >= BREAKPOINTS["2xl"] ? '' : 'hidden'
    )}/>
    <img src={faq_question} alt="" className={clsx(
      'absolute left-5 bottom-10 h-52 -z-10',
      screenSize.width >= BREAKPOINTS["2xl"] ? '' : 'hidden'
    )}/>
      <Article
        title={{ content: "Häufig gestellte Fragen", border_b: true }}
        para1="Unsere FAQ-Seite bietet eine kompakte Zusammenfassung von Informationen und Antworten auf gängige Fragen zur Nutzung unserer Quiz-App."
      />
      <ul className="mx-5">
        <FaqAccordion
          title="Ist die App kostenlos?"
          content="Ja, unsere Quiz-App ist kostenlos verfügbar zum Spielen, es gibt keine versteckten Kosten. Doch bald kannst du uns mit unseren Support-Mitgliedschaften unterstützen."
        />
        <FaqAccordion
          title="Unterstützt die App verschiedene Sprachen?"
          content="Derzeit bieten wir unsere Quiz-App nur in einer Sprache an. Wir arbeiten jedoch daran, Unterstützung für weitere Sprachen hinzuzufügen, um unsere Benutzer weltweit besser zu bedienen."
        />
        <FaqAccordion
          title="Wie funktionieren die Punktevergabe und Zeitlimits in den Quizzen?"
          content="In unseren Quizzen erhalten Spieler Punkte für richtige Antworten und verlieren Punkte für falsche Antworten. Zusätzlich gibt es Zeitlimits für jedes Quiz, wobei verbleibende Zeit auch Bonuspunkte einbringt, um die Spannung in der Rangliste aufrechtzuerhalten."
        />
        <FaqAccordion
          title="Werden meine Highscores gespeichert?"
          content="Ja, sobald ein Quiz abgeschlossen ist, wird dein Highscore gespeichert. Du kannst deine Leistungen in den Ranglisten vergleichen und verfolgen."
        />
        <FaqAccordion
          title="Kann ich die Rangliste anderer Spieler sehen?"
          content="Ja, sobald du ein Quiz abgeschlossen hast, kannst du in die Rangliste einsehen und verfolgen wie du im Vergleich zu anderen Spielern abschneidest."
        />
        <FaqAccordion
          title="Gibt es verschiedene Kategorien von Quizzen?"
          content="Ja, unsere Quiz-App bietet eine breite Palette von Kategorien wie Geschichte, Popkultur, Biologie, Universum, Geo-Politik und mehr, um sicherzustellen, dass für jeden etwas dabei ist."
        />
        <FaqAccordion
          title="Kann ich eigene Quizze erstellen?"
          content="Derzeit unterstützen wir keine benutzerdefinierten Quizze, aber wir arbeiten daran, diese Funktion in Zukunft hinzuzufügen, um unseren Benutzern mehr Kontrolle über den Inhalt zu geben."
        />
        <FaqAccordion
          title="Wie kann ich Feedback oder Vorschläge zur App abgeben?"
            content="Wir schätzen das Feedback unserer Benutzer sehr! Du kannst uns dein Feedback oder deine Vorschläge gerne über unser Kontaktformular auf der App-Website mitteilen. Wir freuen uns darauf, von dir zu hören und unsere App kontinuierlich zu verbessern."
        />
      </ul>
    </>
  );
}
