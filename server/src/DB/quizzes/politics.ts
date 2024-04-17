// MARK: EU Politik
const euPoliticsQuiz = {
	title: 'EU Politik',
	description: 'Die politische Struktur der Europäischen Union',
	category: 'Politik',
	questions: [
		{
			question: 'Welches Land ist das Gründungsmitglied der Europäischen Union?',
			answers: ['Deutschland', 'Frankreich', 'Italien', 'Belgien'],
			correct_answer: 'Belgien',
		},
		{
			question: 'Wie viele Mitgliedstaaten hat die Europäische Union?',
			answers: ['25', '27', '30', '35'],
			correct_answer: '27',
		},
		{
			question: 'Welches ist die offizielle Währung der Europäischen Union?',
			answers: ['Pfund', 'Euro', 'Dollar', 'Yen'],
			correct_answer: 'Euro',
		},
		{
			question: 'Welches Organ der Europäischen Union ist für die Verabschiedung von EU-Gesetzen zuständig?',
			answers: ['Europäischer Rat', 'Europäisches Parlament', 'Europäische Kommission', 'Europäischer Gerichtshof'],
			correct_answer: 'Europäischer Gerichtshof',
		},
		{
			question: 'Wer ist der aktuelle Präsident der Europäischen Kommission?',
			answers: ['Angela Merkel', 'Ursula von der Leyen', 'Emmanuel Macron', 'Mark Rutte'],
			correct_answer: 'Ursula von der Leyen',
		},
		{
			question: 'Welches Land hat den Vorsitz im Rat der Europäischen Union im zweiten Halbjahr 2023 inne?',
			answers: ['Deutschland', 'Frankreich', 'Schweden', 'Portugal'],
			correct_answer: 'Portugal',
		},
		{
			question: 'Welches ist das höchste Gericht der Europäischen Union?',
			answers: ['Europäischer Gerichtshof', 'Europäischer Rechnungshof', 'Europäischer Rat', 'Europäisches Parlament'],
			correct_answer: 'Europäischer Gerichtshof',
		},
		{
			question: 'Welche Stadt ist einer der Sitze des Europäischen Parlaments?',
			answers: ['Wien', 'Straßburg', 'Luxemburg', 'Amsterdam'],
			correct_answer: 'Straßburg',
		},
		{
			question: 'Welches Land ist kein Mitglied der Europäischen Union?',
			answers: ['Deutschland', 'Norwegen', 'Spanien', 'Italien'],
			correct_answer: 'Norwegen',
		},
		{
			question: 'Welche Organisation ist für die Umsetzung der europäischen Gesetze in den Mitgliedstaaten zuständig?',
			answers: [
				'Europäische Zentralbank',
				'Europäische Investitionsbank',
				'Europäische Kommission',
				'Europäischer Gerichtshof',
			],
			correct_answer: 'Europäische Kommission',
		},
	],
};

// MARK: Internationale Organisationen
const internationalOrganizationsQuiz = {
	title: 'Internationale Organisationen',
	description: 'Die wichtigsten internationalen Organisationen',
	category: 'Politik',
	questions: [
		{
			question:
				'Welche Organisation hat das Hauptziel, den Weltfrieden zu fördern, und ist bekannt für ihre blauen Helme?',
			answers: ['UNESCO', 'UNICEF', 'NATO', 'UNO'],
			correct_answer: 'UNO',
		},
		{
			question:
				'Welche Organisation ist eine zwischenstaatliche Organisation zur Förderung des internationalen Handels und besteht aus 164 Mitgliedern?',
			answers: ['OPEC', 'WHO', 'WTO', 'IMF'],
			correct_answer: 'WTO',
		},
		{
			question:
				'Welche Organisation hat das Hauptziel, die internationale Zusammenarbeit in den Bereichen Währung und Wirtschaft zu fördern?',
			answers: ['WTO', 'WHO', 'IMF', 'UNESCO'],
			correct_answer: 'IMF',
		},
		{
			question:
				'Welche Organisation ist für die Regulierung des Welthandels verantwortlich und hat ihren Hauptsitz in Genf, Schweiz?',
			answers: ['WHO', 'UNESCO', 'WTO', 'UNO'],
			correct_answer: 'WTO',
		},
		{
			question:
				'Welche Organisation ist bekannt für ihre Arbeit im Bereich der internationalen Gesundheit und hat ihren Hauptsitz in Genf, Schweiz?',
			answers: ['UNICEF', 'WHO', 'IMF', 'NATO'],
			correct_answer: 'WHO',
		},
		{
			question:
				'Welche Organisation hat das Ziel, die Zusammenarbeit der europäischen Länder in verschiedenen Bereichen wie Wirtschaft und Sicherheit zu fördern?',
			answers: ['EU', 'UNO', 'NATO', 'ASEAN'],
			correct_answer: 'EU',
		},
		{
			question:
				'Welche Organisation ist bekannt für ihre Arbeit im Bereich der humanitären Hilfe und der Förderung der Kinderrechte?',
			answers: ['UNICEF', 'WHO', 'WTO', 'NATO'],
			correct_answer: 'UNICEF',
		},
		{
			question:
				'Welche Organisation hat das Ziel, den freien und fairen Handel zwischen den Mitgliedsländern zu fördern und besteht aus 27 Mitgliedern?',
			answers: ['EU', 'UNO', 'OPEC', 'IMF'],
			correct_answer: 'EU',
		},
		{
			question:
				'Welche Organisation hat das Ziel, den Frieden und die Sicherheit in der Welt zu fördern und besteht aus 30 Mitgliedern?',
			answers: ['NATO', 'EU', 'ASEAN', 'OPEC'],
			correct_answer: 'NATO',
		},
		{
			question:
				'Welche Organisation ist eine zwischenstaatliche Organisation zur Koordinierung der Erdölpolitik und besteht aus 13 Mitgliedern?',
			answers: ['WTO', 'WHO', 'OPEC', 'IMF'],
			correct_answer: 'OPEC',
		},
	],
};

export const politicsQuizzes = [euPoliticsQuiz, internationalOrganizationsQuiz];
