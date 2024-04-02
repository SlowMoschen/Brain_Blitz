import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CustomAccordionProps {
  question: string;
  answer: string;
}

export default function CustomAccordion({ question, answer }: CustomAccordionProps) {
  const accordionStyles = {
    bgcolor: "background.secondary",
    my: 1,
    p: 2,
    borderRadius: ".375rem",
    minHeight: "4rem",
  };

  const dividerStyles = {
    borderBottom: "1px solid",
    borderColor: "accent.light",
  };

  const iconStyles = {
    color: "accent.main",
    fontSize: "2rem",
  };

  return (
    <Accordion sx={{ ...accordionStyles }}>
      <AccordionSummary
        sx={{ ...dividerStyles }}
        expandIcon={<ExpandMoreIcon sx={{ ...iconStyles }} />}
      >
        <Typography fontSize={'1.2rem'}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
