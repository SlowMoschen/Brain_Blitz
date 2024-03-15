import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { HighscoresController } from "./highscore.controller";
import { HighscoresService } from "./highscores.service";

@Module({
    imports: [SharedModule],
    controllers: [HighscoresController],
    providers: [HighscoresService],
    exports: []
})
export class HighscoresModule {}