import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SendVerifyMailEvent } from 'src/Events/send.verify.mail.event';

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	/**
	 * @description - Listens to the mail.verify-email event to send a confirmation email to the user
	 * @param {SelectUser} user - The user instance for which to send the confirmation email
	 * @param {string} token - The token to verify the user's email
	 * @returns {Promise<void>} - Returns void
	 */
    @OnEvent('mail.verify-email')
	async sendConfirmationEmail(payLoad: SendVerifyMailEvent): Promise<void | Error> {
		try {
			const url = `${process.env.BASE_VERIFICATION_URL}${payLoad.userID}/${payLoad.token}`;

			await this.mailerService.sendMail({
				to: payLoad.email,
				subject: 'Willkommen bei Brain Blitz! Bitte bestätige deine E-Mail-Adresse',
				template: './confirmation',
				context: {
					name: payLoad.firstName,
					url,
				},
				attachments: [
					{
						filename: 'email.svg',
						path: './dist/Public/SVGS/email.svg',
						cid: 'email',
					},
				],
			});
		} catch (error) {
			return error;
		}
	}
}
