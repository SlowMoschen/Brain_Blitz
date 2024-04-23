import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
	PasswordChangedEvent,
	SendContactFormEvent,
	SendForgotPasswordMailEvent,
	SendReportFormEvent,
	SendVerifyMailEvent,
} from 'src/Events/notification.events';
import { StringService } from '../shared/string-manipulation/string.service';

@Injectable()
export class MailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly stringService: StringService,
	) {}

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
				name: this.stringService.capitalize(payLoad.firstName),
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
				name: this.stringService.capitalize(payLoad.firstName),
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
		const url = `${process.env.CONTACT_REDIRECT_URL}`;
		return await this.sendMail({
			to: payLoad.email,
			subject: 'Passwort wurde geändert',
			template: './password-changed',
			context: {
				name: this.stringService.capitalize(payLoad.firstName),
				url,
			},
		});
	}

	/**
	 * @description - Listens to the mail.contact-form event to send the message to our serivce email
	 * @param {SendContactFormEvent} payLoad - The user instance for which to send the contact form email
	 * @returns {Promise<void>} - Returns void
	 * @returns {Promise<Error>} - Returns an error if the email fails to send
	 */
	@OnEvent('mail.contact-form')
	async sendContactForm(payLoad: SendContactFormEvent): Promise<void | Error> {
		await this.sendMail({
			to: process.env.EMAIL_USER,
			subject: 'Kontaktformular',
			template: './contact-form',
			context: {
				name: this.stringService.capitalize(payLoad.name),
				email: payLoad.email,
				message: payLoad.message,
			},
		});
		return this.sendContactFormConfirmation(payLoad);
	}

	@OnEvent('mail.report-form')
	async sendReportForm(payLoad: SendReportFormEvent): Promise<void | Error> {
		await this.sendMail({
			to: process.env.EMAIL_USER,
			subject: 'Report',
			template: './report-form',
			context: {
				name: this.stringService.capitalize(payLoad.user.first_name),
				userID: payLoad.user.id,
				problem: payLoad.problem,
				description: payLoad.description,
				id: payLoad.id,
			},
		});
	}

	/**
	 * @description - Sends a confirmation email to the user who submitted the contact form
	 * @param {SendContactFormEvent} payLoad - The user instance for which to send the confirmation email
	 * @returns {void} - Returns void
	 * @returns {Error} - Returns an error if the email fails to send
	 */
	private sendContactFormConfirmation(payLoad: SendContactFormEvent): void {
		this.sendMail({
			to: payLoad.email,
			subject: 'Kontaktformular',
			template: './contact-form-confirmation',
			context: {
				name: payLoad.name,
				email: payLoad.email,
				message: payLoad.message,
			},
		});
	}
}
