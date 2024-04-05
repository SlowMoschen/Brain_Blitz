import { Alert, Snackbar, SnackbarProps } from "@mui/material";
import { TIMES } from "../../configs/Application";

interface AlertSnackbarProps extends SnackbarProps {
  message: string;
  alertType: "success" | "error" | "info" | "warning";
}

export default function AlertSnackbar({
  message,
  alertType,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  ...rest
}: AlertSnackbarProps): JSX.Element {
  return (
    <Snackbar anchorOrigin={anchorOrigin} autoHideDuration={TIMES.SNACKBAR_DELAY} {...rest}>
      <Alert severity={alertType}>{message}</Alert>
    </Snackbar>
  );
}
