import { AppUpdate } from "src/Modules/gateway/updates";
import { SelectUser } from "src/Utils/Types/model.types";

export class SendVerifyMailEvent {
	constructor(
		public readonly userID: string,
		public readonly email: string,
		public readonly firstName: string,
		public readonly token: string,
	) {}
}

export class SendForgotPasswordMailEvent extends SendVerifyMailEvent {}

export class PasswordChangedEvent {
	constructor(
		public readonly userID: string,
		public readonly email: string,
		public readonly firstName: string,
	) {}
}

export class SendContactFormEvent {
	constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly message: string,
	) {}
}

export class SendReportFormEvent {
	constructor(
		public readonly problem: string,
		public readonly description: string,
		public readonly user: SelectUser,
		public readonly id?: string,
	) {}
}

export class UpdateNotificationEvent {
	constructor(
		public readonly user_id: string,
		public readonly update: AppUpdate
	) {}
}
