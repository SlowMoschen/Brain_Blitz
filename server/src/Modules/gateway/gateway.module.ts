import { Module } from "@nestjs/common";
import { EventsGateway } from "./Events.gateway";
import { QuizzesModule } from "../quizzes/quizzes.module";

@Module({
    imports: [QuizzesModule],
    providers: [EventsGateway],
    exports: []
})
export class GatewayModule {}