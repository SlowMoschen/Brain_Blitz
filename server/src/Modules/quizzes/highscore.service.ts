import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { HighscoreRepository } from "../shared/database/Repositories/Highscore/highscore.repository";
import { SelectQuizHighscore } from "src/Utils/Types/model.types";
import { CreateHighscoreDTO } from "./dto/create-highscore.dto";

@Injectable()
export class HighscoreService {
  constructor(private readonly highscoreRepository: HighscoreRepository) {}

    async getHighscores(): Promise<SelectQuizHighscore[] | Error> {
        const highscores = await this.highscoreRepository.findAll();
        if (highscores instanceof Error) return highscores;
        if (highscores.length === 0) return new NotFoundException('No highscores found');
        return highscores;
    }

    async getHighscore(id: string): Promise<SelectQuizHighscore | Error> {
        const highscore = await this.highscoreRepository.findOne(id);
        if (highscore instanceof Error) return highscore;
        if (!highscore) return new NotFoundException('Highscore not found');
        return highscore;
    }

    async createHighscore(highscore: CreateHighscoreDTO): Promise<string | Error> {
        const createdHighscoreID = await this.highscoreRepository.insertOne(highscore);
        if (createdHighscoreID instanceof Error) return createdHighscoreID;
        if (!createdHighscoreID) return new HttpException('Failed to create highscore', HttpStatus.INTERNAL_SERVER_ERROR);
        return createdHighscoreID;
    }

    async deleteHighscore(id: string): Promise<string | Error> {
        const deletedHighscore = await this.highscoreRepository.deleteOne(id);
        if (deletedHighscore instanceof Error) return deletedHighscore;
        if (!deletedHighscore) return new NotFoundException('Highscore not found');
        return deletedHighscore;
    }
}