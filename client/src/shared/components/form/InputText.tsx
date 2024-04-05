import { BaseTextFieldProps, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface InputTextProps extends BaseTextFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  type: 'text' | 'email' | 'tel';
}

export default function InputText({
  label,
  name,
  control,
  type,
  placeholder,
  ...rest
}: InputTextProps) {

  const inputStyles = {
    my: 2,
    borderRadius: ".375rem",
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type}
          helperText={error ? error.message : null}
          error={!!error}
          label={label}
          fullWidth
          variant="filled"
          onChange={onChange}
          value={value}
          color="accent"
          placeholder={placeholder}
          sx={inputStyles}
          {...rest}
        />
      )}
    />
  );
}
