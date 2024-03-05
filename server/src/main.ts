import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import loggerMiddleware from './Middlewares/Logger.Middleware';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectPGSession from 'connect-pg-simple';
import { NestExpressApplication } from '@nestjs/platform-express';
const pgSession = connectPGSession(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  app.use(helmet());
  app.use(loggerMiddleware);

  // app.use(
  //   session({
  //     store: new pgSession({
  //       conString: process.env.DATABASE_URL,
  //       tableName: 'user_sessions',
  //       createTableIfMissing: true,
  //     }),
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: parseInt(process.env.SESSION_MAX_AGE),
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
