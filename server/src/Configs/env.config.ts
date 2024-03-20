import 'dotenv/config';

export const env = {
	PORT: process.env.PORT,
	DATABASE_DEV_URL: process.env.DATABASE_DEV_URL,
	DATABASE_URL: process.env.DATABASE_URL,
	NODE_ENV: process.env.NODE_ENV,
	SESSION_SECRET: process.env.SESSION_SECRET,
	SESSION_MAX_AGE: process.env.SESSION_MAX_AGE,
};
