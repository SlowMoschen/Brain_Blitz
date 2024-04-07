import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import person from "../../../../assets/faq_person.svg";
import questionMark from "../../../../assets/faq_question_mark.svg";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import CustomAccordion from "../../../../shared/components/Accordion";
import { WindowContext } from "../../../../shared/context/ScreenSize.context";
import { content } from "./content";

export default function FAQ() {
  const { width } = useContext(WindowContext);
  const isXL = width >= BREAKPOINTS["2xl"];

  const mainContainer = {
    alignItems: "center",
    maxWidth: "1024px",
    width: "90%",
    my: 5,
  };

  return (
    <Stack sx={ mainContainer }>
      {isXL && (
        <>
          <img
            src={person}
            alt="person"
            style={{ maxWidth: "250px", position: 'absolute', right: '2%'}}
          />
          <img
            src={questionMark}
            alt="question mark"
            style={{ maxWidth: "300px", position: 'absolute', left: '2%', bottom: '10%'}}
          />
        </>
      )}
      <Typography
        variant={"h4"}
        fontWeight={500}
        sx={{ mb: 2, textAlign: "center" }}
        className="border-b-accent"
      >
        Häufig gestellte Fragen
      </Typography>
      <Typography my={1}>
        Unsere FAQ-Seite bietet eine kompakte Zusammenfassung von Informationen und Antworten auf
        gängige Fragen zur Nutzung unserer Quiz-App.
      </Typography>
      {content.map((item, i) => (
        <CustomAccordion key={i} question={item.question} answer={item.answer} />
      ))}
    </Stack>
  );
}
