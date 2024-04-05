import { Alert, Snackbar, SnackbarProps } from "@mui/material";
import { TIMES } from "../../configs/Application";

interface AlertSnackbarProps extends SnackbarProps {
    message: string;
    alertType: "success" | "error" | "info" | "warning";
}

export default function AlertSnackbar({ message, alertType, ...rest }: AlertSnackbarProps): JSX.Element {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={TIMES.SNACKBAR_DELAY}
            {...rest}
        >
            <Alert severity={alertType}>{message}</Alert>
        </Snackbar>
    )
}
