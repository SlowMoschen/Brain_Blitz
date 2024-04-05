import { z } from "zod";

export const EmailSchema = z.object({
    email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
    });

export type EmailSchemaType = z.infer<typeof EmailSchema>;