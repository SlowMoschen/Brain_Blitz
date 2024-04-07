import { Box, Typography } from "@mui/material";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { terms } from "./content";

interface TermProps {
  number: number;
  title: string;
  text: string;
}

function Term({ number, title, text }: TermProps) {
  return (
    <Box my={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
        <Typography variant="h6" sx={{ color: "accent.main", mr: 1 }}>
          {number}.
        </Typography>
        <Typography variant="h6" fontWeight={600}>{title}</Typography>
      </Box>
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
}

export default function Terms() {
  const containerStyles = {
    p: 4,
    my: 15,
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    width: "90%",
    maxWidth: BREAKPOINTS.lg,
  };

  return (
    <Box sx={ containerStyles }>
      <Typography variant="h5" mb={2} textAlign={"center"} className="border-b-accent">
        Allgemeine Geschäftsbedingungen (AGB)
      </Typography>
      {terms.map((term, index) => (
        <Term number={index + 1} title={term.title} text={term.text} key={index} />
      ))}
      <Typography sx={{ opacity: ".5", fontSize: ".8rem" }}>
        Diese AGB wurden zuletzt am 29.03.2024 aktualisiert.
      </Typography>
    </Box>
  );
}
