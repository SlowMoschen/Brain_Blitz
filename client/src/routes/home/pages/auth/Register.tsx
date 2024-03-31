import MessageBox from "../../../../shared/components/MessageBox";
import Input from "../../../../shared/components/Input";
import Form from "../../../../shared/components/Form";
import useError from "../../../../shared/hooks/useError";
import useScreenSize from "../../../../shared/hooks/useScreenSize";
import clsx from "clsx";
import { BREAKPOINTS } from "../../../../shared/constants/breakpoints";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { ValidationService } from "../../../../shared/services/validationService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../../shared/components/Button";

export default function Register(): JSX.Element {
  const [error, handleError] = useError(true);
  const [success, setSuccess] = useState<boolean>(false);
  const { register } = useAuth();
  const screenSize = useScreenSize();
  const redirect = useNavigate();

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const first_name = e.currentTarget.first_name.value.trim().toLowerCase();
    const last_name = e.currentTarget.last_name.value.trim().toLowerCase();
    const email = e.currentTarget.email.value.trim().toLowerCase();
    const password = e.currentTarget.password.value.trim();
    const confirm_password = e.currentTarget.confirm_password.value.trim();

    if (password !== confirm_password) {
        e.currentTarget.password.value = "";
        e.currentTarget.confirm_password.value = "";
        handleError("Passwörter stimmen nicht überein.");
      return;
    }

    try {
      await ValidationService.validate(first_name, ["isRequired"]);
      await ValidationService.validate(last_name, ["isRequired"]);
      await ValidationService.validate(email, ["isRequired", "isEmail"]);
      await ValidationService.validate(password, ["isRequired", "minLen", "maxLen", "isPassword"]);

      const res = await register({ first_name, last_name, email, password });
      if (res instanceof Error) throw res;

      setSuccess(true);
      scrollTo(0, 0);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        handleError(error.message);
      }
    }
  };

  if (success) {
    return (
      <div className="bg-bg-secondary py-5 px-2 m-5 my-10 rounded-lg w-11/12 max-w-5xl min-h-60 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold border-b-4 border-accent-light px-2">
          Anmeldung erfolgreich
        </h1>
        <p className="mt-2 px-2">
          Du hast dich erfolgreich angemeldet. Bitte überprüfe deine E-Mails, um deine Anmeldung zu
          bestätigen.
        </p>
        <Button
          onClick={() => {
            setSuccess(false);
            redirect("/auth/login");
          }}
          className="primary mt-5"
        >
          Zum Login
        </Button>
      </div>
    );
  } else {
    return (
      <>
        <Form
          onSubmit={(e) => handleSumbit(e)}
          className="bg-bg-secondary py-5 px-2 m-5 my-10 rounded-lg w-11/12 max-w-5xl flex flex-col items-center"
          btnText="Anmelden"
        >
          <h1 className="text-3xl font-bold border-b-4 border-accent-light w-full px-2">
            Anmelden
          </h1>
          <p className="text-sm mt-2 px-2 opacity-50 w-full">
            Willkommen bei uns 👋! Melde dich hier kostenlos und unverbindlich an.
          </p>
          <div
            className={clsx(
              screenSize.width <= BREAKPOINTS.sm
                ? "flex flex-col w-full"
                : "flex w-full justify-between"
            )}
          >
            <Input
              type="text"
              placeholder="Vorname"
              className="text-bg-primary rounded-sm py-1 px-2 outline-none"
              name="first_name"
              labelContent="Vorname"
              required
            />
            <Input
              type="text"
              placeholder="Nachname"
              className="text-bg-primary rounded-sm py-1 px-2 outline-none"
              name="last_name"
              labelContent="Nachname"
              required
            />
          </div>
          <Input
            type="email"
            placeholder="Muster@email.com"
            className="text-bg-primary rounded-sm py-1 px-2 outline-none"
            name="email"
            required
          />
          <div
            className={clsx(
              screenSize.width <= BREAKPOINTS.sm
                ? "flex flex-col w-full"
                : "flex w-full justify-between"
            )}
          >
            <Input
              type="password"
              placeholder="min. 8 Zeichen"
              className="text-bg-primary rounded-sm py-1 px-2 outline-none"
              name="password"
              passwordToggle
              required
            />
            <Input
              type="password"
              placeholder="Passwort wiederholen"
              className="text-bg-primary rounded-sm py-1 px-2 outline-none"
              name="confirm_password"
              labelContent="Passwort wiederholen"
              required
            />
          </div>
          <div className="my-3 w-full">
            <p className="text-sm px-2 mt-1 w-full">
              Hast du schon einen Account?{" "}
              <a href="/auth/login" className="text-primary underline">
                Login
              </a>
            </p>
          </div>
          <MessageBox message={error} className="min-h-11 text-primary" />
        </Form>
      </>
    );
  }
}
