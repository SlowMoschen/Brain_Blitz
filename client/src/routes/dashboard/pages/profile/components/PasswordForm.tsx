import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertSnackbar from "../../../../../shared/components/AlertSnackbar";
import CallToAction from "../../../../../shared/components/buttons/CallToAction";
import SecondaryButton from "../../../../../shared/components/buttons/SecondaryButton";
import InputPassword from "../../../../../shared/components/form/InputPassword";
import { useAuthQueries } from "../../../../../shared/hooks/api/useAuthQueries.hook";
import { useUserIdContext } from "../../../../../shared/hooks/context/useUserIdContext.hook";
import useToggle from "../../../../../shared/hooks/useToggle.hook";
import { PasswordChangeSchema } from "../schemas/PasswordChange.schema";

interface IPasswordChangeInput {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

const defaultValues: IPasswordChangeInput = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

export default function PasswordForm() {
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isSnackbarOpen, toggleSnackbarOpen] = useToggle(false);
  const { userID } = useUserIdContext();
  const [snackBarProps, setSnackbarProps] = useState<{
    message: string;
    alertType: "success" | "error";
  }>({
    message: "",
    alertType: "success",
  });

  const { control, handleSubmit, reset } = useForm<IPasswordChangeInput>({
    defaultValues,
    resolver: zodResolver(PasswordChangeSchema),
  });

  const onSuccess = () => {
    setSnackbarProps({
      message: "Passwort wurde erfolgreich aktualisiert",
      alertType: "success",
    });
    toggleSnackbarOpen();
    setIsFormDisabled(true);
    reset(defaultValues);
  };

  const onError = (error: string) => {
    setSnackbarProps({
      message: error,
      alertType: "error",
    });
    toggleSnackbarOpen();
  };

  const { mutate: updatePassword } = useAuthQueries().useResetPassword(onSuccess, onError);
  const { mutate: logout } = useAuthQueries().useLogout();

  const onSubmit = (data: IPasswordChangeInput) => {
    if (data.old_password === data.new_password) {
      onError("Das neue Passwort darf nicht dem alten Passwort entsprechen.");
      return;
    }

    updatePassword({
      userID,
      password: data.new_password,
    });

    setTimeout(() => {
      logout(undefined);
    }, 1000);
  };

  return (
    <Stack my={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" pl={2}>
          Passwort ändern
        </Typography>
        <Grid container spacing={1} p={2}>
          <Grid item xs={12} sm={6}>
            <InputPassword
              control={control}
              name="old_password"
              label="Altes Passwort"
              placeholder="Altes Passwort"
              showPasswordAdornment={false}
              disabled={isFormDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputPassword
              control={control}
              name="new_password"
              label="Neues Passwort"
              placeholder="Neues Passwort"
              showPasswordAdornment={false}
              disabled={isFormDisabled}
            />
          </Grid>
          <Grid item xs={12}>
            <InputPassword
              control={control}
              name="confirm_new_password"
              label="Neues Passwort bestätigen"
              placeholder="Neues Passwort bestätigen"
              showPasswordAdornment={false}
              disabled={isFormDisabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              Solltest du dein Passwort ändern, musst du dich erneut anmelden.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {isFormDisabled ? (
              <SecondaryButton
                text="Passwort ändern"
                type="button"
                onClick={() => setIsFormDisabled(false)}
              />
            ) : (
              <>
                <CallToAction text="Speichern" type="submit" />
                <IconButton onClick={() => setIsFormDisabled(true)}>
                  <CloseIcon sx={{ color: "primary.main" }} />
                  <Typography variant="caption" sx={{ color: "text.main" }}>
                    Abbrechen
                  </Typography>
                </IconButton>
              </>
            )}
          </Grid>
        </Grid>
      </form>
      <AlertSnackbar
        open={isSnackbarOpen}
        onClose={toggleSnackbarOpen}
        message={snackBarProps.message}
        alertType={snackBarProps.alertType}
      />
    </Stack>
  );
}
