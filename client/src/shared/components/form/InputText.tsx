import { BaseTextFieldProps, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface InputTextProps extends BaseTextFieldProps {
  control: Control<any>;
  name: string;
}

export default function InputText({
  label,
  name,
  control,
  type,
  placeholder,
  ...rest
}: InputTextProps) {
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
          {...rest}
        />
      )}
    />
  );
}
