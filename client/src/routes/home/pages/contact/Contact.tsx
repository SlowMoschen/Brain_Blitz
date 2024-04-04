import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  Snackbar,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TIMES } from "../../../../configs/Application";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import InputText from "../../../../shared/components/form/InputText";
import {
  ContactDto,
  useContactFetch,
} from "../../../../shared/hooks/api/useContactFetch.hook";
import useToggle from "../../../../shared/hooks/useToggle.hook";
import { ContactSchema } from "./contact.schema";

interface IContactFormInput {
  name: string;
  email: string;
  message: string;
}

const defaultValues: IContactFormInput = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  const { control, handleSubmit, reset } = useForm<IContactFormInput>({
    defaultValues,
    resolver: zodResolver(ContactSchema),
  });

  const handleError = (err: string) => {
    console.error(err);
    setSnackBarMessage(
      "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut."
    );
  };
  const handleSuccess = () =>
    setSnackBarMessage("Deine Nachricht wurde erfolgreich gesendet.");
  const mutation = useContactFetch(handleSuccess, handleError);

  const onSubmit = (data: IContactFormInput) => {
    console.log(data);
    mutation.mutate(data as ContactDto);
    reset(defaultValues);
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
          Wir freuen uns über dein Interesse an unserer Quiz-App! Bitte nutze
          das untenstehende Kontaktformular, um uns dein Feedback, Fragen oder
          Anliegen mitzuteilen. Unser Team steht dir gerne zur Verfügung und
          wird sich bemühen, so schnell wie möglich bei dir zu melden. Vielen
          Dank für deine Unterstützung!
        </Typography>
        <Box sx={{ ...containerStyles }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputText
                name="name"
                label="Name"
                control={control}
                type="text"
                placeholder="Max Mustermann"
                sx={inputStyles}
              />
              <InputText
                name="email"
                label="E-Mail"
                control={control}
                type="text"
                placeholder="beispiel@mail.com"
                sx={inputStyles}
              />
              <InputText
                name="message"
                label="Nachricht"
                control={control}
                type="text"
                placeholder="Deine Nachricht..."
                sx={inputStyles}
                rows={4}
                multiline
              />
              <Typography
                variant="caption"
                sx={{ fontSize: ".7rem", lineHeight: 1.1, opacity: 0.5, my: 2 }}
              >
                Indem du dieses Kontaktformular absendest, erklärst du dich
                damit einverstanden, eine Bestätigungs-E-Mail zu erhalten. Diese
                E-Mail dient lediglich der Bestätigung des Eingangs deiner
                Anfrage und wird nicht für Marketingzwecke verwendet. Deine
                Daten werden gemäß unserer Datenschutzrichtlinie vertraulich
                behandelt.
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
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
