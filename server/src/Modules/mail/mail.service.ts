import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PasswordChangedEvent, SendForgotPasswordMailEvent, SendVerifyMailEvent } from 'src/Events/notification.events';

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	private async sendMail(options: {
		to: string;
		subject: string;
		template: string;
		context: any;
		attachments?: any[];
	}): Promise<void | Error> {
		try {
			await this.mailerService.sendMail({
				...options,
				attachments: options.attachments || [
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
	/**
	 * @description - Listens to the mail.verify-email event to send a confirmation email to the user
	 * @param {SendVerifyMailEvent} payLoad - The user instance for which to send the confirmation email
	 * @returns {Promise<void>} - Returns void
	 */
	@OnEvent('mail.verify-email')
	async sendConfirmationEmail(payLoad: SendVerifyMailEvent): Promise<void | Error> {
		const url = `${process.env.BASE_VERIFICATION_URL}${payLoad.userID}/${payLoad.token}`;
		return await this.sendMail({
			to: payLoad.email,
			subject: 'Willkommen bei Brain Blitz! Bitte bestätige deine E-Mail-Adresse',
			template: './confirmation',
			context: {
				name: payLoad.firstName,
				url,
			},
		});
	}

	/**
	 * @description - Listens to the mail.forgot-password event to send a password reset email to the user
	 * @param {SendForgotPasswordMailEvent} payLoad - The user instance for which to send the password reset email
	 * @returns {Promise<void>} - Returns void
	 * @returns {Promise<Error>} - Returns an error if the email fails to send
	 */
	@OnEvent('mail.forgot-password')
	async sendForgotPasswordEmail(payLoad: SendForgotPasswordMailEvent): Promise<void | Error> {
		const url = `${process.env.BASE_PASSWORD_RESET_URL}${payLoad.userID}/${payLoad.token}`;
		return await this.sendMail({
			to: payLoad.email,
			subject: 'Passwort zurücksetzen',
			template: './forgot-password',
			context: {
				name: payLoad.firstName,
				url,
			},
		});
	}

	/**
	 * @description - Listens to the mail.password-changed event to send a password changed email to the user
	 * @param {PasswordChangedEvent} payLoad - The user instance for which to send the password changed email
	 * @returns {Promise<void>} - Returns void
	 * @returns {Promise<Error>} - Returns an error if the email fails to send
	 */
	@OnEvent('mail.password-changed')
	async sendPasswordChangedEmail(payLoad: PasswordChangedEvent): Promise<void | Error> {
		const url = `${process.env.BASE_CONTACT_URL}`;
		return await this.sendMail({
			to: payLoad.email,
			subject: 'Passwort wurde geändert',
			template: './password-changed',
			context: {
				name: payLoad.firstName,
				url,
			},
		});
	}
}
