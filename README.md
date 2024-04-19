
![Logo](https://github.com/SlowMoschen/Brain_Blitz/blob/main/logo.png)


# 🧠 Train your brain, playfully  🧠

Willkommen bei meiner Quiz-Anwendung! Hier kannst du dich auf eine Reise des spielerischen Lernens begeben, indem du an Quizspielen teilnimmst. Testen dein Wissen über eine Vielzahl von Themen, während du gegen die Zeit antrittst - die Quizze sind mit einem spannenden Zeitlimit versehen, um dich auf Trab zu halten. Richtige Antworten erhöhen nicht nur deine Punktezahl, sondern geben dir auch ein Erfolgserlebnis, während falsche Antworten dich herausfordern, dich zu verbessern. Begleite uns bei diesem interaktiven Erlebnis, bei dem Lernen auf Spaß trifft, und entdecke eine Welt voller trivialer Fakten, die darauf warten, entdeckt zu werden!



# Inhaltsverzeichnis

- [**Tech Stack**](#tech-stack)
    * [TL;DR](#tl-dr)
- [**Lokale installation**](#lokale-installation)
    * [Vorraussetzungen](#vorraussetzungen)
    * [API Server ausetzten und starten](#2-api-server-aufsetzen)
    * [Frontend starten](#3-frontend-starten)

## Tech Stack
Hier erkläre ich für welchen Tech Stack ich mich entschieden habe uns warum.

#### TL DR

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

## Lokale installation

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
SESSION_MAX_AGE=86400000 # 24 hours
BASE_CONTACT_URL="http://localhost:5713/#/contact"
LOGIN_REDIRECT_URL="http://localhost:5713/#/auth/signin"
BASE_VERIFICATION_URL=http://localhost:3000/auth/verify-email
BASE_PASSWORD_RESET_URL=http://localhost:3000/auth/reset-password
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


