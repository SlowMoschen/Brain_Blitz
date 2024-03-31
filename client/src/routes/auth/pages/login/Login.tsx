import { useNavigate } from "react-router-dom";
import Form from "../../../../shared/components/Form";
import Input from "../../../../shared/components/Input";
import MessageBox from "../../../../shared/components/MessageBox";
import { useAuth } from "../../../../shared/hooks/useAuth";
import useError from "../../../../shared/hooks/useError";
import { ValidationService } from "../../../../shared/services/validationService";

export default function Login() {
  const [error, handleError] = useError(true);
  const { login } = useAuth();
  const redirect = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString().toLowerCase() as string;
    const password = formData.get("password")?.toString() as string;

    try {
      await ValidationService.validate(email, ["isRequired", "isEmail"]);
      await ValidationService.validate(password, ["isRequired", "minLen", "maxLen", "isPassword"]);

      const res = await login({ email, password });
      if (res instanceof Error) throw res;

      redirect("/dashboard");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message === "Not Found") {
          handleError(
            "Benutzer nicht gefunden oder Passwort falsch. Bitte versuchen Sie es erneut."
          );
          return;
        }

        if (error.message === "Network Error") {
          handleError("Netzwerkfehler. Bitte versuchen Sie es später erneut.");
          return;
        }
        handleError(error.message);
      }
    }
  };

  return (
    <>
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-bg-secondary py-5 px-2 m-5 my-10 rounded-lg w-11/12 max-w-5xl flex flex-col items-center"
        btnText="Login"
      >
        <h1 className="text-3xl font-bold border-b-4 border-accent-light w-full px-2">Login</h1>
        <p className="text-sm mt-2 px-2 opacity-50 w-full">
          Willkommen zurück 👋! Bitte melde dich an.
        </p>
        <Input
          type="email"
          placeholder="Muster@email.com"
          className="text-bg-primary rounded-md py-1 px-2 outline-none"
          name="email"
          required
        />
        <Input
          type="password"
          placeholder="min. 8 Zeichen"
          className="text-bg-primary rounded-md py-1 px-2 outline-none"
          name="password"
          required
        />
        <div className="my-3 w-full">
          <p className="text-sm px-2 mt-1 w-full">
            <a href="/auth/forgot-password" className="text-primary underline">
              Passwort vergessen?
            </a>
          </p>
          <p className="text-sm px-2 mt-1 w-full">
            Noch keinen Account?{" "}
            <a href="/auth/register" className="text-primary underline">
              Registrieren
            </a>
          </p>
        </div>
        <MessageBox message={error} className="min-h-11 text-primary" />
      </Form>
    </>
  );
}
