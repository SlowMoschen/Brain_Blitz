// MARK: Internet Quiz
const internetQuiz = {
	title: 'Das Internet',
	description: 'Allgemeine Fragen zum Internet',
	category: 'Technologie',
	questions: [
		{
			question: 'Wer gilt als Erfinder des World Wide Web (WWW)?',
			answers: ['Tim Berners-Lee', 'Bill Gates', 'Steve Jobs', 'Mark Zuckerberg'],
			correct_answer: 'Tim Berners-Lee',
		},
		{
			question: 'Was ist ein ISP?',
			answers: [
				'Ein Internet-Service-Provider, der den Zugang zum Internet bereitstellt',
				'Ein spezielles Computerteil',
				'Ein Internet-Sicherheitsprotokoll',
				'Ein Webdesign-Tool',
			],
			correct_answer: 'Ein Internet-Service-Provider, der den Zugang zum Internet bereitstellt',
		},
		{
			question: 'Welcher Begriff beschreibt die einzigartige Adresse einer Webseite im Internet?',
			answers: ['Webcode', 'URL (Uniform Resource Locator)', 'IP-Adresse (Internet Protocol)', 'Hyperlink'],
			correct_answer: 'URL (Uniform Resource Locator)',
		},
		{
			question: 'Welcher Webbrowser wurde von Google entwickelt?',
			answers: ['Firefox', 'Safari', 'Chrome', 'Edge'],
			correct_answer: 'Chrome',
		},
		{
			question: "Was ist ein 'Cookie' im Zusammenhang mit dem Internet?",
			answers: [
				'Eine kleine Textdatei, die von einer Website auf Ihrem Computer gespeichert wird und Informationen speichert',
				'Ein virtueller Haustier auf einer Website',
				'Eine Art von Virus',
				'Ein digitales Buch',
			],
			correct_answer:
				'Eine kleine Textdatei, die von einer Website auf Ihrem Computer gespeichert wird und Informationen speichert',
		},
		{
			question: 'Was ist die Hauptfunktion eines Suchmaschinen-Dienstes im Internet?',
			answers: [
				'Nachrichtenübertragung',
				'Online-Shopping',
				'Das Auffinden von Informationen im World Wide Web',
				'Die Bearbeitung von Bildern',
			],
			correct_answer: 'Das Auffinden von Informationen im World Wide Web',
		},
		{
			question: 'Welche Art von Internetverbindung verwendet Telefondrähte, um Daten zu übertragen?',
			answers: ['DSL (Digital Subscriber Line)', 'Glasfaser', 'Kabel', 'Satellit'],
			correct_answer: 'DSL (Digital Subscriber Line)',
		},
		{
			question: 'Was ist eine typische Verwendung von Cloud-Speicher?',
			answers: [
				'Das Lesen von E-Books',
				'Das Spielen von Online-Spielen',
				'Das Speichern von Dateien und Daten online',
				'Das Senden von E-Mails',
			],
			correct_answer: 'Das Speichern von Dateien und Daten online',
		},
		{
			question: "Was bedeutet die Abkürzung 'HTML' im Zusammenhang mit dem Internet?",
			answers: [
				'HyperText Markup Language',
				'High-Tech Media Library',
				'Human-Technology Master List',
				'Home Tool for Multimedia Links',
			],
			correct_answer: 'HyperText Markup Language',
		},
		{
			question: "Was ist ein 'Webhosting-Dienst'?",
			answers: [
				'Ein Dienst, der die Bereitstellung und Speicherung von Webseiten im Internet ermöglicht',
				'Eine Plattform zum Online-Gaming',
				'Ein Online-Video-Streaming-Dienst',
				'Ein soziales Netzwerk',
			],
			correct_answer: 'Ein Dienst, der die Bereitstellung und Speicherung von Webseiten im Internet ermöglicht',
		},
	],
};

//MARK: Computerwissenschaften
const socialMediaQuiz = {
	title: 'Soziale Medien',
	description: 'Die Welt der sozialen Medien',
	category: 'Technologie',
	questions: [
		{
			question:
				'Welches soziale Netzwerk wurde 2004 von Mark Zuckerberg gegründet und ist heute eines der größten der Welt?',
			answers: ['Twitter', 'Instagram', 'Facebook', 'Snapchat'],
			correct_answer: 'Facebook',
		},
		{
			question: 'Was ist der Hauptzweck von sozialen Medien?',
			answers: [
				'Online-Shopping',
				'Virtuelle Realitätserfahrung',
				'Die Verbindung und Interaktion zwischen Menschen',
				'Virtuelle Spiele',
			],
			correct_answer: 'Die Verbindung und Interaktion zwischen Menschen',
		},
		{
			question: 'Welches soziale Netzwerk ist für das Teilen von kurzen Videos bekannt und wurde 2016 gegründet?',
			answers: ['Twitter', 'TikTok', 'LinkedIn', 'Pinterest'],
			correct_answer: 'TikTok',
		},
		{
			question: 'Welche Plattform wird oft als professionelles soziales Netzwerk für berufliche Kontakte genutzt?',
			answers: ['Instagram', 'Facebook', 'LinkedIn', 'Snapchat'],
			correct_answer: 'LinkedIn',
		},
		{
			question:
				'Welches soziale Netzwerk ist für das Teilen von Bildern und kurzen Videos bekannt, die nach 24 Stunden verschwinden?',
			answers: ['Facebook', 'Twitter', 'Instagram Stories', 'WhatsApp'],
			correct_answer: 'Instagram Stories',
		},
		{
			question: "Was ist ein 'Like' in den meisten sozialen Medien?",
			answers: [
				'Eine digitale Währung',
				'Ein virtuelles Geschenk',
				'Eine positive Rückmeldung oder Zustimmung zu einem Beitrag',
				'Ein spezielles Emoji',
			],
			correct_answer: 'Eine positive Rückmeldung oder Zustimmung zu einem Beitrag',
		},
		{
			question: "Was ist ein 'Hashtag' in den sozialen Medien?",
			answers: [
				'Ein spezieller Filter für Fotos',
				'Ein Symbol für Privatsphäre',
				'Ein Schlagwort oder Stichwort, das Beiträgen hinzugefügt wird, um sie kategorisierbar zu machen',
				'Ein virtuelles Spiel',
			],
			correct_answer: 'Ein Schlagwort oder Stichwort, das Beiträgen hinzugefügt wird, um sie kategorisierbar zu machen',
		},
		{
			question:
				'Welches soziale Netzwerk ist besonders bei Jugendlichen und jungen Erwachsenen beliebt und wird oft für das Teilen von Bildern und kurzen Videos verwendet?',
			answers: ['Facebook', 'Instagram', 'LinkedIn', 'TikTok'],
			correct_answer: 'Instagram',
		},
		{
			question: "Was ist ein 'Influencer' in den sozialen Medien?",
			answers: [
				'Eine Art von Werbung',
				'Eine Person, die eine große Anzahl von Followern hat und Einfluss auf ihre Meinungen und Entscheidungen ausüben kann',
				'Eine spezielle Art von Emojis',
				'Ein automatisiertes Marketingprogramm',
			],
			correct_answer:
				'Eine Person, die eine große Anzahl von Followern hat und Einfluss auf ihre Meinungen und Entscheidungen ausüben kann',
		},
		{
			question:
				'Welche soziale Plattform wird oft für den Austausch von kurzen Nachrichten und Updates verwendet und hat eine Begrenzung von 280 Zeichen pro Beitrag?',
			answers: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'],
			correct_answer: 'Twitter',
		},
	],
};

//MARK: Erfinder und Entdecker
const inventorQuiz = {
	title: 'Erfinder und Entdecker',
	description: 'Berühmte Erfinder und ihre Erfindungen',
	category: 'Technologie',
	questions: [
		{
			question: 'Wer erfand die Glühbirne?',
			answers: ['Nikola Tesla', 'Thomas Edison', 'Alexander Graham Bell', 'Albert Einstein'],
			correct_answer: 'Thomas Edison',
		},
		{
			question: 'Wer ist der Erfinder des Telefons?',
			answers: ['Nikola Tesla', 'Alexander Graham Bell', 'Thomas Edison', 'Guglielmo Marconi'],
			correct_answer: 'Alexander Graham Bell',
		},
		{
			question: 'Wer entwickelte die Dampfmaschine?',
			answers: ['James Watt', 'George Stephenson', 'Robert Fulton', 'Samuel Morse'],
			correct_answer: 'James Watt',
		},
		{
			question: "Welcher Erfinder wird oft als 'Vater der Computer' bezeichnet?",
			answers: ['Bill Gates', 'Alan Turing', 'Steve Jobs', 'Charles Babbage'],
			correct_answer: 'Alan Turing',
		},
		{
			question: 'Wer erfand das Periodensystem der chemischen Elemente?',
			answers: ['Albert Einstein', 'Dmitri Mendelejew', 'Marie Curie', 'Antoine Lavoisier'],
			correct_answer: 'Dmitri Mendelejew',
		},
		{
			question: 'Wer ist der Erfinder des ersten kommerziell erfolgreichen Videorekorders?',
			answers: ['Steve Wozniak', 'Nolan Bushnell', 'Ray Dolby', 'Charles Ginsburg'],
			correct_answer: 'Charles Ginsburg',
		},
		{
			question:
				'Welcher Erfinder ist bekannt für die Entwicklung des ersten praktischen Verfahrens zur Massenproduktion von Stahl?',
			answers: ['Andrew Carnegie', 'Henry Bessemer', 'John D. Rockefeller', 'J.P. Morgan'],
			correct_answer: 'Henry Bessemer',
		},
		{
			question: 'Wer erfand die erste brauchbare Version des Kugelschreibers?',
			answers: ['Lewis Waterman', 'John J. Loud', 'László Bíró', 'George Safford Parker'],
			correct_answer: 'László Bíró',
		},
		{
			question: 'Wer erfand die erste brauchbare Version des Fotografieapparats, auch bekannt als die Daguerreotypie?',
			answers: ['Thomas Edison', 'Louis Daguerre', 'George Eastman', 'Ansel Adams'],
			correct_answer: 'Louis Daguerre',
		},
		{
			question: 'Welcher Erfinder wird oft als Pionier der Elektrotechnik und der Radioübertragung angesehen?',
			answers: ['Guglielmo Marconi', 'Alexander Graham Bell', 'Heinrich Hertz', 'Samuel Morse'],
			correct_answer: 'Guglielmo Marconi',
		},
	],
};

//MARK: Revolutionäre Erfindungen
const revolutionInventionsQuiz = {
	title: 'Revolutionäre Erfindungen',
	description: 'Erfindungen, die die Welt verändert haben',
	category: 'Technologie',
	questions: [
		{
			question: 'Welches Unternehmen brachte den ersten kommerziell erfolgreichen Mikroprozessor auf den Markt?',
			answers: ['Intel', 'IBM', 'Apple', 'Microsoft'],
			correct_answer: 'Intel',
		},
		{
			question: 'Welche Firma entwickelte den ersten kommerziell erfolgreichen Personal Computer (PC)?',
			answers: ['Apple', 'IBM', 'Microsoft', 'Dell'],
			correct_answer: 'IBM',
		},
		{
			question: 'Welches war das erste kommerziell verfügbare Mobiltelefon?',
			answers: ['Motorola DynaTAC 8000X', 'Nokia 3310', 'iPhone 3G', 'BlackBerry Curve'],
			correct_answer: 'Motorola DynaTAC 8000X',
		},
		{
			question: 'Welches Unternehmen brachte den ersten Massenmarkt-CD-Player auf den Markt?',
			answers: ['Sony', 'Panasonic', 'Philips', 'Toshiba'],
			correct_answer: 'Sony',
		},
		{
			question: 'Welche Firma produzierte den ersten kommerziellen Lithium-Ionen-Akku?',
			answers: ['Panasonic', 'Sony', 'Samsung', 'LG'],
			correct_answer: 'Sony',
		},
		{
			question: 'Welches Unternehmen entwickelte den ersten kommerziellen Personal Digital Assistant (PDA)?',
			answers: ['Palm', 'Microsoft', 'Apple', 'IBM'],
			correct_answer: 'Palm',
		},
		{
			question: 'Welches war das erste erfolgreiche kommerzielle 3D-Druckverfahren?',
			answers: [
				'Stereolithographie (SLA)',
				'Selective Laser Sintering (SLS)',
				'Fused Deposition Modeling (FDM)',
				'Stereolithographie',
			],
			correct_answer: 'Stereolithographie (SLA)',
		},
		{
			question: 'Welches Unternehmen brachte den ersten Heim-Videorecorder auf den Markt?',
			answers: ['Sony', 'Panasonic', 'JVC', 'LG'],
			correct_answer: 'JVC',
		},
		{
			question: 'Welches war das erste erfolgreiche kommerzielle Betriebssystem für Personal Computer?',
			answers: ['MS-DOS', 'Windows', 'MacOS', 'Unix'],
			correct_answer: 'MS-DOS',
		},
		{
			question: 'Welches Unternehmen produzierte den ersten kommerziellen LED-Fernseher?',
			answers: ['Sony', 'Samsung', 'LG', 'Panasonic'],
			correct_answer: 'Samsung',
		},
	],
};

//MARK: Innovative Unternehmen
const companiesQuiz = {
	title: 'Innovative Unternehmen',
	description: 'Berühmte Unternehmen und ihre Innovationen',
	category: 'Technologie',
	questions: [
		{
			question:
				'Welches Unternehmen ist für die Entwicklung des ersten kommerziell erfolgreichen Suchmaschinenalgorithmus bekannt?',
			answers: ['Yahoo', 'Google', 'Bing', 'Ask.com'],
			correct_answer: 'Google',
		},
		{
			question: 'Welches Unternehmen entwickelte den ersten kommerziell erfolgreichen E-Reader?',
			answers: ['Amazon', 'Barnes & Noble', 'Sony', 'Kobo'],
			correct_answer: 'Amazon',
		},
		{
			question:
				'Welches Unternehmen brachte den ersten kommerziell erfolgreichen Solid-State-Drives (SSD) auf den Markt?',
			answers: ['Samsung', 'Intel', 'Western Digital', 'Seagate'],
			correct_answer: 'Samsung',
		},
		{
			question: 'Welches Unternehmen entwickelte den ersten kommerziell erfolgreichen Grafikprozessor (GPU)?',
			answers: ['Nvidia', 'AMD', 'Intel', 'Qualcomm'],
			correct_answer: 'Nvidia',
		},
		{
			question: 'Welches Unternehmen produzierte den ersten kommerziell erfolgreichen Elektro-Sportwagen?',
			answers: ['Tesla Motors', 'Nissan', 'Chevrolet', 'BMW'],
			correct_answer: 'Tesla Motors',
		},
		{
			question:
				'Welches Unternehmen ist für die Entwicklung des ersten kommerziell erfolgreichen Touchscreen-Smartphones bekannt?',
			answers: ['Apple', 'Samsung', 'BlackBerry', 'Nokia'],
			correct_answer: 'Apple',
		},
		{
			question: 'Welches Unternehmen brachte den ersten kommerziell erfolgreichen Desktop-3D-Drucker auf den Markt?',
			answers: ['MakerBot', '3D Systems', 'Formlabs', 'Ultimaker'],
			correct_answer: 'MakerBot',
		},
		{
			question:
				'Welches Unternehmen entwickelte den ersten kommerziell erfolgreichen Sprachassistenten für Smartphones?',
			answers: ['Google', 'Apple', 'Microsoft', 'Amazon'],
			correct_answer: 'Google',
		},
		{
			question:
				'Welches Unternehmen ist bekannt für die Entwicklung des ersten kommerziell erfolgreichen Cloud-basierten Betriebssystems?',
			answers: ['Microsoft', 'Google', 'Chrome OS', 'Apple'],
			correct_answer: 'Chrome OS',
		},
		{
			question:
				'Welches Unternehmen brachte den ersten kommerziell erfolgreichen Virtual-Reality-Headset für Endverbraucher auf den Markt?',
			answers: ['Oculus', 'HTC', 'Sony', 'Samsung'],
			correct_answer: 'Oculus',
		},
	],
};

export const technologyQuizzes = [internetQuiz, socialMediaQuiz, inventorQuiz, revolutionInventionsQuiz, companiesQuiz];