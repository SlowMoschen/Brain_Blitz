import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FilledInput,
  FilledInputProps,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import useToggle from "../../hooks/useToggle.hook";

interface InputPasswordProps extends FilledInputProps {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  showPasswordAdornment?: boolean;
}

export default function InputPassword({
  label,
  name,
  control,
  placeholder,
  showPasswordAdornment = true,
  ...rest
}: InputPasswordProps) {
  const [showPassword, toggleShowPassword] = useToggle(false);

  const type = showPassword ? "text" : "password";

  const inputStyles = {
    mt: 2,
    borderRadius: ".375rem",
  };

  const labelStyles = {
    mt: 2,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor={name} sx={labelStyles}>
            {label}
          </InputLabel>
          <FilledInput
            id={name}
            type={type}
            error={!!error}
            fullWidth
            onChange={onChange}
            value={value}
            color="accent"
            placeholder={placeholder}
            sx={inputStyles}
            endAdornment={
               showPasswordAdornment && ( <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                  sx={{ color: "text.primary" }}
                  >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment> )
            }
            {...rest}
          />
          <FormHelperText sx={{ color: "error.main", mx: 1.5, mt: .5 }}>
            {error ? error.message : null}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
