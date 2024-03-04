import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { env } from '../Configs/env.config';
import * as schema from '../Models/_index';
import * as tables from '../Models/_tables';

const DB_URL =
  env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
  connectionString: DB_URL,
});

const db = drizzle(client, { schema });

const clearDB = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    const reveresedTables = Object.keys(tables).reverse();
    
    for (const table of reveresedTables) {
      await db.delete(tables[table]);
    }
    
    console.log('Database cleared');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};
clearDB();