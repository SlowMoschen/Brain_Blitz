import { Container, Link, Typography } from "@mui/material";
import logoNoText from "../../assets/logoNoText.png";
import { URLS } from "../../configs/Links";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const redirect = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <>
      <Container sx={containerStyle}>
        <img src={logoNoText} alt="Brain Blitz Logo without Text" />
        <Typography variant="h1" className="animated-bg" fontWeight={600} fontSize={150}>
          404
        </Typography>
        <Typography variant="h2" fontSize={20} sx={{ opacity: "50%", mb: 2 }}>
          Seite nicht gefunden
        </Typography>
        <Typography variant="body1">
          Die angeforderte Seite ist nicht verfügbar oder es ist ein Fehler aufgetretten.
        </Typography>
        <Typography variant="body1">
          <Link onClick={() => redirect(-1)} sx={{ cursor: "pointer" }}>
            Gehe zurück
          </Link>{" "}
          oder <Link href={URLS.CONTACT}>kontaktiere unseren Support</Link>
        </Typography>
      </Container>
    </>
  );
}
