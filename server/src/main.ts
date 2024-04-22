import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { create } from 'express-handlebars';
import * as connectPGSession from 'connect-pg-simple';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { join } from 'path';
import { corsOptions } from './Configs/cors.confing';
import { ResponseInterceptor } from './Interceptors/response.interceptor';
import loggerMiddleware from './Middlewares/Logger.middleware';
import { AppModule } from './app.module';

const pgSession = connectPGSession(session);

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: corsOptions,
	});

	const hbsConfig = create({
		extname: '.hbs',
		layoutsDir: join(__dirname, 'Views/Layouts'),
		partialsDir: join(__dirname, 'Views/Partials'),
		defaultLayout: 'main',
	});

	app.use(helmet());
	app.use(loggerMiddleware);
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.use(cookieParser());

	app.useStaticAssets(join(__dirname, 'Public'));
	app.useStaticAssets(join(__dirname, 'Public/CSS'));
	app.setBaseViewsDir(join(__dirname, 'Views'));
	app.engine('hbs', hbsConfig.engine);
	app.setViewEngine('hbs');

	app.use(
		session({
			store: new pgSession({
				conString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.DATABASE_DEV_URL,
				tableName: 'user_sessions',
				createTableIfMissing: true,
				ttl: Number(process.env.SESSION_MAX_AGE),
			}),
			proxy: true,
			secret: process.env.SESSION_SECRET,
			resave: true,
			saveUninitialized: false,
			rolling: true,
			cookie: {
				maxAge: Number(process.env.SESSION_MAX_AGE),
				httpOnly: true,
			},
		}),
	);

	app.use(passport.initialize());
	app.use(passport.session());

	const config = new DocumentBuilder()
		.setTitle('Brain Blitz API')
		.setDescription('Brain Blitz API documentation')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(3000);
}
bootstrap();
