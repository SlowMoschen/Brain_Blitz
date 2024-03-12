import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SelectUser } from "src/Utils/Types/model.types";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}


    /**
     * @description - Sends a confirmation email to the user
     * @param {SelectUser} user - The user instance for which to send the confirmation email
     * @param {string} token - The token to verify the user's email
     * @returns {Promise<void>} - Returns void
     */
    async sendConfirmationEmail(user: SelectUser, token: string): Promise<void | Error> {
        try {
            const url = `http://localhost:3000/auth/verify-email/${user.id}/${token}`;
    
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Willkommen bei Brain Blitz! Bitte bestätige deine E-Mail-Adresse',
                template: './confirmation',
                context: {
                    name: user.first_name,
                    url,
                },
                attachments: [
                    {
                        filename: 'email.svg',
                        path: './dist/Public/SVGS/email.svg',
                        cid: 'email',
                    },
                ]
            })
        } catch (error) {
            return error
        }
    }
}