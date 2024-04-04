import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Dein Name muss mindestens 2 Zeichen lang sein." }),
  email: z
    .string()
    .email({ message: "Bitte gib eine gültige E-Mail-Adresse ein." }),
  message: z
    .string()
    .min(10, {
      message: "Deine Nachricht muss mindestens 10 Zeichen lang sein.",
    })
    .max(500, {
      message: "Deine Nachricht darf maximal 500 Zeichen lang sein.",
    }),
});

export type IContactSchema = z.infer<typeof ContactSchema>;