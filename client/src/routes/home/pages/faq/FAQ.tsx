import { Box, Typography } from "@mui/material";
import { content } from "./content";
import CustomAccordion from "../../../../shared/components/Accordion";
import person from "../../../../assets/faq_person.svg";
import questionMark from "../../../../assets/faq_question_mark.svg";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";

export default function FAQ() {
  const { width } = useScreenSize();
  const isXL = width >= BREAKPOINTS["2xl"];

  const containerStyles = {
    display: "flex",
    justifyContent: "felex-start",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: "1024px",
    width: "90%",
    my: 5,
  };

  return (
    <Box sx={{ ...containerStyles }}>
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
    </Box>
  );
}
