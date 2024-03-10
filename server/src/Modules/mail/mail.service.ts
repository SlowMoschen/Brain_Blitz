import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SelectUser } from "src/Utils/Types/model.types";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendConfirmationEmail(user: SelectUser, token: string): Promise<void> {
        const url = `http://localhost:3000/auth/verify-email/${user.id}/${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Willkommen bei Brain Blitz! Bitte bestätige deine E-Mail-Adresse',
            template: './confirmation',
            context: {
                name: user.first_name,
                url,
            },
        })
    }
}