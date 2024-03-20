import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../shared/database/Repositories/Quiz/quiz.repository';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { UpdateQuestionDTO } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
	constructor(private readonly quizRepository: QuizRepository) {}

	async getQuestion(questionId: string) {
		return await this.quizRepository.findOneQuestion(questionId);
	}

	async createQuestion(quizId: string, question: CreateQuestionDTO): Promise<string> {
		await this.quizRepository.findOne(quizId);
		return await this.quizRepository.insertOneQuestion(quizId, question);
	}

	async updateQuestion(questionId: string, body: UpdateQuestionDTO): Promise<string> {
		return await this.quizRepository.updateOneQuestion(questionId, body);
	}

	async deleteQuestion(questionId: string): Promise<string> {
		return await this.quizRepository.deleteOneQuestion(questionId);
	}
}
