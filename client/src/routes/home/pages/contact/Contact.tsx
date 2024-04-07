import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BREAKPOINTS } from "../../../../configs/Breakpoints";
import AlertSnackbar from "../../../../shared/components/AlertSnackbar";
import InputText from "../../../../shared/components/form/InputText";
import { ContactDto, useContactFetch } from "../../../../shared/hooks/api/useContactFetch.hook";
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
  const [snackBarProps, setSnackbarProps] = useState<{
    message: string;
    alertType: "success" | "error";
  }>({
    message: "",
    alertType: "success",
  });

  const { control, handleSubmit, reset } = useForm<IContactFormInput>({
    defaultValues,
    resolver: zodResolver(ContactSchema),
  });

  const handleError = (err: string) => {
    console.error(err);
    setSnackbarProps({ message: "Es ist ein Fehler aufgetreten.", alertType: "error" });
  };
  const handleSuccess = () =>
    setSnackbarProps({
      message: "Deine Nachricht wurde erfolgreich versendet.",
      alertType: "success",
    });

  const mutation = useContactFetch(handleSuccess, handleError);

  const onSubmit = (data: IContactFormInput) => {
    mutation.mutate(data as ContactDto);
    toggleSnackbarOpen();
    reset(defaultValues);
  };

  const containerStyles = {
    p: 4,
    my: 5,
    bgcolor: "background.secondary",
    borderRadius: ".375rem",
    width: "100%",
    maxWidth: BREAKPOINTS.lg,
  };

  return (
    <>
      <Stack
        sx={{
          maxWidth: BREAKPOINTS.lg,
          width: "90%",
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
          dir gerne zur Verfügung und wird sich bemühen, so schnell wie möglich bei dir zu melden.
          Vielen Dank für deine Unterstützung!
        </Typography>
        <Box sx={containerStyles}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputText
                name="name"
                label="Name"
                control={control}
                type="text"
                placeholder="Max Mustermann"
              />
              <InputText
                name="email"
                label="E-Mail"
                control={control}
                type="text"
                placeholder="beispiel@mail.com"
              />
              <InputText
                name="message"
                label="Nachricht"
                control={control}
                type="text"
                placeholder="Deine Nachricht..."
                rows={4}
                multiline
              />
              <Typography
                variant="caption"
                sx={{ fontSize: ".7rem", lineHeight: 1.1, opacity: 0.5, my: 2 }}
              >
                Indem du dieses Kontaktformular absendest, erklärst du dich damit einverstanden,
                eine Bestätigungs-E-Mail zu erhalten. Diese E-Mail dient lediglich der Bestätigung
                des Eingangs deiner Anfrage und wird nicht für Marketingzwecke verwendet. Deine
                Daten werden gemäß unserer Datenschutzrichtlinie vertraulich behandelt.
              </Typography>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Senden
              </Button>
            </FormControl>
          </form>
        </Box>
        <AlertSnackbar
          alertType={snackBarProps.alertType}
          message={snackBarProps.message}
          open={isSnackbarOpen}
          onClose={toggleSnackbarOpen}
        />
      </Stack>
    </>
  );
}
