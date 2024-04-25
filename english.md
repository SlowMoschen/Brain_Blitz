![Logo](https://github.com/SlowMoschen/Brain_Blitz/blob/main/logo.png)

>[!WARNING]  
>Application is only in German

# 🧠 Train your brain, playfully 🧠

Welcome to my quiz app! Here you can embark on a journey of playful learning by taking part in quiz games. Test your knowledge on a variety of topics as you compete against the clock - the quizzes are set with an exciting time limit to keep you on your toes. Correct answers not only increase your score but also give you a sense of achievement, while wrong answers challenge you to improve. Join us in this interactive experience where learning meets fun and discover a world of trivial facts waiting to be discovered!

# Table of contents

- [**Development Story**](#📖-development-story-📖)
- [**Learnings**](#💡-learnings-💡)
- [**Tech Stack**](#👩‍💻-tech-stack-👩‍💻)
    * [TL;DR](#tl-dr)
- [**Local installation**](#🚀-local-installation-🚀)
    * [Prerequisites](#prerequisites)
    * [Deploy and start API server](#2-set-up-the-API-server)
    * [Start frontend](#3-start-frontend)

## 📖 Development Story 📖

It is with great pride that I present my largest and most complex project, which is also my final project for my web developer training course. The idea for this project came from one of my smaller site projects. Since learning the questions for the theory exam of the course was only possible via a PDF, I developed a small quiz application, formatted the questions and uploaded them to a MongoDB database. [Gitlab link](https://gitlab.com/SlowMoschen/wifi_fragebogen)

At the beginning of February, I started brainstorming what my project could look like and which frameworks I would like to implement it in. It was immediately clear to me that I wanted to focus more on Typescript and its type safety in order to better understand this superset. In mid-February, I started with the requirements management and the design of the database. At that time, I was only familiar with MongoDB, so that was my first choice. However, I found that I was normalizing more and more of my data, which led me to the conclusion that I would be better served with a SQL database. So I decided to use Neon as my database host and PostgreSQL as my database format. At the beginning of March, I started writing my backend.

Once I was happy with my backend, I turned my attention to coding the frontend. I had already created the homepage as it looks today once in pure HTML, CSS and JS, which made the build relatively quick. But when I had finished some of the pages on the homepage, I decided to switch to a component library. This cost me an extra day's work, but it was definitely worth it.

In mid-April, the time had finally come: I was able to dedicate myself to DevOps tasks. I had already rented an Ubuntu Linux server to run the backend of my portfolio site and the quiz project. I had secured the domain when I started working on the project. On 16.04, the website was live on the Internet. First I showed the website to a few friends and got feedback, which I immediately implemented and updated. Through these small tests, the website was ready and I was able to send a big message to about 30 people who could test my web application. Since then, I have continued to gather feedback and update the website with small design and feature improvements.
 
## 💡 Learnings 💡

In my project, I ventured deeper into the world of web software development by writing it entirely in Typescript. I used NestJS as a backend framework, which I really like. Even though it might be overkill for some projects, it offers huge advantages for large microservices or monolithic API servers. The modular structure of the backend was particularly helpful.

I worked intensively with SQL databases, implemented role-based authentication and worked with ORM tools such as Drizzle to interact efficiently with the database.

In the frontend, I used the latest version of React Router Dom and worked with a component library to improve the user interface. Tools like React Hook Form and Zod helped me to simplify and validate forms.

On the infrastructure side, I set up a Linux server with a reverse proxy from Nginx and ensured secure communication via HTTPS certificates using Certbot. In addition, I set up a comprehensive continuous deployment pipeline with GitHub actions for the frontend and backend to get changes into production quickly and efficiently.

Overall, I not only gained technical skills such as Typescript, SQL, React and Linux server administration, but also put important concepts such as modular development, security and DevOps into practice. These experiences are extremely valuable and will certainly help me in my future career as a web developer.

## 👩‍💻 Tech Stack 👩‍💻
Here I explain which tech stack I have chosen and why.

#### TL DR

[Database ERD](https://dbdiagram.io/d/Brain-Blitz-65e4ef89cd45b569fb690792)

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
 
#### Backend

My backend tech stack includes various tools and frameworks to develop a robust and scalable backend architecture.

I initially opted for NestJS because I really liked its modular design. It allowed me to structure my backend clearly and made it easier to expand.

For database migration and communication, I used Drizzle as an ORM. With its powerful features, I was able to interact efficiently with my database.

Handlebars was my choice for rendering server-side views, such as password reset, mail templates and mail confirmations. It proved to be a reliable tool for designing these important user interfaces.

Nodemailer made it easy for me to send emails to users and my service mail account. Its ease of use and flexibility made it the perfect solution for this task.

For authentication, I relied on Passport with the Local strategy. This combination gave me a solid foundation for user authentication and authorization.

Bcrypt was essential for hashing and comparing passwords, which significantly improved the security of my application.

Additionally, I used some built-in modules of NestJS like JWT, EventEmitter, Swagger documentation, WebGateWays with SocketIO. These modules facilitated the implementation of important functions and ensured smooth communication between the different parts of my application.

To ensure the security of my endpoints, I used the built-in throttler, which is limited to 25 requests per minute. This allowed me to fend off potential attacks and optimize the performance of my application.

Overall, my backend tech stack provides a solid foundation for a powerful and secure web application.

#### Frontend

I decided to use React for my front-end development as it gave me the flexibility to make customizations and I was already somewhat familiar with it.

To enable navigation within my single-page application (SPA), I used React Router Dom, choosing a HashRouter to ensure smooth redirects without making server requests on page load.

For HTTP requests, I used Tenstack React Query. This library allows me to keep certain data in the cache, invalidate it specifically and retrieve it again, which improves the performance of my application.

As a component library, I chose Material UI, which I customized with a custom theme. This allowed me to design an aesthetically pleasing user interface that integrates seamlessly into my application.

For forms, I used React Hook Form and Zod in line with Material UI to achieve a beautiful design and facilitate form validation and error handling.

For real-time communication with the backend, I used the Socket.IO client, which allows me to implement real-time notifications in my application and ensure a responsive user experience.

## 🚀 Local installation 🚀

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
