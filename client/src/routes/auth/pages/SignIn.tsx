import {
  Paper,
  Typography
} from "@mui/material";

export default function SignIn() {

  return (
    <Paper sx={{ bgcolor: "background.secondary" }}>
        <Typography variant="h4" className="border-b-accent">Einloggen</Typography>
    </Paper>
  );
}
