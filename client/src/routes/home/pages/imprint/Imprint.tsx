import { Box, Link, Typography } from "@mui/material";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";

export default function Imprint() {
  const containerStyles = {
    p: 5,
    my: 15,
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    width: "90%",
    maxWidth: BREAKPOINTS.lg,
  };

  return (
    <Box sx={{ ...containerStyles }}>
      <Typography variant="h5" textAlign={'center'} className="border-b-accent">
        Verantwortlich für den Inhalt dieser Quiz-App:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          my: 5,
        }}
      >
        <Box>
          <Typography variant="subtitle1">Kontak:</Typography>
          <Typography>Philipp Millner</Typography>
          <Typography>Hütteldorferstraße 185</Typography>
          <Typography>1140 Wien</Typography>
          <Typography>service@brain-blitz.com</Typography>
        </Box>
      </Box>

      <Typography variant="body1" my={2}>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die
        du unter{" "}
        <Link href="http://ec.europa.eu/consumers/odr" sx={{ wordBreak: 'break-all'}}>http://ec.europa.eu/consumers/odr</Link>{" "}
        finden kannst. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </Typography>

      <Typography my={2}>
        Diese Angaben gelten auch für unsere{" "}
        <Link href="https://linktr.ee/BrainBlitz">Social-Media-Profile</Link>
      </Typography>

      <Typography my={2}>
        Wir weisen darauf hin, dass jegliche unerlaubte Verwendung von Inhalten unserer App oder
        Teilen davon, einschließlich der Vervielfältigung, Verbreitung oder Verwendung in anderen
        elektronischen oder gedruckten Publikationen, ohne unsere ausdrückliche Zustimmung
        rechtliche Schritte nach sich ziehen kann.
      </Typography>

      <Typography sx={{ opacity: '.5', fontSize: '.8rem'}}>Dieses Impressum wurde zuletzt am 29.03.2024 aktualisiert.</Typography>
    </Box>
  );
}
