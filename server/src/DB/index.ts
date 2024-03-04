import { Client } from "pg";
import { drizzle } from 'drizzle-orm/node-postgres'

const DB_URL = process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.DATABASE_DEV_URL;

export const client = new Client({
    connectionString: DB_URL
});

export const db = drizzle(client)
