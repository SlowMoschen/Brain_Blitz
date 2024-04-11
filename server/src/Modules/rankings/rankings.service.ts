import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HighscoreService } from '../quizzes/highscore.service';
import { QuizService } from '../quizzes/quizzes.service';
import { MostPlayedQuizzes, MostPlaytime, MostPoints, PersonalRankings, QuizRankings } from 'src/Utils/Types/ranking.types';
import { SelectQuizHighscore } from 'src/Utils/Types/model.types';
import { first } from 'rxjs';

/**
 * @description - Service for getting bestlists in different categories
 */
@Injectable()
export class RankingsService {
	constructor(
		private readonly userService: UsersService,
		private readonly highscoreService: HighscoreService,
		private readonly quizService: QuizService,
	) {}

	/**
	 * @description - Gets the best points from all users
	 * @returns {Promise<MostPoints[]>} - Returns an array sorted by points
	 */
	async getBestPoints(): Promise<MostPoints[]> {
		const userStats = await this.userService.getAllStatistics();

		return userStats
			.map((t) => {
				return {
					userID: t.user_id,
					first_name: t.user.first_name,
					points: t.points,
				};
			})
			.sort((a, b) => b.points - a.points);
	}

	/**
	 * @description - Gets the best playtime from all users
	 * @returns {Promise<MostPlaytime[]>} - Returns an array sorted by playtime
	 */
	async getBestPlaytime(): Promise<MostPlaytime[]> {
		const userStats = await this.userService.getAllStatistics();

		return userStats
			.map((t) => {
				return {
					userID: t.user_id,
					first_name: t.user.first_name,
					playtime: t.total_time_played,
				};
			})
			.sort((a, b) => b.playtime - a.playtime);
	}

	/**
	 * @description - Gets the most played quizzes
	 * @returns {Promise<MostPlayedQuizzes[]>} - Returns an array sorted by times played
	 */
	async getMostPlayedQuizzes(): Promise<MostPlayedQuizzes[]> {
		const quizzes = await this.quizService.getAllQuizzes();

		return quizzes
			.map((q) => {
				return {
					quiz_id: q.id,
					quiz_name: q.title,
					times_played: q.times_played,
				};
			})
			.sort((a, b) => b.times_played - a.times_played);
	}

	/**
	 * @description - Gets the personal rankings for a user
	 * @param {string} userId
	 * @returns {Promise<PersonalRankings[]>} - Returns an array with the users personal rankings
	 */
	async getPersonalRankings(userId: string): Promise<PersonalRankings[]> {
		const highscores = await this.highscoreService.getHighscoresByUser(userId);
		const returnArray: PersonalRankings[] = [];

		for (const highscore of highscores) {
			const quizHighscores = await this.highscoreService.getHighscoresByQuiz(highscore.quiz_id);

			const indexOfUser = quizHighscores.sort((a, b) => b.score - a.score).findIndex((h) => h.id === highscore.id);
			returnArray.push({
				quiz_id: highscore.quiz_id,
				highscore_id: highscore.id,
				quiz_name: quizHighscores[indexOfUser].quiz.title,
				quiz_category: quizHighscores[indexOfUser].quiz.category,
				points: highscore.score,
				position: indexOfUser + 1,
			});
		}

		return returnArray;
	}

	/**
	 * @description - Gets the rankings of a quiz
	 * @param {string} quizId
	 * @returns {Promise<SelectQuizHighscore[]>} - Returns an array with the highscores sorted by score
	 */
	async getRankingsByQuiz(quizId: string): Promise<QuizRankings[]> {
		const highscores = await this.highscoreService.getHighscoresByQuiz(quizId);
		return highscores
			.map((h) => {
				return {
					id: h.id,
					user_id: h.user_id,
					quiz_id: h.quiz_id,
                    first_name: h.user.first_name,
                    quiz_name: h.quiz.title,
					points: h.score,
					created_at: h.created_at,
				};
			})
			.sort((a, b) => b.points - a.points);
	}
}
