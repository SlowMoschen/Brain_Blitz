import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleIcon from "@mui/icons-material/People";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../../shared/components/buttons/SecondaryButton";
import WelcomeHeader from "../../../components/WelcomeHeader";

export default function AdminDashboard() {
  const redirect = useNavigate();
  return (
    <>
      <WelcomeHeader name="Admin" text="Willkommen zurück" />
      <Stack gap={1}>
        <Typography variant="h4" align="center">
          Was möchtest du tun?
        </Typography>
        <Stack direction="row" gap={1} flexWrap={"wrap"} justifyContent={"center"}>
          <CallToAction
            onClick={() => redirect(URLS.ADMIN_ROUTES.USERS)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "200px",
              fontSize: 20,
              bgcolor: "accent.light",
            }}
          >
            <PeopleIcon sx={{ fontSize: 40 }} />
            Benutzer verwalten
          </CallToAction>
          <CallToAction
            onClick={() => redirect(URLS.ADMIN_ROUTES.QUIZZES)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "200px",
              fontSize: 20,
              bgcolor: "accent.light",
            }}
          >
            <PsychologyIcon sx={{ fontSize: 40 }} />
            Quiz verwalten
          </CallToAction>
          <SecondaryButton
            onClick={() => redirect(URLS.ADMIN_ROUTES.QUIZZES)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "200px",
              fontSize: 20,
              bgcolor: "accent.light",
              color: "text.main",
              pointerEvents: "none",
              opacity: 0.5,
            }}
          >
            <CampaignIcon sx={{ fontSize: 40 }} />
            Notifications verwalten
          </SecondaryButton>
          <CallToAction
            onClick={() => redirect(URLS.ADMIN_ROUTES.QUIZZES)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "200px",
              fontSize: 20,
              bgcolor: "primary.main",
              color: "text.main",
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 40 }} />
            Zurück zum Dashboard
          </CallToAction>
        </Stack>
      </Stack>
    </>
  );
}
