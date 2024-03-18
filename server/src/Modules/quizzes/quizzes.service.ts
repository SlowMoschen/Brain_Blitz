import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { QuizRepository } from '../shared/database/Repositories/Quiz/quiz.repository';
import { SelectQuiz } from 'src/Utils/Types/model.types';
import { CreateQuizDTO } from './dto/create-quiz.dto';
import { UpdateQuizDTO } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
	constructor(
		private readonly quizRepository: QuizRepository,
		private readonly eventEmitter: EventEmitter2,
	) {}

    async getAllQuizzes(): Promise<SelectQuiz[] | Error> {
        const quizzes = await this.quizRepository.findAll();
        if (quizzes instanceof Error) return quizzes;
        if (quizzes.length === 0) return new NotFoundException('No quizzes found');
        return quizzes;
    }

    async getQuiz(id: string): Promise<SelectQuiz | Error> {
        const quiz = await this.quizRepository.findOne(id);
        if (quiz instanceof Error) return quiz;
        if (!quiz) return new NotFoundException('Quiz not found');
        return quiz;
    }

    async createQuiz(quiz: CreateQuizDTO): Promise<string | Error> {
        const createdQuiz = await this.quizRepository.insertOne(quiz);
        if (createdQuiz instanceof Error) return createdQuiz;
        return createdQuiz;
    }

    async updateQuiz(id: string, quiz: UpdateQuizDTO): Promise<string | Error> {
        const updatedQuiz = await this.quizRepository.updateOne(id, quiz);
        if (updatedQuiz instanceof Error) return updatedQuiz;
        return updatedQuiz;
    }

    async deleteQuiz(id: string): Promise<string | Error> {
        const deletedQuiz = await this.quizRepository.deleteOne(id);
        if (deletedQuiz instanceof Error) return deletedQuiz;
        return deletedQuiz;
    }

    async getQuizzesByCategory(category: string): Promise<SelectQuiz[] | Error> {
        const quizzes = await this.quizRepository.findByCategory(category);
        if (quizzes instanceof Error) return quizzes;
        if (quizzes.length === 0) return new NotFoundException('No quizzes found');
        return quizzes;
    }

	completeQuiz(quizId: string, userId: string): string | Error {
		this.eventEmitter.emit('quiz.completed', { quizId, userId });
		return 'Quiz completed';
	}
}
