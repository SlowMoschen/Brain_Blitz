import { zodResolver } from "@hookform/resolvers/zod";
import { Backdrop, Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import signup from "../../../assets/signup.svg";
import { URLS } from "../../../configs/Links";
import AlertSnackbar from "../../../shared/components/AlertSnackbar";
import CallToAction from "../../../shared/components/buttons/CallToAction";
import RouterButton from "../../../shared/components/buttons/RouterButton";
import InputPassword from "../../../shared/components/form/InputPassword";
import InputText from "../../../shared/components/form/InputText";
import { useAuthFetch } from "../../../shared/hooks/api/useAuthFetch.hook";
import useToggle from "../../../shared/hooks/useToggle.hook";
import { SignUpSchema } from "../schemas/SignUp.schema";
import SuccessScreen from "./SuccessScreen";
import { imagePaperStyles, imageStyles, paperStyles, stackStyles } from "./styles/SignUp.styles";

interface ISignUpFormInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const defaultValues: ISignUpFormInput = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

function getSnackbarMessage(error: string) {
  if (error.includes("existiert bereits")) {
    return "Ein Konto mit dieser E-Mail-Adresse existiert bereits. Bitte melde dich an oder wähle eine andere E-Mail-Adresse.";
  }

  return "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.";
}

export default function SignUp() {
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [snackBarProps, setSnackbarProps] = useState<{
    message: string;
    alertType: "success" | "error";
  }>({
    message: "",
    alertType: "success",
  });
  const { control, handleSubmit, reset } = useForm<ISignUpFormInput>({
    defaultValues,
    resolver: zodResolver(SignUpSchema),
  });

  const handleError = ({ message }: Error) => {
    console.log(message);
    setSnackbarProps({ message: getSnackbarMessage(message), alertType: "error" });
    toggleSnackbarOpen();
  };

  const handleSuccess = () => setWasSuccessful(true);

  const { mutate, isPending } = useAuthFetch(
    handleSuccess,
    handleError,
    URLS.API_ENDPOINTS.AUTH.SIGNUP
  );

  const onSubmit = (data: ISignUpFormInput) => {
    data.email = data.email.toLowerCase();
    mutate(data);
    reset(defaultValues);
  };

  if (wasSuccessful) {
    return (
      <SuccessScreen
        title="Erfolgreich registriert!"
        text="Du hast dich erfolgreich registriert. Bitte überprüfe deine E-Mails, um deine E-Mail-Adresse zu bestätigen."
        button={{ text: "Zurück zur Startseite", to: URLS.HOME }}
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
      <Stack sx={stackStyles} minHeight={"1000px"}>
        <Paper sx={paperStyles}>
          <Paper elevation={9} sx={imagePaperStyles}>
            <Box component={"img"} src={signup} sx={imageStyles} />
          </Paper>
          <Stack
            sx={{ width: { xs: "100%", md: "50%" }, height: "100%" }}
            justifyContent={'center'}
          >
            <Typography variant="h4" align="center" className="border-b-primary">
              Herzlich Willkommen!
            </Typography>
            <Typography variant="body1" align="center">
              Erstelle ein Konto, um fortzufahren.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={1} flexDirection={{ xs: "column", md: "row" }}>
                <InputText
                  label="Vorname"
                  control={control}
                  name="first_name"
                  placeholder="Max"
                  type="text"
                />
                <InputText
                  label="Nachname"
                  control={control}
                  name="last_name"
                  placeholder="Mustermann"
                  type="text"
                />
              </Stack>
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
              <InputPassword
                label="Passwort bestätigen"
                control={control}
                name="confirm_password"
                placeholder="●●●●●●●●"
                showPasswordAdornment={false}
              />
              <Stack mt={2} alignItems={"flex-start"}>
                <RouterButton
                  to={URLS.SIGNIN}
                  variant="text"
                  color="primary"
                  text="Bereits ein Konto?"
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
