import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Backdrop, CircularProgress, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "../../../configs/Breakpoints";
import { URLS } from "../../../configs/Links";
import AlertSnackbar from "../../../shared/components/AlertSnackbar";
import CallToAction from "../../../shared/components/buttons/CallToAction";
import InputText from "../../../shared/components/form/InputText";
import { WindowContext } from "../../../shared/context/ScreenSize.context";
import { useAuthQueries } from "../../../shared/hooks/api/useAuthQueries.hook";
import useToggle from "../../../shared/hooks/useToggle.hook";
import { EmailSchema } from "../schemas/Email.schema";
import SuccessScreen from "./SuccessScreen";

interface IResetFormInput {
  email: string;
}

const defaultValues: IResetFormInput = {
  email: "",
};

function getSnackbarMessage(error: string) {
  if (error.includes("Too Many Requests"))
    return "Die Verifizierungsmail wurde bereits gesendet. Bitte überprüfe deinen Posteingang.";

  if (error.includes("User not found"))
    return "Der Benutzer wurde nicht gefunden. Bitte registriere dich erneut.";

  return "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.";
}

export default function ForgotPassword() {
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
  const { control, handleSubmit, reset } = useForm<IResetFormInput>({
    defaultValues,
    resolver: zodResolver(EmailSchema),
  });

  const handleError = (error: string) => {
    setSnackbarProps({ message: getSnackbarMessage(error), alertType: "error" });
    toggleSnackbarOpen();
  };

  const handleSuccess = () => setWasSuccessful(true);

  const { mutate, isPending } = useAuthQueries().useForgotPassword(handleSuccess, handleError);

  const onSubmit = (data: IResetFormInput) => {
    data.email = data.email.toLowerCase();
    mutate(data);
    reset(defaultValues);
  };

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
        title="E-Mail für die Passwortwiederherstellung gesendet"
        text="Bitte überprüfe deinen Posteingang, um dein Passwort zurückzusetzen."
        button={{
          text: "Zurück zum Login",
          to: URLS.SIGNIN,
        }}
      />
    );
  }

  return (
    <>
      {isPending && (
        <Backdrop open={isPending} sx={{ zIndex: 100 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Stack sx={stackStyles}>
        <Paper sx={paperStyles}>
          <Stack gap={2}>
            {width > BREAKPOINTS.md && (
              <IconButton onClick={() => redirect(-1)} sx={{ alignSelf: 'flex-start' }}>
                <ArrowBackIcon sx={{ fontSize: 30, color: 'primary.main' }} />
              </IconButton>
            )}
            <Typography variant="h5" align="left" className="border-b-primary">
              Passwort zurücksetzen
            </Typography>
            <Typography variant="body1" align="left">
              Du hast dein Passwort vergessen? Kein Problem! Gib deine E-Mail-Adresse ein und wir
              senden dir eine E-Mail mit weiteren Anweisungen. Bitte überprüfe auch deinen
              Spam-Ordner.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <InputText
                  control={control}
                  name="email"
                  label="E-Mail-Adresse"
                  type="email"
                  placeholder="beispiel@mail.com"
                />
                <CallToAction
                  type="submit"
                  text="E-Mail senden"
                  fullWidth
                  onClick={() => handleSubmit(onSubmit)}
                />
              </Stack>
            </form>
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
