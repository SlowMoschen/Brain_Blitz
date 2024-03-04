import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { env } from '../Configs/env.config';


const DB_URL =
  env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
  connectionString: DB_URL,
});

const db = drizzle(client);

export const clearDB = async () => {
  try {
    await client.connect();
    
    console.log('Database cleared');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};
clearDB();