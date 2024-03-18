export class SendVerifyMailEvent {
	constructor(
		public readonly userID: string,
		public readonly email: string,
		public readonly firstName: string,
		public readonly token: string,
	) {}
}
