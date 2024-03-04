import { Client } from "pg";
import { drizzle } from 'drizzle-orm/node-postgres'

const DB_URL = process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.DATABASE_DEV_URL;

const client = new Client({
    connectionString: DB_URL
});

const db = drizzle(client)

export default db;