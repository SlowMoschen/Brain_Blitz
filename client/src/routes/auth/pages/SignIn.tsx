import {
  Box,
  FilledInput,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import useToggle from "../../../shared/hooks/useToggle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CallToAction from "../../../shared/components/buttons/CallToAction";

export default function SignIn() {
  const [showPassword, setShowPassword] = useToggle(false);

  return (
    <Box sx={{ bgcolor: "background.secondary" }}>
        <Typography variant="h4" className="border-b-accent">Einloggen</Typography>
      <form action="">
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            type="email"
            variant="filled"
            placeholder="beispiel@mail.com"
            color="accent"
          />
          <FormLabel htmlFor="password">Passwort</FormLabel>
          <FilledInput
            type={showPassword ? "text" : "password"}
            placeholder="Passwort"
            color="accent"
            endAdornment={
              <IconButton onClick={setShowPassword}>
                {showPassword ? (
                  <VisibilityOff sx={{ color: "text.primary" }} />
                ) : (
                  <Visibility sx={{ color: "text.primary" }} />
                )}
              </IconButton>
            }
          />
          <CallToAction text="Einloggen" />
        </FormControl>
      </form>
    </Box>
  );
}
