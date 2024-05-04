import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "../../../components/WelcomeHeader";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import { URLS } from "../../../../../configs/Links";
import SecondaryButton from "../../../../../shared/components/buttons/SecondaryButton";

export default function AdminDashboard() {
    const redirect = useNavigate();
    return (
        <>
        <WelcomeHeader name="Admin" text="Willkommen" />
        <Stack gap={1}>
            <Typography variant="h4">Was möchtest du tun?</Typography>
            <CallToAction text="Benutzer verwalten" onClick={() => redirect(URLS.ADMIN_ROUTES.ALL_USERS)} />
            <SecondaryButton text="Quiz erstellen" onClick={() => redirect(URLS.ADMIN_ROUTES.CREATE_QUIZ)} />
            <CallToAction text="Quiz verwalten" onClick={() => redirect(URLS.ADMIN_ROUTES.ALL_QUIZZES)} />
            <SecondaryButton text="Zurück zur zum Dashboard" onClick={() => redirect(URLS.DASHBOARD)} />
        </Stack>
        </>
    )
}