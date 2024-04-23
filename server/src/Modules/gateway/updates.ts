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
		},
		{
			header: 'Energie Auffüllrate erhöht',
			body: 'Du bekommst nun alle 15 Minuten, 15 Energiepunkte statt den bisherigen 10 Energiepunkten.',
		},
		{
			header: 'Quiz Rankings nun aufrufbar',
			body: 'Du kannst nun die Rankings von jedem Quiz einsehen. Derzeit erreichbar über die Globale "Meist gespielte Quizze" Liste.',
		},
		{
			header: 'Überarbeitete Fragen',
			body: 'Einige Fragen in den Katgeorien "Fernsehen" und "Sport" wurden überarbeitet.',
		},
	]),
	new AppUpdate('2024-04-24', '1.1.0', [
		{
			header: 'Möglichkeit zum Melden von Fragen und Bugs',
			body: 'Du kannst nun Fragen und Bugs melden. Dies ist mit den neuen Buttons bei den einzelnen Fragen, am Ende des Quiz oder in deinem Profil möglich.',
		},
		{
			header: 'User Profile',
			body: 'Du kannst nun die Profile von anderen Usern einsehen. Dies ist über die Rangliste oder über die Quiz Ergebnisse möglich.',
		},
		{
			header: 'Überarbeitete Fragen',
			body: 'Einige Fragen in verschiedenen Kategorien wurden überarbeitet. Die Fragen sind nun besser formuliert und enthalten weniger Fehler.',
		},
	]),
];
