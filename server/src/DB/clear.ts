import { env } from '../Configs/env.config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../Models/schema';
import * as tables from '../Models/tables';

const DB_URL =
  env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
  connectionString: DB_URL,
});

const db = drizzle(client, { schema });

const main = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    
    for ( const table in tables ) {
      await db.delete(schema[table]);
    }
    
    console.log('Database cleared');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};
main();