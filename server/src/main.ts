import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import loggerMiddleware from './Middlewares/Logger.Middleware';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectMongo from 'connect-mongodb-session';
const MongoDBStore = connectMongo(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: '*',
    credentials: true,
  } });

  app.use(helmet());
  app.use(loggerMiddleware);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: process.env.SESSION_MAX_AGE,
      },
      store: new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions',
        expires: process.env.SESSION_MAX_AGE,
      }),
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
