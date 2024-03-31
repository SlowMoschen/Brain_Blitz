import { Module } from "@nestjs/common";
import exp from "constants";
import { StringService } from "./string.service";

@Module({
    imports: [],
    controllers: [],
    providers: [StringService],
    exports: [StringService]
})
export class StringModule {}