import { z } from "zod";
import { passwordRegex } from "../../../configs/Regex";

export const SignInSchema = z.object({
  email: z.string().email({ message: "Bitte gib eine gültige E-Mail-Adresse ein." }).toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Dein Passwort muss mindestens 8 Zeichen lang sein." })
    .regex(passwordRegex, {
      message:
        "Dein Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    }),
});

export type ISignInSchema = z.infer<typeof SignInSchema>;