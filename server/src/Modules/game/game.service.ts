import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CompleteQuizEvent } from 'src/Events/quiz.events';
import { UserCreatedEvent } from 'src/Events/user.events';
import { QuizRepository } from '../shared/database/Repositories/Quiz/quiz.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class GameService {
	constructor(
		private readonly userService: UsersService,
		private readonly quizRepository: QuizRepository,
	) {}

    /**
     * @description - Inserts a completed quiz for the user
     * @param completeQuizEvent
     * @returns {string | Error} - Returns the completed quiz id or an error
     */
	@OnEvent('quiz.completed')
	async insertCompletedQuiz(completeQuizEvent: CompleteQuizEvent) {
		const { user_id, quiz_id } = completeQuizEvent;
		const user = await this.userService.getUserByID(user_id);
		if (user instanceof Error) throw user;
		if (!user) throw new NotFoundException('User not found');
		if (user.unlocked_quizzes.some((ref) => ref.quiz_id === quiz_id))
			throw new ConflictException('Quiz already completed');

		const newCompletedQuiz = await this.userService.insertNewCompletedQuiz(user_id, quiz_id);
		if (newCompletedQuiz instanceof Error) return newCompletedQuiz;

		return newCompletedQuiz;
	}

    /**
     * @description - Unlocks the a random quiz for the user
     * @param completeQuizEvent
     * @returns {string | Error} - Returns the unlocked quiz id or an error
     */
	@OnEvent('quiz.completed')
	async unlockNextQuiz(completeQuizEvent: CompleteQuizEvent) {
		const { user_id, quiz_id } = completeQuizEvent;
		const user = await this.userService.getUserByID(user_id);
		if (user instanceof Error) return user;
		if (!user) return new NotFoundException('User not found');
		if (user.unlocked_quizzes.some((ref) => ref.quiz_id === quiz_id))
			return new ConflictException('Quiz already completed, cannot unlock next quiz');

		const newUnlockedQuiz = await this.getRandomNewQuiz(user_id);
        if (newUnlockedQuiz instanceof Error) return newUnlockedQuiz;
        if (!newUnlockedQuiz) return new NotFoundException('No new quizzes to unlock');

        const unlockedQuiz = await this.userService.insertNewUnlockedQuiz(user_id, newUnlockedQuiz);
        if (unlockedQuiz instanceof Error) return unlockedQuiz;

        const quiz = await this.quizRepository.findOne(newUnlockedQuiz);
        if (quiz instanceof Error) return quiz;

        return quiz.title;
	}

     /**
     * @description - Unlocks the first quizzes for a new user
     * @param user_id
     * @returns {string | Error} - Returns the unlocked quiz id or an error
     */
     @OnEvent('user.created')
     async unlockFirstQuiz({user_id}: UserCreatedEvent): Promise<void | Error>{
         try {
             for (let i = 0; i < parseInt(process.env.START_QUIZ_COUNT); i++) {
                 const newUnlockedQuiz = await this.getRandomNewQuiz(user_id);
                 if (newUnlockedQuiz instanceof Error) throw newUnlockedQuiz;
                 if (!newUnlockedQuiz) throw new NotFoundException('No new quizzes to unlock');
     
                 const unlockedQuiz = await this.userService.insertNewUnlockedQuiz(user_id, newUnlockedQuiz);
                 if (unlockedQuiz instanceof Error) throw unlockedQuiz;
             }
         } catch (error) {
             return error;
         }
     }

    /**
     * @description - Gets a random quiz that the user has not unlocked yet
     * @param user_id 
     * @returns {string | Error} - Returns the quiz id or an error
     */
	private async getRandomNewQuiz(user_id: string): Promise<string | Error>{
		const user = await this.userService.getUserByID(user_id);
		if (user instanceof Error) return user;
		const unlockedQuizzes = user.unlocked_quizzes.map((ref) => ref.quiz_id);

		const allQuizzes = await this.quizRepository.findAll();
        if (allQuizzes instanceof Error) return allQuizzes;
        const allQuizzesIDs = allQuizzes.map((quiz) => quiz.id);

        const lockedQuizzes = allQuizzesIDs.filter((id) => !unlockedQuizzes.includes(id));
        if (lockedQuizzes.length === 0) return new HttpException('No new quizzes to unlock', HttpStatus.NOT_FOUND);
        const randomIndex = Math.floor(Math.random() * lockedQuizzes.length);

        return lockedQuizzes[randomIndex];
	}
}
