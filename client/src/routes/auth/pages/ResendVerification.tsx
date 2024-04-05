import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Backdrop, CircularProgress, Link, Paper, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BREAKPOINTS } from "../../../configs/Breakpoints";
import { URLS } from "../../../configs/Links";
import AlertSnackbar from "../../../shared/components/AlertSnackbar";
import CallToAction from "../../../shared/components/buttons/CallToAction";
import InputText from "../../../shared/components/form/InputText";
import { WindowContext } from "../../../shared/context/ScreenSize.context";
import { useAuthFetch } from "../../../shared/hooks/api/useAuthFetch.hook";
import useToggle from "../../../shared/hooks/useToggle.hook";
import { EmailSchema } from "../schemas/Email.schema";
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

  return "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.";
}

export default function ResendVerification() {
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
  const { control, handleSubmit, reset } = useForm<IResendFormInput>({
    defaultValues,
    resolver: zodResolver(EmailSchema),
  });

  const handleError = ({ message }: Error) => {
    setSnackbarProps({ message: getSnackbarMessage(message), alertType: "error" });
    toggleSnackbarOpen();
  };

  const handleSuccess = () => setWasSuccessful(true);

  const { mutate, isPending } = useAuthFetch(
    handleSuccess,
    handleError,
    URLS.API_ENDPOINTS.AUTH.RESEND_VERIFICATION_EMAIL
  );

  const onSubmit = (data: IResendFormInput) => {
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
          to: URLS.API_ENDPOINTS.AUTH.SIGNIN,
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
          {width > BREAKPOINTS.md && (
            <Link href={URLS.HOME} underline="hover" sx={{ alignSelf: "flex-start" }}>
              <ArrowBackIcon sx={{ fontSize: 30 }} />
            </Link>
          )}
          <Typography variant="h5" align="left" className="border-b-primary">
            Verifizierungsmail erneut senden
          </Typography>
          <Typography variant="body1" align="left">
            Bitte gib deine E-Mail-Adresse ein, um erneut eine Verifizierungsmail zu erhalten.
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
                text="Verifizierungsmail senden"
                fullWidth
                onClick={() => handleSubmit(onSubmit)}
              />
            </Stack>
          </form>
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
