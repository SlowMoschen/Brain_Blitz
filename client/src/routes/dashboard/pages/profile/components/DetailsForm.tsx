import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import AlertSnackbar from "../../../../../shared/components/AlertSnackbar";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../../shared/components/buttons/SecondaryButton";
import InputText from "../../../../../shared/components/form/InputText";
import { useUserQueries } from "../../../../../shared/hooks/api/useUserQueries.hook";
import useToggle from "../../../../../shared/hooks/useToggle.hook";
import { UserContext } from "../../../../../shared/types/User";
import { ProfileDetailsSchema } from "../schemas/ProfileDetails.schema";
import { formatValue } from "../../../../../shared/services/ValueFormatter.service";

interface IDetailsFormInput {
  first_name: string;
  last_name: string;
  email?: string;
}

// This function is used to get the error message when updating the profile fails.
function getErrorMessage(error: string) {
  if (error.includes("Email already exists")) {
    return "E-Mail-Adresse bereits vergeben";
  }
  return "Fehler beim Aktualisieren des Profils";
}

/**
 * @description This component is used to display the details form of the user profile.
 */
export default function DetailsForm() {
  const { user } = useOutletContext<UserContext>();
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const [snackBarProps, setSnackbarProps] = useState<{
    message: string;
    alertType: "success" | "error";
  }>({
    message: "",
    alertType: "success",
  });

  const defaultValues: IDetailsFormInput = {
    first_name: formatValue(user.first_name, ["capitalize"]),
    last_name: formatValue(user.last_name, ["capitalize"]),
    email: user.email,
  };

  const onSucces = () => {
    setSnackbarProps({
      message: "Profil wurde erfolgreich aktualisiert",
      alertType: "success",
    });
    toggleSnackbarOpen();
  };

  const onError = (error: string) => {
    setSnackbarProps({
      message: getErrorMessage(error),
      alertType: "error",
    });
    toggleSnackbarOpen();
  };

  const { mutate: updateUser } = useUserQueries().useUpdateUser(onSucces, onError);
  const { control, handleSubmit, reset } = useForm<IDetailsFormInput>({
    defaultValues,
    resolver: zodResolver(ProfileDetailsSchema),
  });

  const onSubmit = async (data: IDetailsFormInput) => {
    // if the user has not changed any data, the form should not be submitted
    if (
      data.email === user.email &&
      data.first_name === user.first_name &&
      data.last_name === user.last_name
    ) {
      setIsFormDisabled(true);
      return;
    }

    if ("email" in data) {
      data.email = data.email?.toLowerCase();
      if (data.email === user.email) delete data.email;
    }
    updateUser(data);
    reset(defaultValues);
    setIsFormDisabled(true);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [user]);

  return (
    <Stack my={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" pl={2}>
          Persönliche Daten
        </Typography>
        <Grid container spacing={1} p={2}>
          <Grid item xs={12} sm={6}>
            <InputText
              control={control}
              name="first_name"
              label="Vorname"
              disabled={isFormDisabled}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              control={control}
              name="last_name"
              label="Nachname"
              disabled={isFormDisabled}
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <InputText
              control={control}
              name="email"
              label="E-Mail"
              disabled={isFormDisabled}
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              Solltest du deine E-Mail-Adresse ändern, musst du diese erneut bestätigen.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {isFormDisabled ? (
              <SecondaryButton text="Bearbeiten" onClick={() => setIsFormDisabled(false)} />
            ) : (
              <CallToAction text="Speichern" type="submit" />
            )}
          </Grid>
        </Grid>
      </form>
      <AlertSnackbar
        alertType={snackBarProps.alertType}
        message={snackBarProps.message}
        open={isSnackbarOpen}
        onClose={toggleSnackbarOpen}
      />
    </Stack>
  );
}
