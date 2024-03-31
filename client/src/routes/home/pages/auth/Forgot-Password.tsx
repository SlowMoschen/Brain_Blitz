import { useState } from "react";
import Form from "../../../../shared/components/Form";
import Input from "../../../../shared/components/Input";
import useError from "../../../../shared/hooks/useError";
import { useAuth } from "../../../../shared/hooks/useAuth";
import MessageBox from "../../../../shared/components/MessageBox";
import Button from "../../../../shared/components/Button";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(): JSX.Element {
  const [error, handleError] = useError(true);
  const [success, setSuccess] = useState<boolean>(false);
  const { resetPassword } = useAuth();
  const redirect = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value.trim().toLowerCase();
    const res = await resetPassword({ email });

    if (res instanceof Error) {
      if (res.message === "Not Found") {
        handleError("Benutzer nicht gefunden. Bitte überprüfen Sie Ihre E-Mail-Adresse.");
        return;
      } else if (res.message === "Too Many Requests") {
        handleError("Zu viele Anfragen. Bitte versuchen Sie es später erneut.");
        return;
      }
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-bg-secondary py-5 px-2 m-5 my-20 rounded-lg w-11/12 max-w-5xl min-h-80 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold border-b-4 border-accent-light px-2">
          Anforderung erfolgreich
        </h1>
        <p className="text-lg mt-5">
          Wir haben dir eine E-Mail mit einem Link zum Zurücksetzen deines Passworts gesendet.
        </p>
        <Button
          onClick={() => {
            setSuccess(false);
            redirect("/auth/login");
          }}
          className="primary mt-5"
          width="250px"
        >
          Zurück zum Login
        </Button>
      </div>
    );
  } else {
    return (
      <div className="bg-bg-secondary py-5 px-2 m-5 my-20 rounded-lg w-11/12 max-w-5xl min-h-80 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold border-b-4 border-accent-light px-2 w-full">
          Passwort vergessen
        </h1>
        <p className="text-sm mt-2 px-2 w-full opacity-50">
          Bitte gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen.
        </p>
        <Form
          onSubmit={handleSubmit}
          className="mt-5 w-full flex flex-col items-center"
          btnText="Passwort zurücksetzten"
        >
          <Input
            type="email"
            name="email"
            labelContent="E-Mail-Adresse"
            placeholder="Muster@email.com"
            required
            className="text-bg-primary rounded-sm py-1 px-2 outline-none"
          />
          <MessageBox message={error} className="min-h-14 text-primary w-full" />
        </Form>
      </div>
    );
  }
}
