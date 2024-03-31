import useError from "../../../../shared/hooks/useError";
import MessageBox from "../../../../shared/components/MessageBox";
import Input from "../../../../shared/components/Input";
import { useState } from "react";
import { useAuth } from "../../../../shared/hooks/useAuth";
import Form from "../../../../shared/components/Form";

export default function ResendVerification(): JSX.Element {
  const [error, handleError] = useError(true);
  const [success, setSuccess] = useState<boolean>(false);
  const { resendVerification } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value.trim().toLowerCase();
    const res = await resendVerification({ email });

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
          E-Mail wurde erfolgreich gesendet
        </h1>
        <p className="text-lg mt-5">
          Wir haben dir eine E-Mail mit einem Link zum Bestätigen deiner E-Mail-Adresse gesendet.
        </p>
      </div>
    );
  } else {
    return (
      <div className="bg-bg-secondary py-5 px-2 m-5 my-20 rounded-lg w-11/12 max-w-5xl min-h-80 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold border-b-4 border-accent-light px-2 w-full">
          Verifizierungs E-Mail erneut senden
        </h1>
        <p className="text-sm w-full mt-2 px-2 opacity-50">
          Du hast keine E-Mail erhalten oder hast zu lange gewartet? Kein Problem! Trage deine E-Mail-Adresse ein und wir senden dir eine neue E-Mail.
        </p>
        <Form
          onSubmit={handleSubmit}
          className="mt-5 w-full flex flex-col items-center"
          btnText="Senden"
        >
          <Input
            type="email"
            name="email"
            className="text-bg-primary rounded-sm py-1 px-2 outline-none"
            placeholder="E-Mail-Adresse"
            labelContent="E-Mail-Adresse"
            required
          />
          <MessageBox message={error} className="min-h-14 text-primary w-full" />
        </Form>
      </div>
    );
  }
}
