import { z } from "zod";

export const ProfileDetailsSchema = z.object({
    first_name: z.string().min(2, { message: 'Vorname muss mindestens 2 Zeichen lang sein'}),
    last_name: z.string().min(2, { message: 'Nachname muss mindestens 2 Zeichen lang sein'}),
    email: z.string().email({ message: 'Ungültige E-Mail-Adresse' }),
    });

export type ProfileDetails = z.infer<typeof ProfileDetailsSchema>;