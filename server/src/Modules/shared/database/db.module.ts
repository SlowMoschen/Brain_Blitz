import { Module } from "@nestjs/common";
import { databaseProvider } from "./database.provider";
import { DB_CONNECTION } from "src/Utils/constants";

@Module({
    imports: [],
    providers: [databaseProvider],
    exports: [DB_CONNECTION],
})
export class DatabaseModule {}