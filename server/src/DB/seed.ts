import { env } from '../Configs/env.config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../Models/schema';

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
    await db.delete(schema.users);

    const newUser = await db.insert(schema.users).values([
      {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@mail.com',
        password: 'test',
      }
    ]).returning({ id: schema.users.id })

    console.log(newUser);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};
main();