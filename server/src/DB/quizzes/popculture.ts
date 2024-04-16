import { desc } from 'drizzle-orm';

//MARK: Popkulturikonen
const popcultureIcons = {
	title: 'Popkulturikonen',
	description: 'Ikonen der Popkulturgenerationen',
	category: 'Popkultur',
	questions: [
		{
			question: 'Wer ist der Schöpfer der berühmten Cartoon-Figur Mickey Mouse?',
			answers: ['Walt Disney', 'Chuck Jones', 'Matt Groening', 'Hayao Miyazaki'],
			correct_answer: 'Walt Disney',
		},
		{
			question: "Welcher Musiker wird oft als 'King of Pop' bezeichnet?",
			answers: ['Michael Jackson', 'Elvis Presley', 'Madonna', 'David Bowie'],
			correct_answer: 'Michael Jackson',
		},
		{
			question:
				'Welche Band gilt als eine der einflussreichsten und erfolgreichsten Rockbands aller Zeiten und wurde 1965 in London gegründet?',
			answers: ['The Rolling Stones', 'The Beatles', 'Led Zeppelin', 'Pink Floyd'],
			correct_answer: 'The Rolling Stones',
		},
		{
			question: "Welcher Regisseur ist bekannt für Filme wie 'Pulp Fiction' und 'Kill Bill'?",
			answers: ['Quentin Tarantino', 'Martin Scorsese', 'Steven Spielberg', 'Christopher Nolan'],
			correct_answer: 'Quentin Tarantino',
		},
		{
			question: "Welche Schauspielerin spielte die Hauptrolle in der Filmreihe 'Die Tribute von Panem'?",
			answers: ['Jennifer Lawrence', 'Emma Stone', 'Scarlett Johansson', 'Natalie Portman'],
			correct_answer: 'Jennifer Lawrence',
		},
		{
			question: "Welcher Autor ist bekannt für die 'Harry Potter' Buchreihe?",
			answers: ['J.K. Rowling', 'Stephen King', 'George R.R. Martin', 'Suzanne Collins'],
			correct_answer: 'J.K. Rowling',
		},
		{
			question: "Welche Band ist bekannt für Hits wie 'Bohemian Rhapsody' und 'We Will Rock You'?",
			answers: ['Queen', 'The Beatles', 'Led Zeppelin', 'AC/DC'],
			correct_answer: 'Queen',
		},
		{
			question:
				"Welche Schauspielerin ist bekannt für ihre Rolle als Carrie Bradshaw in der Fernsehserie 'Sex and the City'?",
			answers: ['Sarah Jessica Parker', 'Jennifer Aniston', 'Julia Roberts', 'Reese Witherspoon'],
			correct_answer: 'Sarah Jessica Parker',
		},
		{
			question: "Welcher Künstler ist bekannt für Werke wie 'Campbell's Soup Cans' und 'Marilyn Diptych'?",
			answers: ['Pablo Picasso', 'Salvador Dalí', 'Andy Warhol', 'Vincent van Gogh'],
			correct_answer: 'Andy Warhol',
		},
		{
			question:
				'Welche Fernsehserie, die von 2004 bis 2010 lief, dreht sich um das Leben von vier Frauen in New York City?',
			answers: ['Sex and the City', 'Friends', 'Desperate Housewives', 'Gossip Girl'],
			correct_answer: 'Sex and the City',
		},
	],
};

// MARK: Ikonische Filmmomente
const iconicMovieMoments = {
	title: 'Ikonische Filmmomente',
	description: 'Unvergessliche Momente aus der Filmgeschichte',
	category: 'Popkultur',
	questions: [
		{
			question: "In welchem Film tanzen John Travolta und Uma Thurman zu 'You Never Can Tell' von Chuck Berry?",
			answers: ['Pulp Fiction', 'Saturday Night Fever', 'Grease', 'Reservoir Dogs'],
			correct_answer: 'Pulp Fiction',
		},
		{
			question:
				"Welcher Film enthält die ikonische Szene, in der Leonardo DiCaprio und Kate Winslet sich am Bug eines Schiffes halten und 'My Heart Will Go On' gespielt wird?",
			answers: ['Titanic', 'Inception', 'The Revenant', 'Catch Me If You Can'],
			correct_answer: 'Titanic',
		},
		{
			question: "In welchem Film sagt Tom Hanks' Charakter den berühmten Satz 'Life is like a box of chocolates'?",
			answers: ['Forrest Gump', 'Cast Away', 'Big', 'Saving Private Ryan'],
			correct_answer: 'Forrest Gump',
		},
		{
			question:
				'Welcher Film enthält die berühmte Szene, in der Marilyn Monroe ihr weißes Kleid über einem Lüftungsschacht flattern lässt?',
			answers: [
				'Das verflixte siebente Jahr (The Seven Year Itch)',
				'Manche mögen’s heiß (Some Like It Hot)',
				'Niagara',
				'Wie angelt man sich einen Millionär (How to Marry a Millionaire)',
			],
			correct_answer: 'Das verflixte siebente Jahr (The Seven Year Itch)',
		},
		{
			question: 'In welchem Film singt Gene Kelly im Regen und tanzt mit einem Regenschirm?',
			answers: ["Singin' in the Rain", 'An American in Paris', 'On the Town', 'Brigadoon'],
			correct_answer: "Singin' in the Rain",
		},
		{
			question: "Welcher Film beinhaltet die Szene, in der Darth Vader seinem Sohn sagt 'Ich bin dein Vater'?",
			answers: [
				'Das Imperium schlägt zurück (The Empire Strikes Back)',
				'Eine neue Hoffnung (A New Hope)',
				'Die Rückkehr der Jedi-Ritter (Return of the Jedi)',
				'Die dunkle Bedrohung (The Phantom Menace)',
			],
			correct_answer: 'Das Imperium schlägt zurück (The Empire Strikes Back)',
		},
		{
			question:
				"Welcher Film enthält die berühmte Tanzszene von Uma Thurman und John Travolta zum Song 'Twist and Shout'?",
			answers: ['Pulp Fiction', 'Reservoir Dogs', 'From Dusk Till Dawn', 'Saturday Night Fever'],
			correct_answer: 'Saturday Night Fever',
		},
		{
			question:
				"Welcher Film beinhaltet die berühmte Szene, in der Jack Nicholson sein Gesicht durch eine Tür bricht und 'Here's Johnny!' ruft?",
			answers: ['Shining', 'Das Schweigen der Lämmer', 'Der Exorzist', 'Psycho'],
			correct_answer: 'Shining',
		},
		{
			question: 'Welcher Film enthält die Szene, in der E.T. auf einem Fahrrad vor dem Mond fliegt?',
			answers: [
				'E.T. – Der Außerirdische (E.T. the Extra-Terrestrial)',
				'Star Wars: Eine neue Hoffnung',
				'Der weiße Hai',
				'Zurück in die Zukunft',
			],
			correct_answer: 'E.T. – Der Außerirdische (E.T. the Extra-Terrestrial)',
		},
		{
			question: "Welcher Film beinhaltet die Szene, in der Arnold Schwarzenegger sagt 'Hasta la vista, Baby'?",
			answers: [
				'Terminator 2 – Tag der Abrechnung (Terminator 2: Judgment Day)',
				'Predator',
				'Total Recall',
				'Last Action Hero',
			],
			correct_answer: 'Terminator 2 – Tag der Abrechnung (Terminator 2: Judgment Day)',
		},
	],
};

// MARK: Ikonische Serienmomente
const iconicTVShowMoments = {
	title: 'Ikonische Serienmomente',
	description: 'Unvergessliche Momente aus der Seriengeschichte',
	category: 'Popkultur',
	questions: [
		{
			question:
				'Welche Fernsehserie handelt von einem Hochschulchemielehrer, der zur Drogenherstellung übergeht und zu einem mächtigen Drogenbaron wird?',
			answers: ['Breaking Bad', 'The Sopranos', 'The Wire', 'Mad Men'],
			correct_answer: 'Breaking Bad',
		},
		{
			question: 'In welcher Fernsehserie treffen sich sechs Freunde regelmäßig in einem Café namens Central Perk?',
			answers: ['Friends', 'How I Met Your Mother', 'The Big Bang Theory', 'Seinfeld'],
			correct_answer: 'Friends',
		},
		{
			question:
				'Welche Fernsehserie spielt in einer alternativen Realität, in der Deutschland und Japan den Zweiten Weltkrieg gewonnen haben?',
			answers: ['The Man in the High Castle', 'Stranger Things', 'Black Mirror', 'Westworld'],
			correct_answer: 'The Man in the High Castle',
		},
		{
			question:
				'Welche Fernsehserie handelt von einem Team von FBI-Agenten, das außergewöhnliche Ereignisse und Verbrechen untersucht?',
			answers: ['Akte X (The X-Files)', 'Criminal Minds', 'Bones', 'NCIS'],
			correct_answer: 'Akte X (The X-Files)',
		},
		{
			question:
				"Welche Fernsehserie spielt in einer Welt, in der Superhelden alltäglich sind und sich die Handlung um die Mitglieder der Gruppe 'The Boys' dreht, die gegen korrupte Superhelden kämpfen?",
			answers: ['The Boys', 'Umbrella Academy', 'Titans', 'Doom Patrol'],
			correct_answer: 'The Boys',
		},
		{
			question:
				'In welcher Fernsehserie reist die titelgebende Figur durch die Zeit, um historische Ereignisse zu korrigieren?',
			answers: ['Doctor Who', 'Timeless', 'Outlander', 'The Flash'],
			correct_answer: 'Doctor Who',
		},
		{
			question:
				'Welche Fernsehserie handelt von einem fiktiven Adelsgeschlecht, das um die Kontrolle über den Eisernen Thron kämpft?',
			answers: ['Game of Thrones', 'Vikings', 'The Crown', 'Spartacus'],
			correct_answer: 'Game of Thrones',
		},
		{
			question:
				'Welche Fernsehserie handelt von einer Gruppe von Freunden, die in New York City leben und deren Leben und Liebesabenteuer im Mittelpunkt stehen?',
			answers: ['Friends', 'How I Met Your Mother', 'The Big Bang Theory', 'Seinfeld'],
			correct_answer: 'How I Met Your Mother',
		},
		{
			question:
				'In welcher Fernsehserie versucht eine Gruppe Überlebender, sich in einer postapokalyptischen Welt, die von Zombies überrannt ist, zurechtzufinden?',
			answers: ['The Walking Dead', 'Fear the Walking Dead', 'Z Nation', 'The Last Man on Earth'],
			correct_answer: 'The Walking Dead',
		},
		{
			question:
				'Welche Fernsehserie handelt von einer Gruppe von Menschen, die auf einer mysteriösen, unbewohnten Insel stranden und versuchen, zu überleben und ihre Vergangenheit zu bewältigen?',
			answers: ['Lost', 'Survivor', 'Cast Away', "Gilligan's Island"],
			correct_answer: 'Lost',
		},
	],
};

// MARK: Musiklegenden
const musicLegends = {
	title: 'Musiklegenden',
	description: 'Legenden der Musikgeschichte',
	category: 'Popkultur',
	questions: [
		{
			question: "Welcher Musiker wurde als 'The King of Rock and Roll' bekannt?",
			answers: ['Elvis Presley', 'Michael Jackson', 'Bob Dylan', 'Bruce Springsteen'],
			correct_answer: 'Elvis Presley',
		},
		{
			question:
				"Welcher Künstler wird oft als 'The Boss' bezeichnet und ist bekannt für Hits wie 'Born in the U.S.A.' und 'Dancing in the Dark'?",
			answers: ['Bruce Springsteen', 'Bob Dylan', 'Mick Jagger', 'David Bowie'],
			correct_answer: 'Bruce Springsteen',
		},
		{
			question: "Welche Band ist bekannt für Hits wie 'Stairway to Heaven' und 'Whole Lotta Love'?",
			answers: ['Led Zeppelin', 'The Rolling Stones', 'Pink Floyd', 'The Beatles'],
			correct_answer: 'Led Zeppelin',
		},
		{
			question:
				"Welche Sängerin wird oft als 'Queen of Pop' bezeichnet und ist bekannt für Hits wie 'Like a Virgin' und 'Vogue'?",
			answers: ['Madonna', 'Whitney Houston', 'Beyoncé', 'Rihanna'],
			correct_answer: 'Madonna',
		},
		{
			question: "Welche Band ist bekannt für Alben wie 'The Dark Side of the Moon' und 'The Wall'?",
			answers: ['Pink Floyd', 'The Beatles', 'The Rolling Stones', 'Queen'],
			correct_answer: 'Pink Floyd',
		},
		{
			question: "Welcher Musiker ist bekannt für Hits wie 'Purple Haze' und 'Hey Joe'?",
			answers: ['Jimi Hendrix', 'Eric Clapton', 'Jimmy Page', 'Keith Richards'],
			correct_answer: 'Jimi Hendrix',
		},
		{
			question: "Welcher Sänger und Songschreiber ist bekannt für Hits wie 'Imagine' und 'Hey Jude'?",
			answers: ['John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr'],
			correct_answer: 'John Lennon',
		},
		{
			question:
				'Welche Band wurde in den 1960er Jahren in Liverpool gegründet und ist eine der einflussreichsten und erfolgreichsten Bands der Musikgeschichte?',
			answers: ['The Beatles', 'The Rolling Stones', 'Led Zeppelin', 'Queen'],
			correct_answer: 'The Beatles',
		},
		{
			question: "Welcher Musiker ist bekannt für Hits wie 'Thriller' und 'Billie Jean'?",
			answers: ['Michael Jackson', 'Prince', 'Stevie Wonder', 'David Bowie'],
			correct_answer: 'Michael Jackson',
		},
		{
			question: "Welche Sängerin ist bekannt für Hits wie 'I Will Always Love You' und 'The Greatest Love of All'?",
			answers: ['Whitney Houston', 'Mariah Carey', 'Celine Dion', 'Aretha Franklin'],
			correct_answer: 'Whitney Houston',
		},
	],
};

// MARK: Literaturlegenden
const literaryLegends = {
	title: 'Literaturlegenden',
	description: 'Große Autoren und ihre Werke',
	category: 'Popkultur',
	questions: [
		{
			question: "Welcher Autor ist für Werke wie 'Die Abenteuer des Tom Sawyer' und 'Huckleberry Finn' bekannt?",
			answers: ['Mark Twain', 'Charles Dickens', 'Jane Austen', 'Ernest Hemingway'],
			correct_answer: 'Mark Twain',
		},
		{
			question: "Welche Schriftstellerin ist für Romane wie 'Stolz und Vorurteil' und 'Emma' bekannt?",
			answers: ['Jane Austen', 'Emily Brontë', 'Charlotte Brontë', 'Virginia Woolf'],
			correct_answer: 'Jane Austen',
		},
		{
			question: "Welcher Schriftsteller ist für die 'Harry Potter' Buchreihe bekannt?",
			answers: ['J.K. Rowling', 'George R.R. Martin', 'Stephen King', 'J.R.R. Tolkien'],
			correct_answer: 'J.K. Rowling',
		},
		{
			question: "Welcher Schriftsteller ist bekannt für Romane wie '1984' und 'Farm der Tiere'?",
			answers: ['George Orwell', 'Aldous Huxley', 'Franz Kafka', 'Ray Bradbury'],
			correct_answer: 'George Orwell',
		},
		{
			question: "Welcher Schriftsteller ist für Werke wie 'Der große Gatsby' und 'Zärtlich ist die Nacht' bekannt?",
			answers: ['F. Scott Fitzgerald', 'Ernest Hemingway', 'John Steinbeck', 'William Faulkner'],
			correct_answer: 'F. Scott Fitzgerald',
		},
		{
			question: "Welcher Schriftsteller schuf das Fantasy-Universum von 'Der Herr der Ringe'?",
			answers: ['J.R.R. Tolkien', 'C.S. Lewis', 'Philip Pullman', 'Terry Pratchett'],
			correct_answer: 'J.R.R. Tolkien',
		},
		{
			question:
				"Welche Schriftstellerin ist bekannt für Romane wie 'Die Frau im Orientexpress' und 'Ein unvergänglicher Sommer'?",
			answers: ['Agatha Christie', 'Mary Higgins Clark', 'Gillian Flynn', 'Patricia Cornwell'],
			correct_answer: 'Agatha Christie',
		},
		{
			question: 'Welcher Schriftsteller schuf die Figur des Sherlock Holmes?',
			answers: ['Arthur Conan Doyle', 'Agatha Christie', 'Edgar Allan Poe', 'Raymond Chandler'],
			correct_answer: 'Arthur Conan Doyle',
		},
		{
			question: "Welcher Schriftsteller ist bekannt für die 'Chroniken von Narnia'-Reihe?",
			answers: ['C.S. Lewis', 'J.K. Rowling', 'Philip Pullman', 'Roald Dahl'],
			correct_answer: 'C.S. Lewis',
		},
		{
			question: "Welcher Schriftsteller ist für Romane wie 'Krieg und Frieden' und 'Anna Karenina' bekannt?",
			answers: ['Leo Tolstoi', 'Fjodor Dostojewski', 'Marcel Proust', 'James Joyce'],
			correct_answer: 'Leo Tolstoi',
		},
	],
};

export const popcultureQuizzes = [popcultureIcons, iconicMovieMoments, iconicTVShowMoments, musicLegends, literaryLegends];