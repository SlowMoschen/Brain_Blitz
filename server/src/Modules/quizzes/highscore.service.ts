import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HighscoreRepository } from '../shared/database/Repositories/Highscore/highscore.repository';
import { SelectQuizHighscore } from 'src/Utils/Types/model.types';
import { CreateHighscoreDTO } from './dto/create-highscore.dto';

@Injectable()
export class HighscoreService {
	constructor(private readonly highscoreRepository: HighscoreRepository) {}

	async getHighscores(): Promise<SelectQuizHighscore[]> {
		return await this.highscoreRepository.findAll();
	}

	async getHighscoresByQuiz(quizID: string): Promise<SelectQuizHighscore[]> {
		return await this.highscoreRepository.findAllByQuiz(quizID);
	}

	async getHighscoresByUser(userID: string): Promise<SelectQuizHighscore[]> {
		return await this.highscoreRepository.findAllByUser(userID);
	}

	async getSpecificHighscore(userID: string, quizID: string): Promise<SelectQuizHighscore> {
		return await this.highscoreRepository.findOne(userID, quizID);
	}

	async createHighscore(highscore: CreateHighscoreDTO): Promise<string> {
		return await this.highscoreRepository.insertOne(highscore);
	}

	async deleteHighscore(id: string): Promise<string> {
		return await this.highscoreRepository.deleteOne(id);
	}
}
