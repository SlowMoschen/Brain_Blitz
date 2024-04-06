import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
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
import { useAuthFetch } from "../../../shared/hooks/api/useAuthFetch.hook";
import useToggle from "../../../shared/hooks/useToggle.hook";
import { SignInSchema } from "../schemas/SignIn.schema";
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
  switch (error) {
    case "User not found":
      return "Benutzer wurde nicht gefunden.";
    case "Invalid password":
      return "Ungültiges Passwort.";
    case "Email not verified":
      return "Bitte bestätige deine E-Mail-Adresse.";
    default:
      return "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.";
  }
}

export default function SignIn() {
  const redirect = useNavigate();
  const { width } = useContext(WindowContext);
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
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

  const handleError = ({ message }: Error) => {
    setSnackbarProps({ message: getSnackbarMessage(message), alertType: "error" });
    toggleSnackbarOpen();
  };

  const handleSuccess = () => redirect(URLS.DASHBOARD);

  const { mutate, isPending } = useAuthFetch(
    handleSuccess,
    handleError,
    URLS.API_ENDPOINTS.AUTH.SIGNIN
  );

  const onSubmit = (data: ISignInFormInput) => {
    data.email = data.email.toLowerCase();
    mutate(data);
    reset(defaultValues);
  };

  return (
    <>
      {isPending && (
        <LoadingScreen />
      )}
      <Stack sx={stackStyles}>
        <Paper sx={paperStyles}>
          <Paper elevation={9} sx={imagePaperStyles}>
            <Box component={"img"} src={signin} sx={imageStyles} />
          </Paper>
          <Stack sx={{ width: { xs: "100%", md: "50%" } }} justifyContent={"flex-start"}>
          {width > BREAKPOINTS.md && (
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
      <AlertSnackbar
        alertType={snackBarProps.alertType}
        message={snackBarProps.message}
        open={isSnackbarOpen}
        onClose={toggleSnackbarOpen}
      />
    </>
  );
}
