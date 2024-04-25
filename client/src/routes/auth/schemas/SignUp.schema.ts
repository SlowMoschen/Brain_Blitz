import { z } from "zod";
import { passwordRegex } from "../../../configs/Regex";

export const SignUpSchema = z
  .object({
    first_name: z.string().min(2, "Der Vorname muss mindestens 2 Zeichen lang sein."),
    last_name: z.string().min(2, "Der Vorname muss mindestens 2 Zeichen lang sein."),
    email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
    password: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein.")
      .regex(
        passwordRegex,
        "Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
      ),
    confirm_password: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein.")
      .regex(
        passwordRegex,
        "Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Die Passwörter stimmen nicht überein.",
    path: ["confirm_password"],
  });

export type SignUpDTO = z.infer<typeof SignUpSchema>;
