import { Module } from "@nestjs/common";
import { databaseProvider } from "./database.provider";
import { DB_CONNECTION } from "src/Utils/constants";
import { UserRepository } from "./Repositories/User/_user.repository";

@Module({
    imports: [],
    providers: [databaseProvider, UserRepository],
    exports: [DB_CONNECTION, UserRepository],
})
export class DatabaseModule {}