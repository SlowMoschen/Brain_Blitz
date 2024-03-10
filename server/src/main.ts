import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import loggerMiddleware from './Middlewares/logger.middleware';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectPGSession from 'connect-pg-simple';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
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
  app.setBaseViewsDir(join(__dirname, 'Views'));
  app.setViewEngine('hbs');

  app.use(
    session({
      store: new pgSession({
        conString: process.env.DATABASE_URL,
        tableName: 'user_sessions',
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: Number(process.env.SESSION_MAX_AGE),
        sameSite: true,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
  .setTitle('Brain Blitz API')
  .setDescription('Brain Blitz API documentation')
  .setVersion('0.5.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
