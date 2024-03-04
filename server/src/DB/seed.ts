import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { env } from '../Configs/env.config';

const DB_URL =
  env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
  connectionString: DB_URL,
});

const db = drizzle(client);

const main = async () => {
  try {
    await client.connect();
    console.log('Connected to database');

    const queriedUsers = await queryUsersWithAllTables();
    console.log(queriedUsers);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};
main();

async function queryUsersWithAllTables() {
  try {
    
  } catch (err) {
    console.error(err);
  }
}
