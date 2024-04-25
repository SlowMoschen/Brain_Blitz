import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import signup from "../../../assets/signup.svg";
import { BREAKPOINTS } from "../../../configs/Breakpoints";
import { URLS } from "../../../configs/Links";
import AlertSnackbar from "../../../shared/components/AlertSnackbar";
import { WindowContext } from "../../../shared/context/ScreenSize.context";
import useToggle from "../../../shared/hooks/useToggle.hook";
import AuthForm from "./AuthForm";
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
  const { width } = useContext(WindowContext);
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);
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

  if (wasSuccessful) {
    return (
      <SuccessScreen
        title="Erfolgreich registriert!"
        text="Bitte überprüfe deine E-Mails, um deine E-Mail-Adresse zu bestätigen."
        caption="Checke auch deinen Spam-Ordner."
        button={{ text: "Zurück zur Startseite", to: URLS.HOME }}
      />
    );
  }

  return (
    <>
      <Stack sx={stackStyles} minHeight={"1000px"}>
        <Paper sx={paperStyles}>
          <Paper elevation={9} sx={imagePaperStyles}>
            <Box component={"img"} src={signup} sx={imageStyles} />
          </Paper>
          <Stack
            sx={{ width: { xs: "100%", md: "50%" }, height: "100%" }}
            justifyContent={"center"}
          >
            {width > BREAKPOINTS.md && (
              <Link href={URLS.HOME} underline="hover" sx={{ alignSelf: "start" }}>
                <ArrowBackIcon sx={{ fontSize: 30 }} />
              </Link>
            )}
            <Typography variant="h4" align="center" className="border-b-primary">
              Herzlich Willkommen!
            </Typography>
            <Typography variant="body1" align="center">
              Erstelle ein Konto, um fortzufahren.
            </Typography>
            <AuthForm
              type="SIGN_UP"
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
