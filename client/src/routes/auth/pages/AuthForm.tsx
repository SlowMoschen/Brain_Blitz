import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../schemas/SignIn.schema";
import { EmailSchema } from "../schemas/Email.schema";
import { SignUpSchema } from "../schemas/SignUp.schema";
import { useAuthQueries } from "../../../shared/hooks/api/useAuthQueries.hook";
import InputText from "../../../shared/components/form/InputText";
import InputPassword from "../../../shared/components/form/InputPassword";
import CallToAction from "../../../shared/components/buttons/CallToAction";
import { Stack, Typography } from "@mui/material";
import RouterButton from "../../../shared/components/buttons/RouterButton";
import { URLS } from "../../../configs/Links";

interface IFormInput {
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  confirm_password?: string;
}

export type AuthFormType = keyof typeof URLS.API_ENDPOINTS.AUTH;

interface AuthFormProps {
  type: AuthFormType;
  defaultInput: IFormInput;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function AuthForm({ type, defaultInput, onError, onSuccess }: AuthFormProps) {
  const schema =
    type === "SIGN_IN" ? SignInSchema : type === "SIGN_UP" ? SignUpSchema : EmailSchema;

  const { handleSubmit, control, reset } = useForm<IFormInput>({
    defaultValues: defaultInput,
    resolver: zodResolver(schema),
  });

  const onSuccessfulSubmit = () => {
    reset();
    onSuccess();
  };

  const onFailedSubmit = (error: string) => {
    onError(error);
    reset();
  };

  const { mutate, isPending } = useAuthQueries({
    type,
    onSuccess: onSuccessfulSubmit,
    onError: onFailedSubmit,
  });

  const onSubmit = (data: IFormInput) => {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let element = data[key as keyof IFormInput];
        if (!element) continue;

        element = element.trim();
        if (key === "email" || key.includes("name")) {
          element = element.toLowerCase();
        }

        data[key as keyof IFormInput] = element;
      }
    }

    mutate(data);
  };

  const linkStyles = {
    color: "primary.main",
    textDecoration: "underline",
    m: 0,
    p: 0,
    fontSize: 12,
    textTransform: "none",
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "SIGN_UP" && (
          <>
            <Stack gap={1} flexDirection={{ xs: "column", md: "row" }}>
              <InputText
                label="Vorname"
                name="first_name"
                control={control}
                type="text"
                placeholder="Max"
              />
              <InputText
                label="Nachname"
                name="last_name"
                control={control}
                type="text"
                placeholder="Mustermann"
              />
            </Stack>
          </>
        )}

        <InputText
          label="E-Mail"
          name="email"
          control={control}
          type="email"
          placeholder="beispiel@mail.com"
        />

        {type === "SIGN_UP" || type === "SIGN_IN" ? (
          <InputPassword
            label="Passwort"
            name="password"
            control={control}
            placeholder="●●●●●●●●"
          />
        ) : null}

        {type === "SIGN_UP" ? (
          <InputPassword
            label="Passwort bestätigen"
            name="confirm_password"
            control={control}
            placeholder="●●●●●●●●"
            showPasswordAdornment={false}
          />
        ) : null}

        {type === "SIGN_IN" ? (
          <Stack mt={2} alignItems={"flex-start"}>
            <RouterButton to={URLS.SIGNUP} variant="text" color="primary" text="Noch kein Konto?" />
            <RouterButton
              to={URLS.FORGOT_PASSWORD}
              variant="text"
              color="primary"
              text="Passwort vergessen?"
            />
          </Stack>
        ) : type === "SIGN_UP" ? (
          <>
            <Stack mt={2} alignItems={"flex-start"}>
              <RouterButton
                to={URLS.SIGNIN}
                variant="text"
                color="primary"
                text="Bereits ein Konto?"
              />
            </Stack>
            <Typography variant="body2" my={2} px={1} fontSize={12}>
              Mit dem Klicken auf „Anmelden“ stimmst du unseren{" "}
              <RouterButton
                to={URLS.TERMS_AND_CONDITIONS}
                variant="text"
                sx={linkStyles}
                text="Nutzungsbedingungen"
                color="primary"
              />{" "}
              und{" "}
              <RouterButton
                to={URLS.PRIVACY}
                variant="text"
                sx={linkStyles}
                text="Datenschutzrichtlinien"
                color="primary"
              />{" "}
              zu.
            </Typography>
          </>
        ) : null}

        <CallToAction
          type="submit"
          disabled={isPending}
          text={
            type === "SIGN_IN"
              ? "Anmelden"
              : type === "SIGN_UP"
              ? "Registrieren"
              : type === "FORGOT_PASSWORD"
              ? "Passwort zurücksetzen"
              : "Email senden"
          }
          fullWidth
        />
      </form>
    </>
  );
}
