
![Logo](https://github.com/SlowMoschen/Brain_Blitz/blob/main/logo.png)

[English ReadME](https://github.com/SlowMoschen/Brain_Blitz/blob/main/english.md)

# 🧠 Train your brain, playfully  🧠

Willkommen bei meiner Quiz-Anwendung! Hier kannst du dich auf eine Reise des spielerischen Lernens begeben, indem du an Quizspielen teilnimmst. Testen dein Wissen über eine Vielzahl von Themen, während du gegen die Zeit antrittst - die Quizze sind mit einem spannenden Zeitlimit versehen, um dich auf Trab zu halten. Richtige Antworten erhöhen nicht nur deine Punktezahl, sondern geben dir auch ein Erfolgserlebnis, während falsche Antworten dich herausfordern, dich zu verbessern. Begleite uns bei diesem interaktiven Erlebnis, bei dem Lernen auf Spaß trifft, und entdecke eine Welt voller trivialer Fakten, die darauf warten, entdeckt zu werden!



# Inhaltsverzeichnis

- [**Geschichte**](#📖-development-geschichte-📖)
- [**Erkenntnisse und Fähigkeiten**](#💡-erkenntnisse-und-fähigkeiten-💡)
- [**Tech Stack**](#-tech-stack-)
    * [TL;DR](#tl-dr)
    * [Backend](#backend)
    * [Frontend](#frontend)
- [**Lokale installation**](#🚀-lokale-installation-🚀)
    * [Vorraussetzungen](#vorraussetzungen)
    * [API Server ausetzten und starten](#2-api-server-aufsetzen)
    * [Frontend starten](#3-frontend-starten)

## 📖 Development Geschichte 📖

Mit großem Stolz präsentiere ich mein größtes und komplexestes Projekt, das zugleich mein Abschlussprojekt für meinen Ausbildungskurs zum Web Developer darstellt. Die Idee für dieses Projekt entstand aus einem meiner kleineren Seitenprojekte. Da das Lernen der Fragen für die Theorieprüfung des Kurses nur über eine PDF möglich war, habe ich eine kleine Quiz-Applikation entwickelt, die Fragen formatiert und in eine MongoDB-Datenbank hochgeladen. [Gitlab link](https://gitlab.com/SlowMoschen/wifi_fragebogen)

Anfang Februar begann ich dann damit, zu brainstormen, wie mein Projekt aussehen könnte und in welchen Frameworks ich es umsetzen möchte. Mir war sofort klar, dass ich verstärkt auf Typescript und dessen Typsicherheit setzen wollte, um dieses Superset besser zu verstehen. Mitte Februar begann ich dann mit dem Anforderungsmanagement und dem Design der Datenbank. Zu dieser Zeit war ich nur mit MongoDB vertraut, daher war dies meine erste Wahl. Jedoch stellte ich fest, dass ich immer mehr meiner Daten normalisierte, was mich zu dem Entschluss brachte, dass ich mit einer SQL-Datenbank besser bedient wäre. Daher entschied ich mich für Neon als Datenbank-Host und PostgreSQL als Datenbankformat. Anfang März begann ich dann mit dem Schreiben meines Backends.

Als ich mit meinem Backend zufrieden war, widmete ich mich dem Codieren des Frontends. Die Homepage, wie sie heute aussieht, hatte ich bereits einmal in reinem HTML, CSS und JS erstellt, wodurch der Aufbau relativ schnell vonstattenging. Doch als ich einige der Seiten auf der Homepage fertiggestellt hatte, entschied ich mich für einen Wechsel zu einer Component-Library. Dies kostete mich zwar einen zusätzlichen Tag Arbeit, aber es hat sich definitiv gelohnt.

Mitte April war es dann endlich soweit: Ich konnte mich den DevOps-Aufgaben widmen. Ich hatte bereits einen Ubuntu Linux Server gemietet, auf dem das Backend meiner Portfolioseite und des Quizprojekts lief. Die Domain hatte ich gesichert, als ich mit den Arbeiten am Projekt begonnen hatte. Am 16.04 war die Webseite live im Internet verfügbar. Zunächst zeigte ich die Webseite einigen Freunden und holte mir Feedback ein, das ich sofort umsetzte und die Seite aktualisierte. Durch diese kleinen Tests war die Webseite dann bereit, und ich konnte eine große Nachricht an etwa 30 Personen senden, die meine Webanwendung testen konnten. Seitdem habe ich kontinuierlich Feedback eingeholt und die Webseite stetig mit kleinen Design- und Feature-Verbesserungen aktualisiert.

## 💡 Erkenntnisse und Fähigkeiten 💡

In meinem Projekt habe ich mich tiefer in die Welt des Web Software Development gewagt, indem ich es komplett in Typescript geschrieben habe. Dabei habe ich NestJS als Backend-Framework verwendet, das ich sehr schätze. Auch wenn es für einige Projekte vielleicht overkill ist, bietet es enorme Vorteile für große Microservices oder monolithische API-Server. Die modulare Strukturierung des Backends war dabei besonders hilfreich.

Ich habe mich intensiv mit SQL-Datenbanken beschäftigt, Rollen basierte Authentifizierung implementiert und mit ORM-Tools wie Drizzle gearbeitet, um effizient mit der Datenbank zu interagieren.

Im Frontend habe ich die neueste Version von React Router Dom genutzt und mich mit einer Component Library auseinandergesetzt, um die Benutzeroberfläche zu verbessern. Dabei haben mir Tools wie React Hook Form und Zod geholfen, Formulare zu vereinfachen und zu validieren.

Auf der Infrastrukturseite habe ich eien Linux-Server mit einem Reverse-Proxy von Nginx eingerichtet und eine sichere Kommunikation mittels HTTPS-Zertifikaten mithilfe von Certbot gewährleistet. Zusätzlich habe ich eine umfassende Continuous Deployment-Pipeline mit GitHub Actions für das Frontend und Backend aufgesetzt, um Änderungen schnell und effizient in Produktion zu bringen.

Insgesamt habe ich nicht nur technische Fähigkeiten wie Typescript, SQL, React und Linux-Serveradministration erworben, sondern auch wichtige Konzepte wie modulare Entwicklung, Sicherheit und DevOps praktisch angewendet. Diese Erfahrungen sind äußerst wertvoll und werden mich in meiner zukünftigen Karriere als Webentwickler sicherlich weiterbringen.

## 👩‍💻 Tech Stack  👩‍💻

[Datenbank ERD](https://dbdiagram.io/d/Brain-Blitz-65e4ef89cd45b569fb690792)

- **Frontend** 
    * [React](https://react.dev/) - mit [Vite](https://vitejs.dev/) aufgesetzt
    * [React Router Dom](https://reactrouter.com/en/main) - HashRouter als Router
    * [MaterialUI](https://mui.com/) - Components Library
    * [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) - Für Formulare und Form Validation
    * [Socket IO Client](https://socket.io/) - Für live Benachrichtigungen

- **Backend**
    * [NestJS](https://nestjs.com/) - Als robustest Backend Framework das viele Dinge bereits mit bringt
    * [Express-Session](https://www.npmjs.com/package/express-session) - Session basierte Autorisierung
    * [Passport JS](https://www.passportjs.org/) - Mit einer lokalen Strategie für die Authentifizierung der User
    * [Drizzle ORM](https://orm.drizzle.team/) - ORM für Datenbank migration und abfragen
    * [Nodemailer](https://www.nodemailer.com/) - Ermöglicht einfaches sende von E-Mails

- **DevOps**
    * [PostgreSQL](https://www.postgresql.org/) & [Neon](https://neon.tech/) - Datenbank & Datenbankhost
    * [Ubuntu](https://ubuntu.com/) Linux Server mit [NGINX](https://www.nginx.com/) reverse proxy um Anfragen auf meinen API Server zu leiten
    * HTTPS ist mit [Certbot](https://certbot.eff.org/) eingerichtet


## 🚀 Lokale installation 🚀

Diese Anleitung erklärt wie du die Applikation lokal zum laufen bekommst.

### Vorraussetzungen
Es werden folgende dinge vorrausgesetzt:

 - Code Editor deiner wahl
 - NodeJS installiert  - [Hier downloaden](https://nodejs.org/en/download)
 - PostgreSQL installiert und lokale Datenbank eingerichtet - [Hier downloaden](https://www.postgresql.org/download/)


### 1. Repository lokal klonen

```
git clone https://github.com/SlowMoschen/Brain_Blitz.git
```

### 2. API Server aufsetzen
Hier wird erklärt wie du den API Server starten kannst

#### 2.1 in den `./server` Ordner wechseln
```
cd ./server
```

#### 2.2 Environment Variablen

Um erfolgreich den API Server zu starten muss du eine `.env` Datei im `./server` Ordner erstellen und folgende Variablen setzten.

Ersetze alle Werte die mit <> eingeklammert sind mit deinen.
Das `SESSION_SECRET` kannst du mit dem `crypto` node modul erstellen oder du lasst das derzeitge, dies ist aber nicht sicher für Production.

```
NODE_ENV=development
PORT=3000
DATABASE_URL=<PRODUKTION DB URL>
DATABASE_DEV_URL=<LOKALE DB URL>
SESSION_SECRET=<SUPER_SAVE_SECRET>
JWT_SECRET=<SUPER_SAVE_SECRET>
SESSION_MAX_AGE=86400000 # 24 hours
EMAIL_USER=<Dein E-Mail von der mails weggeschickt werden sollen>
EMAIL_PASS=<Passwort der E-Mail>
EMAIL_HOST=<SMTP Host>
EMAIL_PORT=<PORT>
BASE_CONTACT_URL="http://localhost:5713/#/contact"
LOGIN_REDIRECT_URL="http://localhost:5713/#/auth/signin"
BASE_VERIFICATION_URL=http://localhost:3000/auth/verify-email
BASE_PASSWORD_RESET_URL=http://localhost:3000/auth/reset-password
ADMIN_PW=<SUPER_SAVE_PASSWORD>
```

#### 2.3 Nodepackages insallieren

```
npm i
```

#### 2.4 Datenbank mit Tables migrieren

Sollte keine Migration in `./DB/migrations` Ordner sein muss das folgende script ausgeführt werden
```
npm run db:generate
```

Die Datenbank kann mit diesem script migriert werden
```
npm run db:migrate
```

Wenn die migration erfolgreich durchgeführt wurde kannst du die Datenbank mit Daten füllen
```
npm run db:seed
```

#### 2.5 Server in development Modus starten

```
npm run start:dev
```

Nun sollte der Server unter `http://localhost:3000` erreichbar Wenn alles richtig gelaufen ist siehst du welche Module initializiert und welche Enpunkte gemapped wurden.

Der MailService wird einen Error werfen, dies kann aber ignoriert werden. Ich bin selbst noch nicht auf die Ursache gekommen, denn das Modul funktioniert einwandfrei.

### 3. Frontend starten

#### 3.1 in den `./client` Ordner wechseln

```
cd ../client
```

#### 3.2 Nodepackages insallieren

```
npm i
```

#### 3.3 Vite development Server starten

```
npm run dev
```

Der Server kann nun unter `http://localhost:5713` erreicht werden.


