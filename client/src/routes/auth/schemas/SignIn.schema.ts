import { z } from "zod";

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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