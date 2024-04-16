import { env } from '../Configs/env.config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { c } from 'tar';

const DB_URL = env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
	connectionString: DB_URL,
});

const db = drizzle(client);

const main = async () => {
	try {
		await client.connect();
		await migrate(db, { migrationsFolder: 'src/DB/migrations' });
		console.log('Migration complete');
	} catch (err) {
		console.error(err);
		console.error(err.stack);
	} finally {
		await client.end();
	}
};

main();
