interface Change {
	header: string;
	body: string;
}

export class AppUpdate {
	date: number;
	constructor(
		public readonly dateString: string,
		public readonly version: string,
		public readonly changes: Change[],
	) {
		this.date = new Date(dateString).getTime();
	}
}

/**
 * @description - An array of all the updates that have been released
 * - Used to send notifications to the user when they log in
 * - The date is used to determine if the user has already seen the update
 * - If the user has not seen the update a notification will be sent
 * @example
 * ```typescript
 * export const updates: AppUpdate[] = [
 *     new AppUpdate('2021-08-01', '1.0.0', [
 *        {
 *           header: 'New Features',
 *          body: 'We have added a new feature that allows you to track your progress!'
 *      }
 * ]),
 */
export const updates: AppUpdate[] = [
	new AppUpdate('2024-04-23', '1.0.5', [
		{
			header: 'Antworten werden aufgedeckt',
			body: 'Nachdem du eine Antwort ausgewählt hast, ob richtig oder falsch, werden alle Antworten aufgedeckt.',
		}
	])
];
