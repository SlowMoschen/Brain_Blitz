import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import signin from "../../../assets/signin.svg";
import { BREAKPOINTS } from "../../../configs/Breakpoints";
import { URLS } from "../../../configs/Links";
import AlertSnackbar from "../../../shared/components/AlertSnackbar";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CallToAction from "../../../shared/components/buttons/CallToAction";
import RouterButton from "../../../shared/components/buttons/RouterButton";
import InputPassword from "../../../shared/components/form/InputPassword";
import InputText from "../../../shared/components/form/InputText";
import { WindowContext } from "../../../shared/context/ScreenSize.context";
import { useAuthQueries } from "../../../shared/hooks/api/useAuthQueries.hook";
import useToggle from "../../../shared/hooks/useToggle.hook";
import { SignInSchema } from "../schemas/SignIn.schema";
import { imagePaperStyles, imageStyles, paperStyles, stackStyles } from "./styles/SignIn.styles";
import { formatValue } from "../../../shared/services/ValueFormatter.service";
import ServerStatus from "../../../shared/components/ServerStatus";

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
  const { isAuthenticated, isPending: isAuthPending } = useAuthQueries().useSessionCheck();
  const [snackBarProps, setSnackbarProps] = useState<{
    message: string;
    alertType: "success" | "error";
  }>({
    message: "",
    alertType: "success",
  });
  const { control, handleSubmit, reset } = useForm<ISignInFormInput>({
    defaultValues,
    resolver: zodResolver(SignInSchema),
  });

  const handleError = (error: string) => {
    setSnackbarProps({ message: getSnackbarMessage(error), alertType: "error" });
    toggleSnackbarOpen();
  };

  const handleSuccess = () => redirect(URLS.DASHBOARD);

  const { mutate, isPending: isSignInPending } = useAuthQueries().useSignIn(
    handleSuccess,
    handleError
  );

  const onSubmit = (data: ISignInFormInput) => {
    data.email = formatValue(data.email, ["trim", "lowerCase"]);
    mutate(data);
    reset(defaultValues);
  };

  useEffect(() => {
    if (isAuthenticated) redirect(URLS.DASHBOARD);
  }, [isAuthenticated]);

  return (
    <>
      {isSignInPending || (isAuthPending && <LoadingScreen />)}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputText
                label="E-Mail"
                type="email"
                control={control}
                name="email"
                placeholder="beispiel@email.com"
              />
              <InputPassword
                label="Passwort"
                control={control}
                name="password"
                placeholder="●●●●●●●●"
              />
              <Stack mt={2} alignItems={"flex-start"}>
                <RouterButton
                  to={URLS.SIGNUP}
                  variant="text"
                  color="primary"
                  text="Noch kein Konto?"
                />
                <RouterButton
                  to={URLS.FORGOT_PASSWORD}
                  variant="text"
                  color="primary"
                  text="Passwort vergessen?"
                />
              </Stack>
              <CallToAction text="Anmelden" type="submit" fullWidth />
            </form>
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
