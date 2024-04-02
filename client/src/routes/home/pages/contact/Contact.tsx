import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import { ContactDto, useContactFetch } from "../../../../shared/hooks/api/useContactFetch";
import useToggle from "../../../../shared/hooks/useToggle";
import { TIMES } from "../../../../configs/Application";
import { formResetter } from "../../../../shared/services/formResetter";

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [error, setError] = useState<{
    name: string | null;
    email: string | null;
    message: string | null;
  }>({
    name: null,
    email: null,
    message: null,
  });
  
  const handleError = (err: string) => {
    console.error(err);
    setSnackBarMessage("Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.");
  };
  const handleSuccess = () => setSnackBarMessage("Deine Nachricht wurde erfolgreich gesendet.");
  const mutation = useContactFetch(handleSuccess, handleError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError({
        name: !name ? "Dein Name wird benötigt." : null,
        email: !email ? "Eine E-Mail wird benötigt." : null,
        message: !message ? "Eine Nachricht wird benötigt." : null,
      });
      return;
    }

    const body: ContactDto = {
      name,
      email,
      message,
    };

    mutation.mutate(body);
    toggleSnackbarOpen();
    formResetter(e, [setName, setEmail, setMessage]);
  };

  const containerStyles = {
    p: 4,
    my: 5,
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    width: "100%",
    maxWidth: BREAKPOINTS.lg,
    wordBreak: "break-all",
  };

  const inputStyles = {
    my: 2,
    borderRadius: ".375rem",
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: BREAKPOINTS.lg,
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 5,
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          textAlign={"center"}
          fontWeight={600}
          fontSize={"2rem"}
          className="border-b-accent"
        >
          Kontakt
        </Typography>
        <Typography>
          Wir freuen uns über dein Interesse an unserer Quiz-App! Bitte nutze das untenstehende
          Kontaktformular, um uns dein Feedback, Fragen oder Anliegen mitzuteilen. Unser Team steht
          dir gerne zur Verfügung und wird sich bemühen, so schnell wie möglich bei dir zu
          melden. Vielen Dank für deine Unterstützung!
        </Typography>
        <Box sx={{ ...containerStyles }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                type="text"
                name="name"
                placeholder="Max Mustermann"
                fullWidth
                sx={inputStyles}
                variant="filled"
                onChange={(e) => setName(e.target.value)}
                helperText={error.name}
                error={!!error.name}
                color="accent"
              />
              <FormLabel htmlFor="email">E-Mail</FormLabel>
              <TextField
                type="email"
                name="email"
                placeholder="beispiel@mail.com"
                fullWidth
                sx={inputStyles}
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                helperText={error.email}
                error={!!error.email}
                color="accent"
              />
              <FormLabel htmlFor="message">Nachricht</FormLabel>
              <TextField
                name="message"
                placeholder="Deine Nachricht..."
                fullWidth
                multiline
                rows={4}
                sx={inputStyles}
                variant="filled"
                onChange={(e) => setMessage(e.target.value)}
                helperText={error.message}
                error={!!error.message}
                color="accent"
              />
              <Typography
                variant="caption"
                sx={{ fontSize: ".7rem", lineHeight: 1.1, opacity: 0.5, my: 2 }}
              >
                Indem du dieses Kontaktformular absendest, erklärst du dich damit einverstanden,
                eine Bestätigungs-E-Mail zu erhalten. Diese E-Mail dient lediglich der Bestätigung
                des Eingangs deiner Anfrage und wird nicht für Marketingzwecke verwendet. Deine Daten
                werden gemäß unserer Datenschutzrichtlinie vertraulich behandelt.
              </Typography>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Senden
              </Button>
            </FormControl>
          </form>
        </Box>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={TIMES.SNACKBAR_DELAY}
          onClose={toggleSnackbarOpen}
          message={snackBarMessage}
        />
      </Box>
    </>
  );
}
