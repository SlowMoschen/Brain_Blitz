![Logo](https://github.com/SlowMoschen/Brain_Blitz/blob/main/logo.png)

>[!WARNING]  
>Application is only in German

# 🧠 Train your brain, playfully 🧠

Welcome to my quiz app! Here you can embark on a journey of playful learning by taking part in quiz games. Test your knowledge on a variety of topics as you compete against the clock - the quizzes are set with an exciting time limit to keep you on your toes. Correct answers not only increase your score but also give you a sense of achievement, while wrong answers challenge you to improve. Join us in this interactive experience where learning meets fun and discover a world of trivial facts waiting to be discovered!

# Table of contents

- [**Tech Stack**](#tech-stack)
    * [TL;DR](#tl-dr)
- [**Local installation**](#local-installation)
    * [Prerequisites](#prerequisites)
    * [Deploy and start API server](#2-set-up-the-API-server)
    * [Start frontend](#3-start-frontend)
 
## Tech Stack
Here I explain which tech stack I have chosen and why.

#### TL DR

- **Frontend** 
    * [React](https://react.dev/) - set up with [Vite](https://vitejs.dev/)
    * [React Router Dom](https://reactrouter.com/en/main) - HashRouter as router
    * [MaterialUI](https://mui.com/) - Components Library
    * [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) - For forms and form validation
    * [Socket IO Client](https://socket.io/) - For live notifications

- **Backend**
    * [NestJS](https://nestjs.com/) - As the most robust backend framework that already brings many things with it
    * [Express-Session](https://www.npmjs.com/package/express-session) - Session based authorization
    * [Passport JS](https://www.passportjs.org/) - With a local strategy for user authentication
    * [Drizzle ORM](https://orm.drizzle.team/) - ORM for database migration and querying
    * [Nodemailer](https://www.nodemailer.com/) - Enables easy sending of e-mails

- **DevOps**
    * [PostgreSQL](https://www.postgresql.org/) & [Neon](https://neon.tech/) - Database & database host
    * [Ubuntu](https://ubuntu.com/) Linux server with [NGINX](https://www.nginx.com/) reverse proxy to route requests to my API server
    * HTTPS is set up with [Certbot](https://certbot.eff.org/)
 
## Local installation

This guide explains how to get the application running locally.

### Prerequisites
The following things are required:

 - Code editor of your choice
 - NodeJS installed - [download here](https://nodejs.org/en/download)
 - PostgreSQL installed and local database set up - [Download here](https://www.postgresql.org/download/)

### 1. clone repository locally

```
git clone https://github.com/SlowMoschen/Brain_Blitz.git
```

### 2. set up the API server
This explains how to start the API server

#### 2.1 change to the `./server` folder
```
cd ./server
```

#### 2.2 Environment variables

To successfully start the API server you need to create an `.env` file in the `./server` folder and set the following variables.

Replace all values in brackets with <> with yours.
You can create the `SESSION_SECRET` with the `crypto` node module or you can leave it as it is, but this is not safe for production.

```
NODE_ENV=development
PORT=3000
DATABASE_URL=<PRODUKTION DB URL>
DATABASE_DEV_URL=<LOKALE DB URL>
SESSION_SECRET=<SUPER_SAVE_SECRET>
JWT_SECRET=<SUPER_SAVE_SECRET>
SESSION_MAX_AGE=86400000 # 24 hours
EMAIL_USER=<Your email to send from>
EMAIL_PASS=<password of email>
EMAIL_HOST=<SMTP Host>
EMAIL_PORT=<PORT>
BASE_CONTACT_URL="http://localhost:5713/#/contact"
LOGIN_REDIRECT_URL="http://localhost:5713/#/auth/signin"
BASE_VERIFICATION_URL=http://localhost:3000/auth/verify-email
BASE_PASSWORD_RESET_URL=http://localhost:3000/auth/reset-password
ADMIN_PW=<SUPER_SAVE_PASSWORD>
```

#### 2.3 Installing node packages

```
npm i
```

#### 2.4 Migrate database with tables

If there is no migration in the `./DB/migrations` folder, the following script must be executed
```
npm run db:generate
```

The database can be migrated with this script
```
npm run db:migrate
```

If the migration was successful you can fill the database with data
```
npm run db:seed
```

Start #### 2.5 Server in development mode

```
npm run start:dev
```

The server should now be accessible at `http://localhost:3000` If everything went correctly, you can see which modules have been initialized and which endpoints have been mapped.

The MailService will throw an error, but this can be ignored. I have not yet found the cause myself, because the module works perfectly.

### 3. start frontend

#### 3.1 change to the `./client` folder

```
cd ../client
```

#### 3.2 Install node packages

```
npm i
```

#### 3.3 Starting the Vite development server

```
npm run dev
```

The server can now be reached at `http://localhost:5713`.
