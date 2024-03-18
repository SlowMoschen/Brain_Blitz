export class CompleteQuizEvent {
	constructor(
		public readonly user_id: string,
		public readonly quiz_id: string,
		public readonly score: number,
	) {}
}
