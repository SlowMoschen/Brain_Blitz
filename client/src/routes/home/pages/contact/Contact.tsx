import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import Article from "../../../../shared/components/Article";
import Form from "../../../../shared/components/Form";
import Input from "../../../../shared/components/Input";
import MessageBox from "../../../../shared/components/MessageBox";
import { APPLICATION } from "../../../../shared/constants/application";
import useError from "../../../../shared/hooks/useError";
import { HttpService } from "../../../../shared/services/httpService";
import { TIMES } from "../../../../shared/constants/times";

interface ContactDto {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [error, handleError] = useError(true);
  const [wasSuccess, setWasSuccess] = useState(false);

  const httpService = new HttpService();

  const mutation = useMutation({
    mutationFn: sendData,
    onError: (err) => handleError(err.message),
    onSuccess: () => {
      handleError("Ihre Nachricht wurde erfolgreich gesendet!");
      setWasSuccess(true);
      setTimeout(() => {
        setWasSuccess(false);
      }, TIMES.ERROR_MESSAGE_DURATION);
    },
  });

  function sendData(body: ContactDto) {
    return httpService.post(APPLICATION.CONTACT_ENDPOINT, body);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (!formData.get("name") || !formData.get("email") || !formData.get("message"))
      return handleError("Bitte füllen Sie alle Felder aus.");

    const body: ContactDto = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    mutation.mutate(body);
    e.currentTarget.reset();
  }

  return (
    <>
      <Article
        title={{ content: "Kontakt", border_b: true }}
        para1="Wir freuen uns über Ihr Interesse an unserer Quiz-App! Bitte nutzen Sie das untenstehende Kontaktformular, um uns Ihr Feedback, Fragen oder Anliegen mitzuteilen. Unser Team steht Ihnen gerne zur Verfügung und wird sich bemühen, Ihnen so schnell wie möglich zu antworten. Vielen Dank für Ihre Unterstützung!"
      />
      <Form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center items-center max-w-5xl h-full w-10/12 bg-bg-secondary my-10 rounded-lg"
      >
        <Input
          type="text"
          name="name"
          placeholder="Name"
          className="input rounded-md py-2 px-1 outline-none text-bg-primary w-full"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="input rounded-md py-2 px-1 outline-none text-bg-primary w-full"
          required
        />
        <div className="w-full p-5">
          <label htmlFor="message" className="text-xl my-2">
            Deine Nachricht
          </label>
          <textarea
            name="message"
            placeholder="Message"
            className="input rounded-md resize-none py-2 px-1 outline-none text-bg-primary w-full h-40"
            required
          />
        </div>
        <MessageBox
          message={error}
          className={`min-h-11 ${wasSuccess ? "text-accent" : "text-primary"}`}
        />
        <p className="text-sm opacity-50 p-5">Indem Sie dieses Kontaktformular absenden, erklären Sie sich damit einverstanden, eine Bestätigungs-E-Mail zu erhalten. Diese E-Mail dient lediglich der Bestätigung des Eingangs Ihrer Anfrage und wird nicht für Marketingzwecke verwendet. Ihre Daten werden gemäß unserer Datenschutzrichtlinie vertraulich behandelt.</p>
      </Form>
    </>
  );
}
