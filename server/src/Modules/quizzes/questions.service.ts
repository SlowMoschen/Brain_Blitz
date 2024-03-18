import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from '../shared/database/Repositories/Quiz/quiz.repository';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { UpdateQuestionDTO } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
	constructor(private readonly quizRepository: QuizRepository) {}

	async createQuestion(quizId: string, question: CreateQuestionDTO): Promise<string | Error> {
		const quiz = await this.quizRepository.findOne(quizId);
		if (quiz instanceof Error) return quiz;
		if (!quiz) return new NotFoundException('Quiz not found');

		const questionId = await this.quizRepository.insertOneQuestion(quizId, question);
		if (questionId instanceof Error) return questionId;
		return questionId;
	}

	async updateQuestion(questionId: string, question: UpdateQuestionDTO): Promise<string | Error> {
		const updatedQuestion = await this.quizRepository.updateOneQuestion(questionId, question);
		if (updatedQuestion instanceof Error) return updatedQuestion;
		if (!updatedQuestion) return new NotFoundException('Question not found');
		return updatedQuestion;
	}

	async deleteQuestion(questionId: string): Promise<string | Error> {
		const deletedQuestion = await this.quizRepository.deleteOneQuestion(questionId);
		if (deletedQuestion instanceof Error) return deletedQuestion;
		if (!deletedQuestion) return new NotFoundException('Question not found');
		return deletedQuestion;
	}
}
