import { z } from "zod";

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PasswordChangeSchema = z
  .object({
    old_password: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein.")
      .regex(
        passwordRegex,
        "Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
      ),
    new_password: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein.")
      .regex(
        passwordRegex,
        "Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
      ),
    confirm_new_password: z
      .string()
      .min(8, "Das Passwort muss mindestens 8 Zeichen lang sein.")
      .regex(
        passwordRegex,
        "Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
      ),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Die Passwörter stimmen nicht überein.",
    path: ["confirm_new_password"],
  });

export type PasswordChangeInput = z.infer<typeof PasswordChangeSchema>;
