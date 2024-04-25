import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "../../../configs/Breakpoints";
import { URLS } from "../../../configs/Links";
import AlertSnackbar from "../../../shared/components/AlertSnackbar";
import { WindowContext } from "../../../shared/context/ScreenSize.context";
import useToggle from "../../../shared/hooks/useToggle.hook";
import AuthForm from "./AuthForm";
import SuccessScreen from "./SuccessScreen";

interface IResendFormInput {
  email: string;
}

const defaultValues: IResendFormInput = {
  email: "",
};

function getSnackbarMessage(error: string) {
  if (error.includes("Too Many Requests"))
    return "Die Verifizierungsmail wurde bereits gesendet. Bitte überprüfe deinen Posteingang.";

  if (error.includes("User not found"))
    return "Der Benutzer wurde nicht gefunden. Bitte registriere dich erneut.";

  if (error.includes("E-Mail wurde schon verifiziert"))
    return "Die E-Mail-Adresse wurde bereits verifiziert. Bitte melde dich an.";

  return "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.";
}

export default function ResendVerification() {
  const redirect = useNavigate();
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const { width } = useContext(WindowContext);
  const [snackBarProps, setSnackbarProps] = useState<{
    message: string;
    alertType: "success" | "error";
  }>({
    message: "",
    alertType: "success",
  });

  const handleError = (error: string) => {
    setSnackbarProps({ message: getSnackbarMessage(error), alertType: "error" });
    toggleSnackbarOpen();
  };

  const handleSuccess = () => setWasSuccessful(true);

  const stackStyles = {
    width: "100%",
    maxWidth: BREAKPOINTS.md,
    alignItems: "center",
    justifyContent: "center",
    mt: { xs: 20, md: 0 },
  };

  const paperStyles = {
    p: 4,
    my: 5,
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    gap: 2,
    width: "100%",
  };

  if (wasSuccessful) {
    return (
      <SuccessScreen
        title="Bestätigungsmail gesendet"
        text="Wir haben dir eine Bestätigungsmail gesendet. Bitte überprüfe deinen Posteingang und bestätige deine E-Mail-Adresse."
        button={{
          text: "Zurück zum Login",
          to: URLS.SIGNIN,
        }}
      />
    );
  }

  return (
    <>
      <Stack sx={stackStyles}>
        <Paper sx={paperStyles}>
          <Stack gap={2}>
            {width > BREAKPOINTS.md && (
              <IconButton onClick={() => redirect(-1)} sx={{ alignSelf: 'flex-start' }}>
              <ArrowBackIcon sx={{ fontSize: 30, color: 'primary.main' }} />
            </IconButton>
            )}
            <Typography variant="h5" align="left" className="border-b-primary">
              Verifizierungsmail erneut senden
            </Typography>
            <Typography variant="body1" align="left">
              Bitte gib deine E-Mail-Adresse ein, um erneut eine Verifizierungsmail zu erhalten.
            </Typography>
            <AuthForm
              type="RESEND_VERIFICATION_EMAIL"
              defaultInput={defaultValues}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </Stack>
        </Paper>
      </Stack>
      <AlertSnackbar
        alertType={snackBarProps.alertType}
        message={snackBarProps.message}
        open={isSnackbarOpen}
        onClose={toggleSnackbarOpen}
      />
    </>
  );
}
