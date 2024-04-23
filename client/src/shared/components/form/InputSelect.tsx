import { BaseSelectProps, FormHelperText, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface InputSelectProps extends BaseSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  options: string[];
    helperText?: string;
}

export default function InputSelect({ control, name, label, options, helperText,  ...rest }: InputSelectProps) {
  const styles = {
    color: "text.main",
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Select
            value={value}
            onChange={onChange}
            error={!!error}
            label={label}
            fullWidth
            variant="filled"
            {...rest}
            defaultValue={options[0]}
            sx={styles}
            MenuProps={{
              MenuListProps: {
                sx: {
                  color: "text.main",
                  bgcolor: "background.secondary",
                },
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ pl: 1}}>{error?.message || helperText}</FormHelperText>
        </>
      )}
    />
  );
}
