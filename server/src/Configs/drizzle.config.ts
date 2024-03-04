import { Config } from "drizzle-kit";

export default {
    schema: "./src/Models/**/*.ts",
    out: "./src/DB/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    }
} satisfies Config