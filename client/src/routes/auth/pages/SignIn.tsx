import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import signin from "../../../assets/signin.svg";
import { BREAKPOINTS } from "../../../configs/Breakpoints";
import { URLS } from "../../../configs/Links";
import AlertSnackbar from "../../../shared/components/AlertSnackbar";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import ServerStatus from "../../../shared/components/ServerStatus";
import { WindowContext } from "../../../shared/context/ScreenSize.context";
import { useAuthQuery } from "../../../shared/hooks/api/useAuthQuery.hook";
import useToggle from "../../../shared/hooks/useToggle.hook";
import AuthForm from "./AuthForm";
import { imagePaperStyles, imageStyles, paperStyles, stackStyles } from "./styles/SignIn.styles";

interface ISignInFormInput {
  email: string;
  password: string;
}

const defaultValues: ISignInFormInput = {
  email: "",
  password: "",
};

function getSnackbarMessage(error: string) {
  if (error.includes("Too Many Requests"))
    return "Die Verifizierungsmail wurde bereits gesendet. Bitte überprüfe deinen Posteingang.";
  if (error.includes("User not found"))
    return "Der Benutzer wurde nicht gefunden. Bitte registriere dich erneut.";
  if (error.includes("Invalid password")) return "Ungültiges Passwort.";
  if (error.includes("Email not verified")) return "Bitte bestätige deine E-Mail-Adresse.";

  return "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.";
}

export default function SignIn() {
  const redirect = useNavigate();
  const { width } = useContext(WindowContext);
  const isDesktop = width > BREAKPOINTS.md;
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const { isPending: isAuthPending, mutate: checkAuthStatus } = useAuthQuery({ type: "SESSION" })
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

  const handleSuccess = () => redirect(URLS.DASHBOARD);

  useEffect(() => {
    checkAuthStatus(undefined);
  }, []);

  return (
    <>
      {isAuthPending && <LoadingScreen />}
      <Stack sx={stackStyles}>
        <Paper sx={paperStyles}>
          <Paper elevation={9} sx={imagePaperStyles}>
            <Box component={"img"} src={signin} sx={imageStyles} />
          </Paper>
          <Stack sx={{ width: { xs: "100%", md: "50%" } }} justifyContent={"flex-start"}>
            {isDesktop && (
              <Link href={URLS.HOME} underline="hover" sx={{ alignSelf: "start" }}>
                <ArrowBackIcon sx={{ fontSize: 30 }} />
              </Link>
            )}
            <Typography variant="h4" align="center" className="border-b-primary">
              Willkommen zurück!
            </Typography>
            <Typography variant="body1" align="center">
              Bitte melde dich an, um fortzufahren.
            </Typography>
            <AuthForm
              type="SIGN_IN"
              defaultInput={defaultValues}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </Stack>
        </Paper>
      </Stack>
      <ServerStatus size="small" direction={isDesktop ? 'row' : 'column'}/>
      <AlertSnackbar
        alertType={snackBarProps.alertType}
        message={snackBarProps.message}
        open={isSnackbarOpen}
        onClose={toggleSnackbarOpen}
      />
    </>
  );
}
