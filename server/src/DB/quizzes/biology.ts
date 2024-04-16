// MARK: Der Mensch
const humanQuiz = {
	title: 'Der Mensch',
	description: 'Die Biologie des Menschen',
	category: 'Biologie',
	questions: [
		{
			question: 'Welches ist das größte Organ im menschlichen Körper?',
			answers: ['Leber', 'Herz', 'Haut', 'Lunge'],
			correct_answer: 'Haut',
		},
		{
			question: 'Wie viele Knochen hat ein erwachsener Mensch durchschnittlich?',
			answers: ['206', '300', '150', '100'],
			correct_answer: '206',
		},
		{
			question: 'Welches Blutgefäß transportiert sauerstoffreiches Blut vom Herzen zu den Körperzellen?',
			answers: ['Aorta', 'Vena cava', 'Arterie', 'Vene'],
			correct_answer: 'Arterie',
		},
		{
			question: 'Welcher Teil des Gehirns ist für die Koordination von Bewegungen verantwortlich?',
			answers: ['Frontallappen', 'Kleinhirn', 'Großhirn', 'Zwischenhirn'],
			correct_answer: 'Kleinhirn',
		},
		{
			question: 'Welcher Muskel ist für die Atmung verantwortlich?',
			answers: ['Bizeps', 'Quadrizeps', 'Zwerchfell', 'Brustmuskel'],
			correct_answer: 'Zwerchfell',
		},
		{
			question: 'Wie viele Zähne hat ein erwachsener Mensch normalerweise?',
			answers: ['32', '28', '24', '20'],
			correct_answer: '32',
		},
		{
			question: 'Welches Hormon wird von der Bauchspeicheldrüse produziert und reguliert den Blutzuckerspiegel?',
			answers: ['Adrenalin', 'Insulin', 'Testosteron', 'Östrogen'],
			correct_answer: 'Insulin',
		},
		{
			question: 'Welches Organ ist für die Produktion von roten Blutkörperchen verantwortlich?',
			answers: ['Leber', 'Milz', 'Niere', 'Knochenmark'],
			correct_answer: 'Knochenmark',
		},
		{
			question: 'Welches Organ ist für die Speicherung von Galle verantwortlich?',
			answers: ['Leber', 'Gallenblase', 'Bauchspeicheldrüse', 'Dünndarm'],
			correct_answer: 'Gallenblase',
		},
		{
			question: 'Welches Organ ist für die Reinigung des Blutes von Giftstoffen zuständig?',
			answers: ['Niere', 'Herz', 'Lunge', 'Leber'],
			correct_answer: 'Niere',
		},
	],
};

// MARK: Evulotion
const evolutionQuiz = {
	title: 'Evolution',
	description: 'Die Evolutionstheorie',
	category: 'Biologie',
	questions: [
		{
			question: "Welcher britische Naturforscher prägte den Begriff 'natürliche Auslese'?",
			answers: ['Charles Darwin', 'Gregor Mendel', 'Alfred Russel Wallace', 'Louis Pasteur'],
			correct_answer: 'Charles Darwin',
		},
		{
			question:
				'Welches Ereignis markiert den Beginn der Erdgeschichte und wird als die Entstehung des ersten Lebens auf der Erde angesehen?',
			answers: [
				'Entstehung der Atmosphäre',
				'Entstehung der Kontinente',
				'Entstehung des Lebens',
				'Entstehung der Ozeane',
			],
			correct_answer: 'Entstehung des Lebens',
		},
		{
			question: 'Welche Vogelart war ein wichtiger Beleg für Darwins Theorie der Evolution durch natürliche Auslese?',
			answers: ['Papageien', 'Finken', 'Pelikane', 'Kolibris'],
			correct_answer: 'Finken',
		},
		{
			question: 'Welches ist der Hauptmechanismus, der zur Evolution neuer Arten führt?',
			answers: ['Mutation und Selektion', 'Klonen', 'Kreuzung', 'Zufall'],
			correct_answer: 'Mutation und Selektion',
		},
		{
			question: 'Welches Organismus war laut Darwins Theorie der nächste gemeinsame Vorfahre aller Lebewesen?',
			answers: ['Bakterien', 'Fische', 'Einzeller', 'Pflanzen'],
			correct_answer: 'Einzeller',
		},
		{
			question: 'Welches Konzept beschreibt die Anpassung von Organismen an ihre Umwelt im Laufe der Zeit?',
			answers: ['Ökosystem', 'Genetik', 'Evolution', 'Synergie'],
			correct_answer: 'Evolution',
		},
		{
			question: 'Welcher Begriff beschreibt die Ähnlichkeit von Organismen aufgrund gemeinsamer Abstammung?',
			answers: ['Konvergente Evolution', 'Analogie', 'Homologie', 'Divergente Evolution'],
			correct_answer: 'Homologie',
		},
		{
			question: 'Welches Ereignis führte zum Massensterben der Dinosaurier vor etwa 65 Millionen Jahren?',
			answers: ['Vulkanausbrüche', 'Klimawandel', 'Meteoriteneinschlag', 'Eisaufschmelzung'],
			correct_answer: 'Meteoriteneinschlag',
		},
		{
			question: 'Welche Art von Selektion tritt auf, wenn extreme Merkmale eines Organismus bevorzugt werden?',
			answers: ['Stabilisierende Selektion', 'Direktionale Selektion', 'Disruptive Selektion', 'Gendrift'],
			correct_answer: 'Direktionale Selektion',
		},
		{
			question:
				'Welche Strukturen bei verschiedenen Arten haben ähnliche Funktionen, aber unterschiedliche Ursprünge und Strukturen?',
			answers: ['Analogie', 'Homologie', 'Konvergente Evolution', 'Divergente Evolution'],
			correct_answer: 'Analogie',
		},
	],
};

// MARK: Pfalnzen
const plantQuiz = {
	title: 'Pflanzen',
	description: 'Pflanzen und ihre Biologie',
	category: 'Biologie',
	questions: [
		{
			question: 'Welches ist das wichtigste grüne Pigment in Pflanzen, das für die Photosynthese verantwortlich ist?',
			answers: ['Chlorophyll', 'Carotin', 'Anthocyan', 'Xanthophyll'],
			correct_answer: 'Chlorophyll',
		},
		{
			question: 'Welches ist das größte Organ einer Pflanze?',
			answers: ['Stamm', 'Wurzel', 'Blatt', 'Blüte'],
			correct_answer: 'Blüte',
		},
		{
			question: 'Welches ist das primäre Organ für die Aufnahme von Wasser und Nährstoffen bei den meisten Pflanzen?',
			answers: ['Stängel', 'Blätter', 'Wurzeln', 'Früchte'],
			correct_answer: 'Wurzeln',
		},
		{
			question: 'Welche Art von Pflanzen produziert Samen, die von Früchten umgeben sind?',
			answers: ['Gymnospermen', 'Angiospermen', 'Moos', 'Farne'],
			correct_answer: 'Angiospermen',
		},
		{
			question: 'Welche Pflanzenklasse vermehrt sich hauptsächlich durch Sporen?',
			answers: ['Farne', 'Angiospermen', 'Gymnospermen', 'Algen'],
			correct_answer: 'Farne',
		},
		{
			question: 'Welcher Teil einer Blütenpflanze produziert Pollen?',
			answers: ['Stempel', 'Staubblatt', 'Kelch', 'Fruchtblatt'],
			correct_answer: 'Staubblatt',
		},
		{
			question: 'Welches ist das männliche Fortpflanzungsorgan einer Blütenpflanze?',
			answers: ['Fruchtblatt', 'Kelch', 'Stempel', 'Staubblatt'],
			correct_answer: 'Staubblatt',
		},
		{
			question: 'Welche Art von Blütenpflanzen wird von Tieren bestäubt, die Nektar sammeln?',
			answers: ['Windbestäuber', 'Selbstbestäuber', 'Tierbestäuber', 'Wasserbestäuber'],
			correct_answer: 'Tierbestäuber',
		},
		{
			question:
				'Welche Art von Wurzeln wächst seitlich vom Hauptwurzeln ab und erhöht die Aufnahmefläche für Wasser und Nährstoffe?',
			answers: ['Pfahlwurzel', 'Adventivwurzel', 'Nebenwurzel', 'Seitenwurzel'],
			correct_answer: 'Seitenwurzel',
		},
		{
			question:
				'Welche Art von Pflanzen benötigt keinen Boden und wächst auf anderen Pflanzen, um Nährstoffe zu erhalten?',
			answers: ['Epiphyten', 'Parasiten', 'Xerophyten', 'Hydrophyten'],
			correct_answer: 'Epiphyten',
		},
	],
};

// MARK: Tiere
const animalQuiz = {
	title: 'Tierreich',
	description: 'Die große Vielfalt der Tiere',
	category: 'Biologie',
	questions: [
		{
			question: 'Welches ist das größte lebende Landsäugetier?',
			answers: ['Elefant', 'Giraffe', 'Nashorn', 'Nilpferd'],
			correct_answer: 'Elefant',
		},
		{
			question: 'Welches ist das schnellste Landtier?',
			answers: ['Gepard', 'Löwe', 'Antilope', 'Hirsch'],
			correct_answer: 'Gepard',
		},
		{
			question: 'Welcher Vogel kann rückwärts fliegen?',
			answers: ['Adler', 'Taube', 'Kolibri', 'Eule'],
			correct_answer: 'Kolibri',
		},
		{
			question: 'Welches Tier ist für seinen charakteristischen schwarzen und weißen Streifen bekannt?',
			answers: ['Zebra', 'Tiger', 'Leopard', 'Gepard'],
			correct_answer: 'Zebra',
		},
		{
			question: 'Welche Art von Tier ist ein Koala?',
			answers: ['Bär', 'Beuteltier', 'Primat', 'Nagetier'],
			correct_answer: 'Beuteltier',
		},
		{
			question:
				'Welches Tier ist für seine starken Duftdrüsen bekannt und kann bei Gefahr stinkende Flüssigkeiten absondern?',
			answers: ['Fuchs', 'Waschbär', 'Stinktier', 'Opossum'],
			correct_answer: 'Stinktier',
		},
		{
			question: 'Welche Art von Tier ist ein Oktopus?',
			answers: ['Fisch', 'Weichtier', 'Reptil', 'Amphibie'],
			correct_answer: 'Weichtier',
		},
		{
			question: 'Welches ist das größte Raubtier im Ozean?',
			answers: ['Orca', 'Hai', 'Thunfisch', 'Rochen'],
			correct_answer: 'Orca',
		},
		{
			question: 'Welches Tier kann seine Farbe ändern, um sich seiner Umgebung anzupassen?',
			answers: ['Chamäleon', 'Leguan', 'Echse', 'Schlange'],
			correct_answer: 'Chamäleon',
		},
		{
			question: 'Welches ist das einzige Säugetier, das fliegen kann?',
			answers: ['Adler', 'Falke', 'Fledermaus', 'Schwalbe'],
			correct_answer: 'Fledermaus',
		},
	],
};

// MARK: Zellen und Mikroorganismen
const cellQuiz = {
	title: 'Zellen und Mikroorganismen',
	description: 'Die kleinsten Bausteine des Lebens',
	category: 'Biologie',
	questions: [
		{
			question:
				'Welche Zellstruktur ist für die Steuerung der Zellaktivitäten und die Speicherung genetischer Informationen verantwortlich?',
			answers: ['Mitochondrium', 'Zellmembran', 'Zellkern', 'Ribosom'],
			correct_answer: 'Zellkern',
		},
		{
			question: 'Welches ist die kleinste Einheit des Lebens?',
			answers: ['Zelle', 'Organ', 'Gewebe', 'Organismus'],
			correct_answer: 'Zelle',
		},
		{
			question: 'Welches ist die häufigste Art von Zellen im menschlichen Körper?',
			answers: ['Muskelzellen', 'Nervenzellen', 'Epithelzellen', 'Fettzellen'],
			correct_answer: 'Epithelzellen',
		},
		{
			question: 'Welches sind die Bausteine von Proteinen?',
			answers: ['Aminosäuren', 'Glukose', 'Fettsäuren', 'Nukleotide'],
			correct_answer: 'Aminosäuren',
		},
		{
			question: 'Welches sind die kleinsten lebenden Zellen?',
			answers: ['Bakterien', 'Pilze', 'Viren', 'Protozoen'],
			correct_answer: 'Bakterien',
		},
		{
			question: 'Welche Art von Mikroorganismen sind für die Fermentation verantwortlich?',
			answers: ['Bakterien', 'Pilze', 'Protozoen', 'Viren'],
			correct_answer: 'Bakterien',
		},
		{
			question: 'Welche Zellstruktur ist für die Proteinbiosynthese verantwortlich?',
			answers: ['Ribosom', 'Mitochondrium', 'Endoplasmatisches Retikulum', 'Golgi-Apparat'],
			correct_answer: 'Ribosom',
		},
		{
			question: 'Welches sind die Energielieferanten der Zelle?',
			answers: ['Mitochondrien', 'Zellmembranen', 'Zellkerne', 'Golgi-Apparate'],
			correct_answer: 'Mitochondrien',
		},
		{
			question: 'Welche Art von Mikroorganismen sind für Krankheiten wie Grippe, AIDS und COVID-19 verantwortlich?',
			answers: ['Bakterien', 'Pilze', 'Viren', 'Protozoen'],
			correct_answer: 'Viren',
		},
		{
			question: 'Welches ist die kleinste lebende Einheit in der Biologie, die alle Merkmale des Lebens zeigt?',
			answers: ['Zelle', 'Molekül', 'Organelle', 'Virus'],
			correct_answer: 'Virus',
		},
	],
};


export const biologyQuizzes = [humanQuiz, evolutionQuiz, plantQuiz, animalQuiz, cellQuiz];